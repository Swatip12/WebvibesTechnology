# Performance Testing Script for WebVibes Portal
# This script helps test the application performance

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "WebVibes Portal Performance Test" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if frontend is running
Write-Host "Checking if frontend is running..." -ForegroundColor Yellow
$frontendRunning = $false
try {
    $response = Invoke-WebRequest -Uri "http://localhost:4200" -Method Head -TimeoutSec 2 -ErrorAction SilentlyContinue
    if ($response.StatusCode -eq 200) {
        $frontendRunning = $true
        Write-Host "✓ Frontend is running on http://localhost:4200" -ForegroundColor Green
    }
} catch {
    Write-Host "✗ Frontend is not running" -ForegroundColor Red
    Write-Host "  Please start the frontend with: cd frontend && npm start" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Performance Testing Checklist:" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Manual Testing Steps:" -ForegroundColor Yellow
Write-Host "   - Open Chrome DevTools (F12)" -ForegroundColor White
Write-Host "   - Go to Lighthouse tab" -ForegroundColor White
Write-Host "   - Select 'Performance' category" -ForegroundColor White
Write-Host "   - Click 'Analyze page load'" -ForegroundColor White
Write-Host "   - Check for score > 90" -ForegroundColor White
Write-Host ""

Write-Host "2. Mobile Device Testing:" -ForegroundColor Yellow
Write-Host "   - Open Chrome DevTools (F12)" -ForegroundColor White
Write-Host "   - Click 'Toggle device toolbar' (Ctrl+Shift+M)" -ForegroundColor White
Write-Host "   - Select different devices:" -ForegroundColor White
Write-Host "     * iPhone 12 Pro" -ForegroundColor Gray
Write-Host "     * Samsung Galaxy S20" -ForegroundColor Gray
Write-Host "     * iPad Pro" -ForegroundColor Gray
Write-Host "   - Test scroll animations" -ForegroundColor White
Write-Host "   - Test hover effects (on desktop)" -ForegroundColor White
Write-Host ""

Write-Host "3. Network Throttling:" -ForegroundColor Yellow
Write-Host "   - Open Chrome DevTools Network tab" -ForegroundColor White
Write-Host "   - Select 'Slow 3G' or 'Fast 3G'" -ForegroundColor White
Write-Host "   - Reload page and check loading performance" -ForegroundColor White
Write-Host "   - Verify skeleton loaders appear" -ForegroundColor White
Write-Host ""

Write-Host "4. Performance Metrics to Check:" -ForegroundColor Yellow
Write-Host "   - First Contentful Paint (FCP): < 1.8s" -ForegroundColor White
Write-Host "   - Largest Contentful Paint (LCP): < 2.5s" -ForegroundColor White
Write-Host "   - Cumulative Layout Shift (CLS): < 0.1" -ForegroundColor White
Write-Host "   - Time to Interactive (TTI): < 3.8s" -ForegroundColor White
Write-Host ""

Write-Host "5. Animation Performance:" -ForegroundColor Yellow
Write-Host "   - Open Performance tab in DevTools" -ForegroundColor White
Write-Host "   - Click 'Record' and scroll through pages" -ForegroundColor White
Write-Host "   - Stop recording after 5-10 seconds" -ForegroundColor White
Write-Host "   - Check for:" -ForegroundColor White
Write-Host "     * Frame rate should be 60 FPS" -ForegroundColor Gray
Write-Host "     * No long tasks (> 50ms)" -ForegroundColor Gray
Write-Host "     * Minimal layout shifts" -ForegroundColor Gray
Write-Host ""

Write-Host "6. Memory Usage:" -ForegroundColor Yellow
Write-Host "   - Open Memory tab in DevTools" -ForegroundColor White
Write-Host "   - Take heap snapshot" -ForegroundColor White
Write-Host "   - Navigate through pages" -ForegroundColor White
Write-Host "   - Take another snapshot" -ForegroundColor White
Write-Host "   - Check for memory leaks" -ForegroundColor White
Write-Host ""

Write-Host "7. Reduced Motion Testing:" -ForegroundColor Yellow
Write-Host "   - Open Chrome DevTools" -ForegroundColor White
Write-Host "   - Press Ctrl+Shift+P (Command Palette)" -ForegroundColor White
Write-Host "   - Type 'Emulate CSS prefers-reduced-motion'" -ForegroundColor White
Write-Host "   - Select 'prefers-reduced-motion: reduce'" -ForegroundColor White
Write-Host "   - Verify animations are disabled/simplified" -ForegroundColor White
Write-Host ""

Write-Host "8. Browser Compatibility:" -ForegroundColor Yellow
Write-Host "   Test on the following browsers:" -ForegroundColor White
Write-Host "   - Chrome (latest)" -ForegroundColor Gray
Write-Host "   - Firefox (latest)" -ForegroundColor Gray
Write-Host "   - Safari (latest)" -ForegroundColor Gray
Write-Host "   - Edge (latest)" -ForegroundColor Gray
Write-Host ""

if ($frontendRunning) {
    Write-Host "Quick Links:" -ForegroundColor Cyan
    Write-Host "============" -ForegroundColor Cyan
    Write-Host "Home Page:        http://localhost:4200" -ForegroundColor White
    Write-Host "Internships:      http://localhost:4200/internships" -ForegroundColor White
    Write-Host "Courses:          http://localhost:4200/courses" -ForegroundColor White
    Write-Host "About:            http://localhost:4200/about" -ForegroundColor White
    Write-Host "Training Process: http://localhost:4200/training-process" -ForegroundColor White
    Write-Host ""
}

Write-Host "Performance Optimization Features Implemented:" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Green
Write-Host "✓ will-change property for animated elements" -ForegroundColor Green
Write-Host "✓ Automatic cleanup of will-change after animations" -ForegroundColor Green
Write-Host "✓ Intersection Observer for scroll animations" -ForegroundColor Green
Write-Host "✓ Low-performance device detection" -ForegroundColor Green
Write-Host "✓ Reduced motion support" -ForegroundColor Green
Write-Host "✓ GPU acceleration for transforms" -ForegroundColor Green
Write-Host "✓ Optimized animation complexity" -ForegroundColor Green
Write-Host ""

Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
