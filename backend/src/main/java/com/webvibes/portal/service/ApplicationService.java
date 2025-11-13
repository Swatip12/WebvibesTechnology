package com.webvibes.portal.service;

import com.webvibes.portal.model.Application;
import com.webvibes.portal.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public List<Application> listAll() {
        return applicationRepository.findAll();
    }

    public List<Application> listByInternship(Long internshipId) {
        return applicationRepository.findByInternshipId(internshipId);
    }

    public Application create(Application application) {
        Application saved = applicationRepository.save(application);
        messagingTemplate.convertAndSend("/topic/applications", saved);
        return saved;
    }
}
