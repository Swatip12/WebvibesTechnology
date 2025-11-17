package com.webvibes.portal.service;

import com.webvibes.portal.model.Course;
import com.webvibes.portal.model.CourseEnrollment;
import com.webvibes.portal.repository.CourseEnrollmentRepository;
import com.webvibes.portal.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseEnrollmentService {
    
    @Autowired
    private CourseEnrollmentRepository enrollmentRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    public List<CourseEnrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }
    
    public List<CourseEnrollment> getEnrollmentsByCourse(Long courseId) {
        return enrollmentRepository.findByCourseId(courseId);
    }
    
    public CourseEnrollment createEnrollment(CourseEnrollment enrollment, Long courseId) {
        Course course = courseRepository.findById(courseId)
            .orElseThrow(() -> new RuntimeException("Course not found"));
        enrollment.setCourse(course);
        return enrollmentRepository.save(enrollment);
    }
    
    public void deleteEnrollment(Long id) {
        enrollmentRepository.deleteById(id);
    }
}
