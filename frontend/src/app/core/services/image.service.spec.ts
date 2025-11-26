import { TestBed } from '@angular/core/testing';
import { ImageService } from './image.service';

describe('ImageService', () => {
    let service: ImageService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ImageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should provide loading placeholder', () => {
        expect(service.LOADING_PLACEHOLDER).toContain('data:image/svg+xml');
        expect(service.LOADING_PLACEHOLDER).toContain('Loading');
    });

    it('should provide fallback placeholder', () => {
        expect(service.FALLBACK_PLACEHOLDER).toContain('data:image/svg+xml');
        expect(service.FALLBACK_PLACEHOLDER).toContain('Image Unavailable');
    });

    it('should get internship image by category', () => {
        const image = service.getInternshipImage('Software Development');
        expect(image).toContain('unsplash.com');
    });

    it('should return fallback for unknown internship category', () => {
        const image = service.getInternshipImage('Unknown Category');
        expect(image).toBe(service.FALLBACK_PLACEHOLDER);
    });

    it('should get course image by category', () => {
        const image = service.getCourseImage('Programming');
        expect(image).toContain('unsplash.com');
    });

    it('should return fallback for unknown course category', () => {
        const image = service.getCourseImage('Unknown Category');
        expect(image).toBe(service.FALLBACK_PLACEHOLDER);
    });

    it('should generate responsive image URL', () => {
        const url = service.getResponsiveImage('/photo-123', 800, 600, 80);
        expect(url).toContain('w=800');
        expect(url).toContain('h=600');
        expect(url).toContain('q=80');
    });

    it('should generate responsive srcset', () => {
        const srcset = service.getResponsiveSrcSet('/photo-123', 500);
        expect(srcset).toContain('400w');
        expect(srcset).toContain('800w');
        expect(srcset).toContain('1200w');
    });

    it('should get optimized URL based on viewport', () => {
        const mobileUrl = service.getOptimizedUrl('/photo-123', 480);
        expect(mobileUrl).toContain('w=480');

        const desktopUrl = service.getOptimizedUrl('/photo-123', 1920);
        expect(desktopUrl).toContain('w=1920');
    });

    it('should handle image error', () => {
        const mockImg = document.createElement('img');
        mockImg.src = 'https://example.com/test.jpg';

        service.handleImageError({ target: mockImg } as unknown as Event);

        expect(mockImg.src).toBe(service.FALLBACK_PLACEHOLDER);
        expect(mockImg.classList.contains('image-error')).toBe(true);
    });

    it('should track failed URLs', () => {
        const mockImg = document.createElement('img');
        mockImg.src = 'https://example.com/test.jpg';

        service.handleImageError({ target: mockImg } as unknown as Event);

        expect(service.hasImageFailed('https://example.com/test.jpg')).toBe(true);
    });

    it('should clear failed cache', () => {
        const mockImg = document.createElement('img');
        mockImg.src = 'https://example.com/test.jpg';

        service.handleImageError({ target: mockImg } as unknown as Event);
        expect(service.hasImageFailed('https://example.com/test.jpg')).toBe(true);

        service.clearFailedCache();
        expect(service.hasImageFailed('https://example.com/test.jpg')).toBe(false);
    });
});
