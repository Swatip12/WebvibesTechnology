# PowerShell script to test WebSocket real-time updates
# This script creates a new internship via the API
# You should see it appear automatically in the frontend without refresh

Write-Host "Testing WebSocket Real-Time Updates" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Make sure:" -ForegroundColor Yellow
Write-Host "1. Backend is running on http://localhost:8080" -ForegroundColor Yellow
Write-Host "2. Frontend is running on http://localhost:4200" -ForegroundColor Yellow
Write-Host "3. You have the internships page open in your browser" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Enter to create a new internship..." -ForegroundColor Cyan
Read-Host

$internship = @{
    title = "WebSocket Test Internship"
    department = "Engineering"
    location = "Remote"
    durationWeeks = 10
    description = "This internship was created via API to test WebSocket real-time updates. It should appear automatically without page refresh!"
    active = $true
} | ConvertTo-Json

Write-Host "Creating internship..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/internships" `
        -Method Post `
        -Body $internship `
        -ContentType "application/json"
    
    Write-Host ""
    Write-Host "✓ Internship created successfully!" -ForegroundColor Green
    Write-Host "ID: $($response.id)" -ForegroundColor White
    Write-Host "Title: $($response.title)" -ForegroundColor White
    Write-Host ""
    Write-Host "Check your browser - the new internship should appear automatically!" -ForegroundColor Green
    Write-Host "Look for console logs showing WebSocket message received." -ForegroundColor Yellow
}
catch {
    Write-Host ""
    Write-Host "✗ Error creating internship:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure the backend is running on http://localhost:8080" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press Enter to exit..."
Read-Host
