/**
 * Browser Detection and Compatibility Utilities
 * Provides functions to detect browser type and check feature support
 */

export interface BrowserInfo {
  name: string;
  version: string;
  isChrome: boolean;
  isFirefox: boolean;
  isSafari: boolean;
  isEdge: boolean;
  isIE: boolean;
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
}

export interface FeatureSupport {
  backdropFilter: boolean;
  cssGrid: boolean;
  flexbox: boolean;
  cssVariables: boolean;
  intersectionObserver: boolean;
  webAnimations: boolean;
  cssClipPath: boolean;
  cssMask: boolean;
  willChange: boolean;
}

/**
 * Detect browser information
 */
export function detectBrowser(): BrowserInfo {
  const userAgent = navigator.userAgent;
  const vendor = navigator.vendor;

  // Detect browser type
  const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(vendor) && !/Edg/.test(userAgent);
  const isFirefox = /Firefox/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && /Apple Computer/.test(vendor) && !/Chrome/.test(userAgent);
  const isEdge = /Edg/.test(userAgent);
  const isIE = /MSIE|Trident/.test(userAgent);

  // Detect mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);

  // Determine browser name
  let name = 'Unknown';
  if (isChrome) name = 'Chrome';
  else if (isFirefox) name = 'Firefox';
  else if (isSafari) name = 'Safari';
  else if (isEdge) name = 'Edge';
  else if (isIE) name = 'Internet Explorer';

  // Extract version
  let version = 'Unknown';
  if (isChrome) {
    const match = userAgent.match(/Chrome\/(\d+)/);
    version = match ? match[1] : 'Unknown';
  } else if (isFirefox) {
    const match = userAgent.match(/Firefox\/(\d+)/);
    version = match ? match[1] : 'Unknown';
  } else if (isSafari) {
    const match = userAgent.match(/Version\/(\d+)/);
    version = match ? match[1] : 'Unknown';
  } else if (isEdge) {
    const match = userAgent.match(/Edg\/(\d+)/);
    version = match ? match[1] : 'Unknown';
  }

  return {
    name,
    version,
    isChrome,
    isFirefox,
    isSafari,
    isEdge,
    isIE,
    isMobile,
    isIOS,
    isAndroid
  };
}

/**
 * Check feature support
 */
export function checkFeatureSupport(): FeatureSupport {
  const testElement = document.createElement('div');

  return {
    backdropFilter: CSS.supports('backdrop-filter', 'blur(10px)') || 
                    CSS.supports('-webkit-backdrop-filter', 'blur(10px)'),
    cssGrid: CSS.supports('display', 'grid'),
    flexbox: CSS.supports('display', 'flex'),
    cssVariables: CSS.supports('--test', '0'),
    intersectionObserver: 'IntersectionObserver' in window,
    webAnimations: 'animate' in testElement,
    cssClipPath: CSS.supports('clip-path', 'circle(50%)'),
    cssMask: CSS.supports('mask', 'linear-gradient(#fff 0 0)') ||
             CSS.supports('-webkit-mask', 'linear-gradient(#fff 0 0)'),
    willChange: CSS.supports('will-change', 'transform')
  };
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if high contrast mode is enabled
 */
export function prefersHighContrast(): boolean {
  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Check if dark mode is preferred
 */
export function prefersDarkMode(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Get viewport size
 */
export function getViewportSize(): { width: number; height: number } {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight
  };
}

/**
 * Check if device is touch-enabled
 */
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Log browser and feature information (for debugging)
 */
export function logBrowserInfo(): void {
  const browser = detectBrowser();
  const features = checkFeatureSupport();
  const viewport = getViewportSize();

  console.group('🌐 Browser Information');
  console.log('Browser:', browser.name, browser.version);
  console.log('Mobile:', browser.isMobile);
  console.log('iOS:', browser.isIOS);
  console.log('Android:', browser.isAndroid);
  console.groupEnd();

  console.group('✨ Feature Support');
  console.log('Backdrop Filter:', features.backdropFilter);
  console.log('CSS Grid:', features.cssGrid);
  console.log('Flexbox:', features.flexbox);
  console.log('CSS Variables:', features.cssVariables);
  console.log('Intersection Observer:', features.intersectionObserver);
  console.log('Web Animations:', features.webAnimations);
  console.log('CSS Clip Path:', features.cssClipPath);
  console.log('CSS Mask:', features.cssMask);
  console.log('Will Change:', features.willChange);
  console.groupEnd();

  console.group('⚙️ User Preferences');
  console.log('Reduced Motion:', prefersReducedMotion());
  console.log('High Contrast:', prefersHighContrast());
  console.log('Dark Mode:', prefersDarkMode());
  console.log('Touch Device:', isTouchDevice());
  console.groupEnd();

  console.group('📐 Viewport');
  console.log('Width:', viewport.width);
  console.log('Height:', viewport.height);
  console.groupEnd();
}

/**
 * Apply browser-specific classes to document element
 */
export function applyBrowserClasses(): void {
  const browser = detectBrowser();
  const features = checkFeatureSupport();
  const html = document.documentElement;

  // Add browser classes
  if (browser.isChrome) html.classList.add('browser-chrome');
  if (browser.isFirefox) html.classList.add('browser-firefox');
  if (browser.isSafari) html.classList.add('browser-safari');
  if (browser.isEdge) html.classList.add('browser-edge');
  if (browser.isIE) html.classList.add('browser-ie');
  if (browser.isMobile) html.classList.add('is-mobile');
  if (browser.isIOS) html.classList.add('is-ios');
  if (browser.isAndroid) html.classList.add('is-android');

  // Add feature support classes
  if (!features.backdropFilter) html.classList.add('no-backdrop-filter');
  if (!features.cssGrid) html.classList.add('no-css-grid');
  if (!features.flexbox) html.classList.add('no-flexbox');
  if (!features.intersectionObserver) html.classList.add('no-intersection-observer');

  // Add preference classes
  if (prefersReducedMotion()) html.classList.add('prefers-reduced-motion');
  if (prefersHighContrast()) html.classList.add('prefers-high-contrast');
  if (prefersDarkMode()) html.classList.add('prefers-dark-mode');
  if (isTouchDevice()) html.classList.add('touch-device');
}

/**
 * Show browser compatibility warning if needed
 */
export function checkBrowserCompatibility(): { compatible: boolean; message?: string } {
  const browser = detectBrowser();
  const features = checkFeatureSupport();

  // Check for IE
  if (browser.isIE) {
    return {
      compatible: false,
      message: 'Internet Explorer is not supported. Please use a modern browser like Chrome, Firefox, Safari, or Edge.'
    };
  }

  // Check for critical features
  if (!features.cssGrid || !features.flexbox) {
    return {
      compatible: false,
      message: 'Your browser does not support modern CSS features. Please update your browser for the best experience.'
    };
  }

  // Check for old browser versions
  const version = parseInt(browser.version);
  if (browser.isChrome && version < 90) {
    return {
      compatible: false,
      message: 'Your Chrome version is outdated. Please update to the latest version for the best experience.'
    };
  }
  if (browser.isFirefox && version < 88) {
    return {
      compatible: false,
      message: 'Your Firefox version is outdated. Please update to the latest version for the best experience.'
    };
  }
  if (browser.isSafari && version < 14) {
    return {
      compatible: false,
      message: 'Your Safari version is outdated. Please update to the latest version for the best experience.'
    };
  }

  return { compatible: true };
}
