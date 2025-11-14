package com.webvibes.portal.service;

import com.webvibes.portal.model.Course;
import com.webvibes.portal.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final SimpMessagingTemplate messagingTemplate;

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
        Course saved = courseRepository.save(course);
        messagingTemplate.convertAndSend("/topic/courses", saved);
        return saved;
    }

    public Optional<Course> update(Long id, Course updated) {
        return courseRepository.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setInstructor(updated.getInstructor());
            existing.setDescription(updated.getDescription());
            existing.setDuration(updated.getDuration());
            existing.setCategory(updated.getCategory());
            existing.setActive(updated.isActive());
            Course saved = courseRepository.save(existing);
            messagingTemplate.convertAndSend("/topic/courses", saved);
            return saved;
        });
    }

    public void delete(Long id) {
        courseRepository.deleteById(id);
        messagingTemplate.convertAndSend("/topic/courses", "deleted:" + id);
    }
}
