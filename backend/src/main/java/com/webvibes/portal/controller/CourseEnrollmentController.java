package com.webvibes.portal.controller;

import com.webvibes.portal.model.CourseEnrollment;
import com.webvibes.portal.service.CourseEnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course-enrollments")
public class CourseEnrollmentController {
    
    @Autowired
    private CourseEnrollmentService enrollmentService;
    
    @GetMapping
    public List<CourseEnrollment> getAllEnrollments() {
        return enrollmentService.getAllEnrollments();
    }
    
    @GetMapping("/course/{courseId}")
    public List<CourseEnrollment> getEnrollmentsByCourse(@PathVariable Long courseId) {
        return enrollmentService.getEnrollmentsByCourse(courseId);
    }
    
    @PostMapping
    public CourseEnrollment createEnrollment(@RequestBody CourseEnrollment enrollment) {
        return enrollmentService.createEnrollment(enrollment, enrollment.getCourse().getId());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnrollment(@PathVariable Long id) {
        enrollmentService.deleteEnrollment(id);
        return ResponseEntity.noContent().build();
    }
}
