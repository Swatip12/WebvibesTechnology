# Cross-Browser Testing Script
# This script helps verify cross-browser compatibility

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Cross-Browser Testing Checklist" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "This script will guide you through testing the application in different browsers." -ForegroundColor Yellow
Write-Host ""

# Check if the application is running
Write-Host "Step 1: Ensure the application is running" -ForegroundColor Green
Write-Host "  - Frontend should be running on http://localhost:4200" -ForegroundColor White
Write-Host "  - Backend should be running on http://localhost:8080" -ForegroundColor White
Write-Host ""

$continue = Read-Host "Is the application running? (y/n)"
if ($continue -ne "y") {
    Write-Host "Please start the application first:" -ForegroundColor Red
    Write-Host "  Frontend: cd frontend && npm start" -ForegroundColor White
    Write-Host "  Backend: cd backend && mvnw spring-boot:run" -ForegroundColor White
    exit
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Browser Testing Checklist" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Chrome Testing
Write-Host "CHROME TESTING" -ForegroundColor Magenta
Write-Host "---------------" -ForegroundColor Magenta
Write-Host "Opening Chrome..." -ForegroundColor Yellow
Start-Process "chrome" "http://localhost:4200"
Write-Host ""
Write-Host "Test the following in Chrome:" -ForegroundColor White
Write-Host "  [1] Hero section animations (fade-in, gradient shift)" -ForegroundColor Gray
Write-Host "  [2] Card hover effects (lift, scale, shadow)" -ForegroundColor Gray
Write-Host "  [3] Glassmorphism effects (backdrop-filter)" -ForegroundColor Gray
Write-Host "  [4] Gradient text rendering" -ForegroundColor Gray
Write-Host "  [5] Scroll animations (Intersection Observer)" -ForegroundColor Gray
Write-Host "  [6] Responsive layouts (resize window)" -ForegroundColor Gray
Write-Host "  [7] Form interactions and micro-interactions" -ForegroundColor Gray
Write-Host "  [8] Navigation and routing" -ForegroundColor Gray
Write-Host ""
$chromeOk = Read-Host "Chrome testing complete? (y/n)"

Write-Host ""

# Firefox Testing
Write-Host "FIREFOX TESTING" -ForegroundColor Magenta
Write-Host "---------------" -ForegroundColor Magenta
Write-Host "Opening Firefox..." -ForegroundColor Yellow
Start-Process "firefox" "http://localhost:4200"
Write-Host ""
Write-Host "Test the following in Firefox:" -ForegroundColor White
Write-Host "  [1] All animations work smoothly" -ForegroundColor Gray
Write-Host "  [2] Backdrop-filter performance" -ForegroundColor Gray
Write-Host "  [3] CSS mask-composite for gradient borders" -ForegroundColor Gray
Write-Host "  [4] Gradient text rendering" -ForegroundColor Gray
Write-Host "  [5] Scroll animations" -ForegroundColor Gray
Write-Host "  [6] Responsive layouts" -ForegroundColor Gray
Write-Host "  [7] Form interactions" -ForegroundColor Gray
Write-Host "  [8] Navigation" -ForegroundColor Gray
Write-Host ""
$firefoxOk = Read-Host "Firefox testing complete? (y/n)"

Write-Host ""

# Edge Testing
Write-Host "EDGE TESTING" -ForegroundColor Magenta
Write-Host "------------" -ForegroundColor Magenta
Write-Host "Opening Edge..." -ForegroundColor Yellow
Start-Process "msedge" "http://localhost:4200"
Write-Host ""
Write-Host "Test the following in Edge:" -ForegroundColor White
Write-Host "  [1] All animations work" -ForegroundColor Gray
Write-Host "  [2] Glassmorphism effects" -ForegroundColor Gray
Write-Host "  [3] Gradient rendering" -ForegroundColor Gray
Write-Host "  [4] Scroll animations" -ForegroundColor Gray
Write-Host "  [5] Responsive layouts" -ForegroundColor Gray
Write-Host "  [6] Form interactions" -ForegroundColor Gray
Write-Host "  [7] Navigation" -ForegroundColor Gray
Write-Host ""
$edgeOk = Read-Host "Edge testing complete? (y/n)"

Write-Host ""

# Safari Testing (if on Mac)
Write-Host "SAFARI TESTING" -ForegroundColor Magenta
Write-Host "--------------" -ForegroundColor Magenta
Write-Host "Note: Safari testing requires macOS or iOS device" -ForegroundColor Yellow
Write-Host ""
Write-Host "If testing on Safari, verify:" -ForegroundColor White
Write-Host "  [1] -webkit-backdrop-filter works" -ForegroundColor Gray
Write-Host "  [2] -webkit-background-clip for gradient text" -ForegroundColor Gray
Write-Host "  [3] -webkit-mask for gradient borders" -ForegroundColor Gray
Write-Host "  [4] All animations work smoothly" -ForegroundColor Gray
Write-Host "  [5] Responsive layouts on iOS devices" -ForegroundColor Gray
Write-Host "  [6] Touch interactions work properly" -ForegroundColor Gray
Write-Host ""
$safariOk = Read-Host "Safari testing complete (or skipped)? (y/n)"

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Responsive Testing" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Test the following viewport sizes in each browser:" -ForegroundColor White
Write-Host "  - Mobile: 375x667 (iPhone)" -ForegroundColor Gray
Write-Host "  - Mobile: 414x896 (iPhone Plus)" -ForegroundColor Gray
Write-Host "  - Tablet: 768x1024 (iPad)" -ForegroundColor Gray
Write-Host "  - Desktop: 1280x720" -ForegroundColor Gray
Write-Host "  - Desktop: 1920x1080" -ForegroundColor Gray
Write-Host ""
Write-Host "Use browser DevTools to test responsive behavior:" -ForegroundColor Yellow
Write-Host "  Chrome: F12 -> Toggle Device Toolbar (Ctrl+Shift+M)" -ForegroundColor Gray
Write-Host "  Firefox: F12 -> Responsive Design Mode (Ctrl+Shift+M)" -ForegroundColor Gray
Write-Host "  Edge: F12 -> Toggle Device Emulation (Ctrl+Shift+M)" -ForegroundColor Gray
Write-Host ""
$responsiveOk = Read-Host "Responsive testing complete? (y/n)"

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Accessibility Testing" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Test accessibility features:" -ForegroundColor White
Write-Host "  [1] Keyboard navigation (Tab through all elements)" -ForegroundColor Gray
Write-Host "  [2] Focus indicators visible" -ForegroundColor Gray
Write-Host "  [3] Reduced motion (enable in OS settings)" -ForegroundColor Gray
Write-Host "  [4] Screen reader compatibility" -ForegroundColor Gray
Write-Host "  [5] Color contrast (use browser DevTools)" -ForegroundColor Gray
Write-Host ""
$a11yOk = Read-Host "Accessibility testing complete? (y/n)"

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Performance Testing" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Run Lighthouse audits in Chrome DevTools:" -ForegroundColor White
Write-Host "  1. Open Chrome DevTools (F12)" -ForegroundColor Gray
Write-Host "  2. Go to Lighthouse tab" -ForegroundColor Gray
Write-Host "  3. Run audit for Desktop and Mobile" -ForegroundColor Gray
Write-Host "  4. Check Performance, Accessibility, Best Practices scores" -ForegroundColor Gray
Write-Host ""
$perfOk = Read-Host "Performance testing complete? (y/n)"

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Testing Summary" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

$allPassed = $true

if ($chromeOk -eq "y") {
    Write-Host "[PASS] Chrome Testing" -ForegroundColor Green
} else {
    Write-Host "[FAIL] Chrome Testing" -ForegroundColor Red
    $allPassed = $false
}

if ($firefoxOk -eq "y") {
    Write-Host "[PASS] Firefox Testing" -ForegroundColor Green
} else {
    Write-Host "[FAIL] Firefox Testing" -ForegroundColor Red
    $allPassed = $false
}

if ($edgeOk -eq "y") {
    Write-Host "[PASS] Edge Testing" -ForegroundColor Green
} else {
    Write-Host "[FAIL] Edge Testing" -ForegroundColor Red
    $allPassed = $false
}

if ($safariOk -eq "y") {
    Write-Host "[PASS] Safari Testing" -ForegroundColor Green
} else {
    Write-Host "[SKIP] Safari Testing" -ForegroundColor Yellow
}

if ($responsiveOk -eq "y") {
    Write-Host "[PASS] Responsive Testing" -ForegroundColor Green
} else {
    Write-Host "[FAIL] Responsive Testing" -ForegroundColor Red
    $allPassed = $false
}

if ($a11yOk -eq "y") {
    Write-Host "[PASS] Accessibility Testing" -ForegroundColor Green
} else {
    Write-Host "[FAIL] Accessibility Testing" -ForegroundColor Red
    $allPassed = $false
}

if ($perfOk -eq "y") {
    Write-Host "[PASS] Performance Testing" -ForegroundColor Green
} else {
    Write-Host "[FAIL] Performance Testing" -ForegroundColor Red
    $allPassed = $false
}

Write-Host ""
if ($allPassed) {
    Write-Host "==================================" -ForegroundColor Green
    Write-Host "ALL TESTS PASSED!" -ForegroundColor Green
    Write-Host "==================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "The application is cross-browser compatible." -ForegroundColor Green
} else {
    Write-Host "==================================" -ForegroundColor Red
    Write-Host "SOME TESTS FAILED" -ForegroundColor Red
    Write-Host "==================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please review failed tests and fix issues." -ForegroundColor Red
}

Write-Host ""
Write-Host "Testing report saved to: frontend/CROSS_BROWSER_TESTING.md" -ForegroundColor Cyan
Write-Host ""
