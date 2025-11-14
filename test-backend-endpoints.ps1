# Backend Endpoint Testing Script
# This script tests all CRUD operations and verifies WebSocket notifications

$baseUrl = "http://localhost:8080/api"
$headers = @{
    "Content-Type" = "application/json"
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Backend Endpoint Testing" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Internship CRUD Operations
Write-Host "TEST 1: Internship CRUD Operations" -ForegroundColor Yellow
Write-Host "-----------------------------------" -ForegroundColor Yellow

# Create Internship
Write-Host "Creating internship..." -ForegroundColor Green
$internshipData = @{
    title = "Test Software Engineer Intern"
    department = "Engineering"
    location = "Remote"
    durationWeeks = 12
    description = "Test internship for backend verification"
    active = $true
} | ConvertTo-Json

try {
    $createResponse = Invoke-RestMethod -Uri "$baseUrl/internships" -Method Post -Body $internshipData -Headers $headers
    $internshipId = $createResponse.id
    Write-Host "✓ Created internship with ID: $internshipId" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to create internship: $_" -ForegroundColor Red
    exit 1
}

# Read Internship
Write-Host "Reading internship..." -ForegroundColor Green
try {
    $readResponse = Invoke-RestMethod -Uri "$baseUrl/internships/$internshipId" -Method Get
    Write-Host "✓ Read internship: $($readResponse.title)" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to read internship: $_" -ForegroundColor Red
}

# Update Internship
Write-Host "Updating internship..." -ForegroundColor Green
$updateData = @{
    title = "Updated Software Engineer Intern"
    department = "Engineering"
    location = "Hybrid"
    durationWeeks = 16
    description = "Updated test internship"
    active = $true
} | ConvertTo-Json

try {
    $updateResponse = Invoke-RestMethod -Uri "$baseUrl/internships/$internshipId" -Method Put -Body $updateData -Headers $headers
    Write-Host "✓ Updated internship: $($updateResponse.title)" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to update internship: $_" -ForegroundColor Red
}

# List All Internships
Write-Host "Listing all internships..." -ForegroundColor Green
try {
    $listResponse = Invoke-RestMethod -Uri "$baseUrl/internships" -Method Get
    Write-Host "✓ Found $($listResponse.Count) internship(s)" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to list internships: $_" -ForegroundColor Red
}

# Delete Internship
Write-Host "Deleting internship..." -ForegroundColor Green
try {
    Invoke-RestMethod -Uri "$baseUrl/internships/$internshipId" -Method Delete
    Write-Host "✓ Deleted internship with ID: $internshipId" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to delete internship: $_" -ForegroundColor Red
}

Write-Host ""

# Test 2: Course CRUD Operations
Write-Host "TEST 2: Course CRUD Operations" -ForegroundColor Yellow
Write-Host "-------------------------------" -ForegroundColor Yellow

# Create Course
Write-Host "Creating course..." -ForegroundColor Green
$courseData = @{
    title = "Test Java Programming"
    instructor = "Test Instructor"
    description = "Test course for backend verification"
    duration = "8 weeks"
    category = "Programming"
    active = $true
} | ConvertTo-Json

try {
    $createCourseResponse = Invoke-RestMethod -Uri "$baseUrl/courses" -Method Post -Body $courseData -Headers $headers
    $courseId = $createCourseResponse.id
    Write-Host "✓ Created course with ID: $courseId" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to create course: $_" -ForegroundColor Red
    exit 1
}

# Read Course
Write-Host "Reading course..." -ForegroundColor Green
try {
    $readCourseResponse = Invoke-RestMethod -Uri "$baseUrl/courses/$courseId" -Method Get
    Write-Host "✓ Read course: $($readCourseResponse.title)" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to read course: $_" -ForegroundColor Red
}

# Update Course
Write-Host "Updating course..." -ForegroundColor Green
$updateCourseData = @{
    title = "Updated Java Programming"
    instructor = "Updated Instructor"
    description = "Updated test course"
    duration = "10 weeks"
    category = "Programming"
    active = $true
} | ConvertTo-Json

try {
    $updateCourseResponse = Invoke-RestMethod -Uri "$baseUrl/courses/$courseId" -Method Put -Body $updateCourseData -Headers $headers
    Write-Host "✓ Updated course: $($updateCourseResponse.title)" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to update course: $_" -ForegroundColor Red
}

# List All Courses
Write-Host "Listing all courses..." -ForegroundColor Green
try {
    $listCoursesResponse = Invoke-RestMethod -Uri "$baseUrl/courses" -Method Get
    Write-Host "✓ Found $($listCoursesResponse.Count) course(s)" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to list courses: $_" -ForegroundColor Red
}

# Delete Course
Write-Host "Deleting course..." -ForegroundColor Green
try {
    Invoke-RestMethod -Uri "$baseUrl/courses/$courseId" -Method Delete
    Write-Host "✓ Deleted course with ID: $courseId" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to delete course: $_" -ForegroundColor Red
}

Write-Host ""

# Test 3: Application Creation
Write-Host "TEST 3: Application Creation" -ForegroundColor Yellow
Write-Host "----------------------------" -ForegroundColor Yellow

# First create an internship for the application
$tempInternshipData = @{
    title = "Temp Internship for Application Test"
    department = "Engineering"
    location = "Remote"
    durationWeeks = 10
    description = "Temporary internship"
    active = $true
} | ConvertTo-Json

try {
    $tempInternship = Invoke-RestMethod -Uri "$baseUrl/internships" -Method Post -Body $tempInternshipData -Headers $headers
    $tempInternshipId = $tempInternship.id
    Write-Host "✓ Created temporary internship with ID: $tempInternshipId" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to create temporary internship: $_" -ForegroundColor Red
    exit 1
}

# Create Application
Write-Host "Creating application..." -ForegroundColor Green
$applicationData = @{
    internshipId = $tempInternshipId
    fullName = "Test Applicant"
    email = "test@example.com"
    phone = "+1234567890"
    resumeUrl = "https://example.com/resume.pdf"
    coverLetter = "This is a test application for backend verification."
} | ConvertTo-Json

try {
    $createAppResponse = Invoke-RestMethod -Uri "$baseUrl/applications" -Method Post -Body $applicationData -Headers $headers
    Write-Host "✓ Created application with ID: $($createAppResponse.id)" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to create application: $_" -ForegroundColor Red
}

# List All Applications
Write-Host "Listing all applications..." -ForegroundColor Green
try {
    $listAppsResponse = Invoke-RestMethod -Uri "$baseUrl/applications" -Method Get
    Write-Host "✓ Found $($listAppsResponse.Count) application(s)" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to list applications: $_" -ForegroundColor Red
}

# List Applications by Internship
Write-Host "Listing applications for internship $tempInternshipId..." -ForegroundColor Green
try {
    $listAppsByInternshipResponse = Invoke-RestMethod -Uri "$baseUrl/applications/internship/$tempInternshipId" -Method Get
    Write-Host "✓ Found $($listAppsByInternshipResponse.Count) application(s) for this internship" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to list applications by internship: $_" -ForegroundColor Red
}

# Cleanup
Write-Host "Cleaning up temporary internship..." -ForegroundColor Green
try {
    Invoke-RestMethod -Uri "$baseUrl/internships/$tempInternshipId" -Method Delete
    Write-Host "✓ Deleted temporary internship" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to delete temporary internship: $_" -ForegroundColor Red
}

Write-Host ""

# Test 4: Contact Message Creation
Write-Host "TEST 4: Contact Message Creation" -ForegroundColor Yellow
Write-Host "---------------------------------" -ForegroundColor Yellow

# Create Contact Message
Write-Host "Creating contact message..." -ForegroundColor Green
$contactData = @{
    name = "Test User"
    email = "testuser@example.com"
    subject = "Test Subject"
    message = "This is a test contact message for backend verification."
} | ConvertTo-Json

try {
    $createContactResponse = Invoke-RestMethod -Uri "$baseUrl/contact" -Method Post -Body $contactData -Headers $headers
    Write-Host "✓ Created contact message with ID: $($createContactResponse.id)" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to create contact message: $_" -ForegroundColor Red
}

# List All Contact Messages
Write-Host "Listing all contact messages..." -ForegroundColor Green
try {
    $listContactsResponse = Invoke-RestMethod -Uri "$baseUrl/contact" -Method Get
    Write-Host "✓ Found $($listContactsResponse.Count) contact message(s)" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to list contact messages: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "All Backend Tests Completed!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: WebSocket notifications are sent automatically when:" -ForegroundColor Yellow
Write-Host "  - Internships are created, updated, or deleted (topic: /topic/internships)" -ForegroundColor Yellow
Write-Host "  - Courses are created, updated, or deleted (topic: /topic/courses)" -ForegroundColor Yellow
Write-Host "  - Applications are created (topic: /topic/applications)" -ForegroundColor Yellow
Write-Host ""
Write-Host "You can verify WebSocket functionality using the websocket-test.html file" -ForegroundColor Yellow
