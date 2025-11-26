# Browser Compatibility Quick Reference Guide

## Supported Browsers

| Browser | Minimum Version | Status |
|---------|----------------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| IE 11 | - | ❌ Not Supported |

## Quick CSS Reference

### Backdrop Filter (Glassmorphism)
```scss
// Always use both prefixes for Safari support
-webkit-backdrop-filter: blur(10px);
backdrop-filter: blur(10px);
```

### Gradient Text
```scss
// Always use webkit prefixes for Safari
background: linear-gradient(135deg, #fff 0%, #667eea 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

### CSS Mask (Gradient Borders)
```scss
// Use both syntaxes for Firefox and Safari
-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
-webkit-mask-composite: xor;
mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
mask-composite: exclude;
```

### Transform Optimization
```scss
// Use translateZ(0) for GPU acceleration
transform: translateZ(0);
-webkit-transform: translateZ(0);
```

### Animations
```scss
// Always include will-change for performance
.animated-element {
  will-change: transform, opacity;
  animation: fadeIn 0.6s ease-out;
}

// Remove will-change after animation
.animated-element.complete {
  will-change: auto;
}
```

## Browser-Specific Classes

The app automatically adds these classes to `<html>`:

```scss
// Browser detection
.browser-chrome { }
.browser-firefox { }
.browser-safari { }
.browser-edge { }

// Device detection
.is-mobile { }
.is-ios { }
.is-android { }
.touch-device { }

// User preferences
.prefers-reduced-motion { }
.prefers-high-contrast { }
.prefers-dark-mode { }

// Feature detection
.no-backdrop-filter { }
.no-css-grid { }
.no-flexbox { }
```

## Common Issues & Solutions

### Issue: Backdrop-filter not working in Safari
**Solution:** Add `-webkit-` prefix
```scss
-webkit-backdrop-filter: blur(10px);
backdrop-filter: blur(10px);
```

### Issue: Gradient text not showing in Safari
**Solution:** Add webkit prefixes
```scss
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Issue: Animations janky on mobile
**Solution:** Use transforms and will-change
```scss
transform: translateZ(0);
will-change: transform;
```

### Issue: Viewport height issues on iOS
**Solution:** Use -webkit-fill-available
```scss
min-height: 100vh;
min-height: -webkit-fill-available;
```

### Issue: Mask-composite not working in Firefox
**Solution:** Use both syntaxes
```scss
-moz-mask-composite: exclude;
mask-composite: exclude;
```

## Testing Checklist

### Before Committing
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari (if available)
- [ ] Test in Edge
- [ ] Test responsive layouts
- [ ] Test with reduced motion enabled
- [ ] Check Lighthouse scores

### Quick Test Commands
```bash
# Run the cross-browser testing script
.\test-cross-browser.ps1

# Start the app
cd frontend && npm start
```

## Performance Tips

1. **Use transforms over position changes**
   ```scss
   // Good
   transform: translateY(-10px);
   
   // Bad
   top: -10px;
   ```

2. **Add will-change sparingly**
   ```scss
   // Only on elements that will animate
   .will-animate {
     will-change: transform;
   }
   
   // Remove after animation
   .animation-complete {
     will-change: auto;
   }
   ```

3. **Use GPU acceleration**
   ```scss
   transform: translateZ(0);
   ```

4. **Optimize backdrop-filter**
   ```scss
   // Use lower blur values on mobile
   @media (max-width: 768px) {
     backdrop-filter: blur(5px);
   }
   ```

## Accessibility

### Reduced Motion
Always respect user preferences:
```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Indicators
Ensure visible focus for keyboard navigation:
```scss
*:focus-visible {
  outline: 3px solid var(--primary-color);
  outline-offset: 2px;
}
```

### Color Contrast
Maintain WCAG AA standards:
- Normal text: 4.5:1
- Large text: 3:1
- Interactive elements: 3:1

## Browser Detection API

```typescript
import { 
  detectBrowser, 
  checkFeatureSupport,
  prefersReducedMotion 
} from './core/utils/browser-detection.utils';

// Detect browser
const browser = detectBrowser();
console.log(browser.name, browser.version);

// Check feature support
const features = checkFeatureSupport();
if (!features.backdropFilter) {
  // Use fallback
}

// Check user preferences
if (prefersReducedMotion()) {
  // Disable animations
}
```

## Fallbacks

### No Backdrop Filter Support
```scss
@supports not (backdrop-filter: blur(10px)) {
  .glass-element {
    background: rgba(26, 31, 58, 0.95);
  }
}
```

### No CSS Grid Support
```scss
@supports not (display: grid) {
  .grid-container {
    display: flex;
    flex-wrap: wrap;
  }
}
```

## Resources

- [Can I Use](https://caniuse.com/) - Browser support tables
- [MDN Web Docs](https://developer.mozilla.org/) - CSS documentation
- [Autoprefixer](https://autoprefixer.github.io/) - CSS prefix tool
- [BrowserStack](https://www.browserstack.com/) - Cross-browser testing

## Need Help?

1. Check `CROSS_BROWSER_TESTING.md` for detailed test results
2. Review `BROWSER_TESTING_CHECKLIST.md` for testing steps
3. Run `.\test-cross-browser.ps1` for guided testing
4. Check browser console for compatibility warnings

---

**Last Updated:** November 26, 2025
