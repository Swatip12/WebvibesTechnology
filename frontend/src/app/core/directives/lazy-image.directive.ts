import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ImageService } from '../services/image.service';

/**
 * Directive for lazy loading images with error handling and responsive support
 * 
 * Usage:
 * <img appLazyImage [src]="imageUrl" [alt]="description">
 * <div appLazyImage [backgroundImage]="imageUrl"></div>
 */
@Directive({
  selector: '[appLazyImage]',
  standalone: true
})
export class LazyImageDirective implements OnInit, OnDestroy {
  @Input() src?: string;
  @Input() backgroundImage?: string;
  @Input() alt?: string;
  @Input() usePlaceholder: boolean = true;

  private observer?: IntersectionObserver;
  private hasLoaded = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private imageService: ImageService
  ) {}

  ngOnInit() {
    const element = this.el.nativeElement;

    // Set initial placeholder
    if (this.usePlaceholder) {
      if (this.backgroundImage) {
        this.renderer.setStyle(
          element,
          'background-image',
          `url('${this.imageService.LOADING_PLACEHOLDER}')`
        );
      } else if (element.tagName === 'IMG') {
        this.renderer.setAttribute(element, 'src', this.imageService.LOADING_PLACEHOLDER);
      }
    }

    // Add loading class
    this.renderer.addClass(element, 'lazy-loading');

    // Setup Intersection Observer for lazy loading
    this.setupLazyLoading();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupLazyLoading() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: load immediately
      this.loadImage();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasLoaded) {
            this.loadImage();
            this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  private loadImage() {
    const element = this.el.nativeElement;
    const imageUrl = this.backgroundImage || this.src;

    if (!imageUrl) {
      console.warn('No image URL provided for lazy loading');
      return;
    }

    // Check if this URL has failed before
    if (this.imageService.hasImageFailed(imageUrl)) {
      this.setFallbackImage();
      return;
    }

    if (this.backgroundImage) {
      // Handle background image
      this.loadBackgroundImage(imageUrl);
    } else if (element.tagName === 'IMG') {
      // Handle img tag
      this.loadImgTag(imageUrl);
    }

    this.hasLoaded = true;
  }

  private loadBackgroundImage(url: string) {
    const element = this.el.nativeElement;
    
    // Preload the image
    const img = new Image();
    
    img.onload = () => {
      this.renderer.setStyle(element, 'background-image', `url('${url}')`);
      this.renderer.removeClass(element, 'lazy-loading');
      this.renderer.addClass(element, 'lazy-loaded');
    };

    img.onerror = () => {
      this.imageService.handleBackgroundImageError(element);
      this.renderer.removeClass(element, 'lazy-loading');
      this.renderer.addClass(element, 'lazy-error');
    };

    img.src = url;
  }

  private loadImgTag(url: string) {
    const element = this.el.nativeElement;

    // Set alt text if provided
    if (this.alt) {
      this.renderer.setAttribute(element, 'alt', this.alt);
    }

    // Set loading attribute for native lazy loading support
    this.renderer.setAttribute(element, 'loading', 'lazy');

    // Handle load event
    const loadHandler = () => {
      this.renderer.removeClass(element, 'lazy-loading');
      this.renderer.addClass(element, 'lazy-loaded');
      element.removeEventListener('load', loadHandler);
    };

    // Handle error event
    const errorHandler = () => {
      this.imageService.handleImageError({ target: element } as Event);
      this.renderer.removeClass(element, 'lazy-loading');
      this.renderer.addClass(element, 'lazy-error');
      element.removeEventListener('error', errorHandler);
    };

    element.addEventListener('load', loadHandler);
    element.addEventListener('error', errorHandler);

    // Set the source
    this.renderer.setAttribute(element, 'src', url);
  }

  private setFallbackImage() {
    const element = this.el.nativeElement;
    
    if (this.backgroundImage) {
      this.renderer.setStyle(
        element,
        'background-image',
        `url('${this.imageService.FALLBACK_PLACEHOLDER}')`
      );
    } else if (element.tagName === 'IMG') {
      this.renderer.setAttribute(element, 'src', this.imageService.FALLBACK_PLACEHOLDER);
    }

    this.renderer.removeClass(element, 'lazy-loading');
    this.renderer.addClass(element, 'lazy-error');
  }
}
