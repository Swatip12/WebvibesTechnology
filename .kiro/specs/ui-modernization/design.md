# Design Document

## Overview

This design document outlines the technical approach for modernizing the WebVibes Technology portal UI. The modernization focuses on visual enhancements using CSS animations, professional imagery, and modern design patterns while maintaining the existing Angular Material component library.

## Architecture

### Component Structure
- Existing Angular components will be enhanced with new styles and animations
- No new components required - modifications to existing templates and stylesheets
- Shared animation utilities will be created for reusability

### Image Management
- Images will be stored in `frontend/public/images/` directory
- Use Unsplash API URLs for stock images (no download required)
- Implement lazy loading using Angular's built-in image directive

### Animation Framework
- CSS-based animations using keyframes and transitions
- Angular animations module for complex interactions
- Intersection Observer API for scroll-triggered animations

## Components and Interfaces

### 1. Global Styles Enhancement

**File:** `frontend/src/styles.scss`

**Enhancements:**
- CSS custom properties for colors and spacing
- Global animation keyframes
- Utility classes for common animations
- Enhanced typography scale

```scss
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --card-shadow-hover: 0 10px 20px rgba(0, 0, 0, 0.15);
  --transition-speed: 0.3s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
```

### 2. Home Page Hero Section

**File:** `frontend/src/app/pages/home.component.html`

**Design:**
- Full-width hero with background image from Unsplash
- Gradient overlay for text readability
- Animated headline and CTA button
- Parallax scroll effect (optional)

**Image Source:** `https://images.unsplash.com/photo-1522071820081-009f0129c71c` (team collaboration)

**Structure:**
```html
<section class="hero-section">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title fade-in-up">Transform Your Career with WebVibes</h1>
    <p class="hero-subtitle fade-in-up stagger-1">...</p>
    <button class="hero-cta fade-in-up stagger-2">...</button>
  </div>
</section>
```

### 3. Internships Page Enhancement

**File:** `frontend/src/app/pages/internships.component.html`

**Design:**
- Hero banner with tech-related background
- Card grid with hover effects
- Category-specific images for each internship
- Smooth card entrance animations

**Image Sources:**
- Software Development: `https://images.unsplash.com/photo-1498050108023-c5249f4df085`
- Design: `https://images.unsplash.com/photo-1561070791-2526d30994b5`
- Marketing: `https://images.unsplash.com/photo-1460925895917-afdab827c52f`
- Data Science: `https://images.unsplash.com/photo-1551288049-bebda4e38f71`

### 4. Courses Page Enhancement

**File:** `frontend/src/app/pages/courses.component.html`

**Design:**
- Course cards with image headers
- Hover scale effect
- Progress indicators (if applicable)
- Category-based color coding

**Image Sources:**
- Programming: `https://images.unsplash.com/photo-1517694712202-14dd9538aa97`
- Design: `https://images.unsplash.com/photo-1626785774573-4b799315345d`
- Business: `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40`

### 5. About Page Enhancement

**File:** `frontend/src/app/pages/about.component.html`

**Design:**
- Team section with professional images
- Company values with icons and animations
- Timeline or milestone section
- Office/workspace images

**Image Sources:**
- Team: `https://images.unsplash.com/photo-1522071820081-009f0129c71c`
- Office: `https://images.unsplash.com/photo-1497366216548-37526070297c`
- Innovation: `https://images.unsplash.com/photo-1519389950473-47ba0277781c`

### 6. Loading Skeleton Component

**Implementation:**
- Create reusable skeleton loader styles
- Apply to cards, lists, and content areas
- Shimmer animation effect

```scss
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.skeleton-card {
  height: 300px;
  margin-bottom: 16px;
}
```

## Data Models

No new data models required. Existing models remain unchanged.

## Error Handling

### Image Loading Errors
- Implement fallback placeholder images
- Use `onerror` attribute or Angular error handling
- Display generic placeholder if image fails to load

### Animation Performance
- Use `will-change` CSS property for animated elements
- Implement `prefers-reduced-motion` media query for accessibility
- Disable animations on low-performance devices

## Testing Strategy

### Visual Testing
- Manual testing on different screen sizes
- Browser compatibility testing (Chrome, Firefox, Safari, Edge)
- Performance testing with Lighthouse

### Animation Testing
- Verify animations complete within specified timeframes
- Test scroll-triggered animations
- Verify reduced-motion preferences are respected

### Image Testing
- Verify all images load correctly
- Test lazy loading functionality
- Verify fallback images work

## Implementation Notes

### Image Optimization
- Use Unsplash URLs with size parameters (e.g., `?w=1200&q=80`)
- Implement lazy loading for below-the-fold images
- Use WebP format where supported

### Performance Considerations
- Minimize animation complexity
- Use CSS transforms instead of position changes
- Implement debouncing for scroll events
- Lazy load images and heavy components

### Accessibility
- Ensure animations respect `prefers-reduced-motion`
- Maintain keyboard navigation
- Ensure color contrast meets WCAG AA standards
- Provide alt text for all images

### Browser Support
- Target modern browsers (last 2 versions)
- Provide graceful degradation for older browsers
- Test on mobile devices (iOS Safari, Chrome Android)
