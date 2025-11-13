package com.webvibes.portal.service;

import com.webvibes.portal.model.Internship;
import com.webvibes.portal.repository.InternshipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InternshipService {
    private final InternshipRepository internshipRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public List<Internship> listActive() {
        return internshipRepository.findByActiveTrue();
    }

    public List<Internship> listAll() {
        return internshipRepository.findAll();
    }

    public Optional<Internship> get(Long id) {
        return internshipRepository.findById(id);
    }

    public Internship create(Internship internship) {
        Internship saved = internshipRepository.save(internship);
        messagingTemplate.convertAndSend("/topic/internships", saved);
        return saved;
    }

    public Optional<Internship> update(Long id, Internship updated) {
        return internshipRepository.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setDepartment(updated.getDepartment());
            existing.setLocation(updated.getLocation());
            existing.setDurationWeeks(updated.getDurationWeeks());
            existing.setDescription(updated.getDescription());
            existing.setActive(updated.isActive());
            Internship saved = internshipRepository.save(existing);
            messagingTemplate.convertAndSend("/topic/internships", saved);
            return saved;
        });
    }

    public void delete(Long id) {
        internshipRepository.deleteById(id);
        messagingTemplate.convertAndSend("/topic/internships", "deleted:" + id);
    }
}
