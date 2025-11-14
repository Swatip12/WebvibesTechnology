# Quick script to create a test internship
$body = @{
    title = "Full Stack Developer Intern"
    department = "Engineering"
    location = "Bangalore"
    durationWeeks = 12
    description = "Join our team to work on exciting web applications using Angular and Spring Boot!"
    active = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/internships" -Method Post -Body $body -ContentType "application/json"
Write-Host "Internship created! Check your browser - it should appear automatically!" -ForegroundColor Green
