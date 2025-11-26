import { Injectable } from '@angular/core';

/**
 * Service for managing image URLs and lazy loading configuration
 */
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  // Base Unsplash URL
  private readonly UNSPLASH_BASE = 'https://images.unsplash.com';
  
  // Placeholder image for loading states
  readonly LOADING_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'%3E%3Crect fill='%23f0f0f0' width='800' height='500'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%23999' font-family='sans-serif' font-size='24'%3ELoading...%3C/text%3E%3C/svg%3E";
  
  // Generic fallback placeholder (local SVG to avoid external dependency)
  readonly FALLBACK_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea;stop-opacity:0.3' /%3E%3Cstop offset='100%25' style='stop-color:%23764ba2;stop-opacity:0.3' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23grad)' width='800' height='500'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%23667eea' font-family='sans-serif' font-size='20' font-weight='600'%3EImage Unavailable%3C/text%3E%3C/svg%3E";
  
  // Track failed image URLs to avoid retry loops
  private failedUrls = new Set<string>();

  /**
   * Hero section images
   */
  readonly hero = {
    home: `${this.UNSPLASH_BASE}/photo-1522071820081-009f0129c71c?w=1920&h=1080&q=80&fit=crop&auto=format`,
    internships: `${this.UNSPLASH_BASE}/photo-1498050108023-c5249f4df085?w=1920&h=600&q=80&fit=crop&auto=format`,
    courses: `${this.UNSPLASH_BASE}/photo-1516321318423-f06f85e504b3?w=1920&h=600&q=80&fit=crop&auto=format`,
    about: `${this.UNSPLASH_BASE}/photo-1497366216548-37526070297c?w=1920&h=600&q=80&fit=crop&auto=format`,
    training: `${this.UNSPLASH_BASE}/photo-1552664730-d307ca884978?w=1920&h=600&q=80&fit=crop&auto=format`,
    contact: `${this.UNSPLASH_BASE}/photo-1423666639041-f56000c27a9a?w=1920&h=600&q=80&fit=crop&auto=format`
  };

  /**
   * Internship category images
   */
  readonly internships = {
    'Software Development': `${this.UNSPLASH_BASE}/photo-1498050108023-c5249f4df085?w=800&h=500&q=80&fit=crop&auto=format`,
    'UI/UX Design': `${this.UNSPLASH_BASE}/photo-1561070791-2526d30994b5?w=800&h=500&q=80&fit=crop&auto=format`,
    'Digital Marketing': `${this.UNSPLASH_BASE}/photo-1460925895917-afdab827c52f?w=800&h=500&q=80&fit=crop&auto=format`,
    'Data Science': `${this.UNSPLASH_BASE}/photo-1551288049-bebda4e38f71?w=800&h=500&q=80&fit=crop&auto=format`,
    'Business Development': `${this.UNSPLASH_BASE}/photo-1454165804606-c3d57bc86b40?w=800&h=500&q=80&fit=crop&auto=format`,
    'Content Writing': `${this.UNSPLASH_BASE}/photo-1455390582262-044cdead277a?w=800&h=500&q=80&fit=crop&auto=format`
  };

  /**
   * Course category images
   */
  readonly courses = {
    'Programming': `${this.UNSPLASH_BASE}/photo-1517694712202-14dd9538aa97?w=800&h=400&q=80&fit=crop&auto=format`,
    'Design': `${this.UNSPLASH_BASE}/photo-1626785774573-4b799315345d?w=800&h=400&q=80&fit=crop&auto=format`,
    'Business': `${this.UNSPLASH_BASE}/photo-1454165804606-c3d57bc86b40?w=800&h=400&q=80&fit=crop&auto=format`,
    'Data': `${this.UNSPLASH_BASE}/photo-1551288049-bebda4e38f71?w=800&h=400&q=80&fit=crop&auto=format`,
    'Marketing': `${this.UNSPLASH_BASE}/photo-1533750349088-cd871a92f312?w=800&h=400&q=80&fit=crop&auto=format`
  };

  /**
   * About page images
   */
  readonly about = {
    team: `${this.UNSPLASH_BASE}/photo-1522071820081-009f0129c71c?w=1200&h=800&q=80&fit=crop&auto=format`,
    office: `${this.UNSPLASH_BASE}/photo-1497366216548-37526070297c?w=1200&h=800&q=80&fit=crop&auto=format`,
    innovation: `${this.UNSPLASH_BASE}/photo-1519389950473-47ba0277781c?w=1200&h=800&q=80&fit=crop&auto=format`
  };

  /**
   * Training process step images
   */
  readonly training = {
    application: `${this.UNSPLASH_BASE}/photo-1586281380349-632531db7ed4?w=600&h=400&q=80&fit=crop&auto=format`,
    assessment: `${this.UNSPLASH_BASE}/photo-1434030216411-0b793f4b4173?w=600&h=400&q=80&fit=crop&auto=format`,
    training: `${this.UNSPLASH_BASE}/photo-1524178232363-1fb2b075b655?w=600&h=400&q=80&fit=crop&auto=format`,
    project: `${this.UNSPLASH_BASE}/photo-1531482615713-2afd69097998?w=600&h=400&q=80&fit=crop&auto=format`,
    certification: `${this.UNSPLASH_BASE}/photo-1523050854058-8df90110c9f1?w=600&h=400&q=80&fit=crop&auto=format`
  };

  /**
   * Get image URL for internship category
   * @param category Internship category name
   * @returns Image URL or fallback
   */
  getInternshipImage(category: string): string {
    return this.internships[category as keyof typeof this.internships] || this.FALLBACK_PLACEHOLDER;
  }

  /**
   * Get image URL for course category
   * @param category Course category name
   * @returns Image URL or fallback
   */
  getCourseImage(category: string): string {
    // Match category keywords
    if (category.toLowerCase().includes('program')) return this.courses.Programming;
    if (category.toLowerCase().includes('design')) return this.courses.Design;
    if (category.toLowerCase().includes('business')) return this.courses.Business;
    if (category.toLowerCase().includes('data')) return this.courses.Data;
    if (category.toLowerCase().includes('market')) return this.courses.Marketing;
    
    return this.FALLBACK_PLACEHOLDER;
  }

  /**
   * Handle image loading error
   * @param event Error event
   */
  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img && img.src !== this.FALLBACK_PLACEHOLDER) {
      // Mark this URL as failed
      this.failedUrls.add(img.src);
      
      // Set fallback placeholder
      img.src = this.FALLBACK_PLACEHOLDER;
      
      // Add error class for styling
      img.classList.add('image-error');
      
      console.warn('Image failed to load:', img.src);
    }
  }

  /**
   * Handle background image error for divs
   * @param element Element with background image
   */
  handleBackgroundImageError(element: HTMLElement): void {
    if (element) {
      const bgImage = element.style.backgroundImage;
      if (bgImage && !bgImage.includes('data:image')) {
        element.style.backgroundImage = `url('${this.FALLBACK_PLACEHOLDER}')`;
        element.classList.add('image-error');
        console.warn('Background image failed to load:', bgImage);
      }
    }
  }

  /**
   * Get responsive image URL with custom dimensions
   * @param photoId Unsplash photo ID
   * @param width Desired width
   * @param height Desired height
   * @param quality Image quality (1-100)
   * @returns Formatted image URL
   */
  getResponsiveImage(photoId: string, width: number, height: number, quality: number = 80): string {
    return `${this.UNSPLASH_BASE}/${photoId}?w=${width}&h=${height}&q=${quality}&fit=crop&auto=format`;
  }

  /**
   * Get responsive srcset for different viewport sizes
   * @param photoId Unsplash photo ID or full URL
   * @param baseHeight Base height for aspect ratio
   * @returns srcset string with multiple sizes
   */
  getResponsiveSrcSet(photoId: string, baseHeight: number = 500): string {
    // Extract photo ID if full URL is provided
    const id = photoId.includes('unsplash.com') 
      ? photoId.split('unsplash.com')[1].split('?')[0] 
      : photoId;
    
    const widths = [400, 800, 1200, 1600, 1920];
    return widths
      .map(w => {
        const h = Math.round((baseHeight / 800) * w);
        return `${this.UNSPLASH_BASE}${id}?w=${w}&h=${h}&q=80&fit=crop&auto=format ${w}w`;
      })
      .join(', ');
  }

  /**
   * Get responsive background image CSS for different viewports
   * @param photoId Unsplash photo ID or full URL
   * @returns Object with background image URLs for different breakpoints
   */
  getResponsiveBackgroundUrls(photoId: string): {
    mobile: string;
    tablet: string;
    desktop: string;
  } {
    // Extract photo ID if full URL is provided
    const id = photoId.includes('unsplash.com') 
      ? photoId.split('unsplash.com')[1].split('?')[0] 
      : photoId;
    
    return {
      mobile: `${this.UNSPLASH_BASE}${id}?w=768&h=400&q=80&fit=crop&auto=format`,
      tablet: `${this.UNSPLASH_BASE}${id}?w=1024&h=600&q=80&fit=crop&auto=format`,
      desktop: `${this.UNSPLASH_BASE}${id}?w=1920&h=800&q=80&fit=crop&auto=format`
    };
  }

  /**
   * Preload critical images
   * @param urls Array of image URLs to preload
   */
  preloadImages(urls: string[]): void {
    urls.forEach(url => {
      if (!this.failedUrls.has(url)) {
        const img = new Image();
        img.src = url;
      }
    });
  }

  /**
   * Check if an image URL has previously failed
   * @param url Image URL to check
   * @returns true if the URL has failed before
   */
  hasImageFailed(url: string): boolean {
    return this.failedUrls.has(url);
  }

  /**
   * Clear failed URLs cache
   */
  clearFailedCache(): void {
    this.failedUrls.clear();
  }

  /**
   * Get optimized image URL based on viewport width
   * @param photoId Unsplash photo ID or full URL
   * @param viewportWidth Current viewport width
   * @returns Optimized image URL
   */
  getOptimizedUrl(photoId: string, viewportWidth: number): string {
    // Extract photo ID if full URL is provided
    const id = photoId.includes('unsplash.com') 
      ? photoId.split('unsplash.com')[1].split('?')[0] 
      : photoId;
    
    // Determine optimal width based on viewport
    let width = 800;
    let height = 500;
    
    if (viewportWidth <= 480) {
      width = 480;
      height = 300;
    } else if (viewportWidth <= 768) {
      width = 768;
      height = 400;
    } else if (viewportWidth <= 1024) {
      width = 1024;
      height = 600;
    } else if (viewportWidth <= 1440) {
      width = 1440;
      height = 800;
    } else {
      width = 1920;
      height = 1080;
    }
    
    return `${this.UNSPLASH_BASE}${id}?w=${width}&h=${height}&q=80&fit=crop&auto=format`;
  }
}
