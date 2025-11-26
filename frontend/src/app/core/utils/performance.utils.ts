/**
 * Performance optimization utilities for animations and rendering
 */

/**
 * Detects if the device is low-performance based on various factors
 */
export function isLowPerformanceDevice(): boolean {
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 0;
  if (cores > 0 && cores < 4) {
    return true;
  }

  // Check device memory (if available)
  const deviceMemory = (navigator as any).deviceMemory;
  if (deviceMemory && deviceMemory < 4) {
    return true;
  }

  // Check connection type (if available)
  const connection = (navigator as any).connection;
  if (connection) {
    const slowConnections = ['slow-2g', '2g', '3g'];
    if (slowConnections.includes(connection.effectiveType)) {
      return true;
    }
  }

  return false;
}

/**
 * Optimizes animations based on device performance
 */
export function optimizeAnimations(): void {
  if (isLowPerformanceDevice()) {
    // Disable complex animations on low-performance devices
    document.documentElement.classList.add('low-performance');
    
    // Reduce animation duration
    document.documentElement.style.setProperty('--transition-speed', '0.15s');
    document.documentElement.style.setProperty('--transition-slow', '0.25s');
  }
}

/**
 * Cleans up will-change property after animation
 */
export function cleanupWillChange(element: HTMLElement, delay: number = 0): void {
  setTimeout(() => {
    element.style.willChange = 'auto';
  }, delay);
}

/**
 * Throttles a function to improve scroll performance
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Debounces a function to reduce execution frequency
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Requests idle callback with fallback for unsupported browsers
 */
export function requestIdleCallback(callback: () => void, timeout: number = 2000): void {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout });
  } else {
    setTimeout(callback, 1);
  }
}

/**
 * Measures and logs performance metrics
 */
export function measurePerformance(label: string): () => void {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`);
  };
}

/**
 * Gets Lighthouse-style performance score
 */
export function getPerformanceScore(): {
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  fid: number | null;
} {
  const perfEntries = performance.getEntriesByType('navigation');
  const paintEntries = performance.getEntriesByType('paint');
  
  let fcp: number | null = null;
  let lcp: number | null = null;
  
  // First Contentful Paint
  const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
  if (fcpEntry) {
    fcp = fcpEntry.startTime;
  }
  
  // Largest Contentful Paint (requires PerformanceObserver)
  // This is a simplified version - actual LCP requires PerformanceObserver
  const navEntry = perfEntries[0] as PerformanceNavigationTiming;
  if (navEntry) {
    lcp = navEntry.loadEventEnd - navEntry.fetchStart;
  }
  
  return {
    fcp,
    lcp,
    cls: null, // Cumulative Layout Shift requires PerformanceObserver
    fid: null  // First Input Delay requires PerformanceObserver
  };
}

/**
 * Logs performance metrics to console
 */
export function logPerformanceMetrics(): void {
  const metrics = getPerformanceScore();
  console.group('Performance Metrics');
  console.log('First Contentful Paint (FCP):', metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : 'N/A');
  console.log('Largest Contentful Paint (LCP):', metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'N/A');
  console.log('Device Performance:', isLowPerformanceDevice() ? 'Low' : 'Normal/High');
  console.groupEnd();
}
