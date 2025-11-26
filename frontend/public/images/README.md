# Images Directory

This directory contains the image assets for the WebVibes Technology portal.

## Directory Structure

```
images/
├── hero/              # Hero section background images
├── internships/       # Internship category images
├── courses/           # Course category images
├── about/             # About page images (team, office, etc.)
├── training/          # Training process step images
├── contact/           # Contact page images
├── placeholders/      # Fallback and placeholder images
└── IMAGE_REFERENCES.md # Complete list of Unsplash URLs
```

## Image Sources

All images are loaded from Unsplash CDN. See `IMAGE_REFERENCES.md` for the complete list of URLs and usage guidelines.

## Usage

Images are managed through the `ImageService` in `frontend/src/app/core/services/image.service.ts`.

### Example Usage in Components

```typescript
import { ImageService } from '@core/services/image.service';

export class MyComponent {
  constructor(public imageService: ImageService) {}
  
  // Access hero images
  heroImage = this.imageService.hero.home;
  
  // Get category-specific images
  internshipImage = this.imageService.getInternshipImage('Software Development');
}
```

### Example Usage in Templates

```html
<!-- With lazy loading -->
<img [src]="imageService.hero.home" 
     loading="lazy" 
     alt="Hero background"
     (error)="imageService.handleImageError($event)">

<!-- As background image -->
<div class="hero" [style.background-image]="'url(' + imageService.hero.home + ')'">
  <!-- Content -->
</div>
```

## Lazy Loading

All images should use the `loading="lazy"` attribute for optimal performance:

```html
<img [src]="imageUrl" loading="lazy" alt="Description">
```

## Error Handling

Always include error handling to show fallback images:

```html
<img [src]="imageUrl" 
     (error)="imageService.handleImageError($event)"
     loading="lazy" 
     alt="Description">
```

## Performance Tips

1. Use appropriate image sizes for each viewport
2. Set explicit width and height to prevent layout shift
3. Use `loading="lazy"` for below-the-fold images
4. Implement intersection observer for scroll animations
5. Images are automatically served as WebP when supported

## Attribution

All images are from Unsplash and are free to use under the Unsplash License.
- License: https://unsplash.com/license
- No attribution required but appreciated
