package com.webvibes.portal.service;

import com.webvibes.portal.model.Course;
import com.webvibes.portal.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;

    public List<Course> listActive() {
        return courseRepository.findByActiveTrue();
    }

    public List<Course> listAll() {
        return courseRepository.findAll();
    }

    public Optional<Course> get(Long id) {
        return courseRepository.findById(id);
    }

    public Course create(Course course) {
        return courseRepository.save(course);
    }

    public Optional<Course> update(Long id, Course updated) {
        return courseRepository.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setInstructor(updated.getInstructor());
            existing.setDescription(updated.getDescription());
            existing.setDuration(updated.getDuration());
            existing.setActive(updated.isActive());
            return courseRepository.save(existing);
        });
    }

    public void delete(Long id) {
        courseRepository.deleteById(id);
    }
}
