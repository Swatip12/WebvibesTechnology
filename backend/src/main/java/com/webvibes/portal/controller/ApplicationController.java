package com.webvibes.portal.controller;

import com.webvibes.portal.model.Application;
import com.webvibes.portal.service.ApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping
    public List<Application> listAll() { return applicationService.listAll(); }

    @GetMapping("/internship/{internshipId}")
    public List<Application> listByInternship(@PathVariable Long internshipId) {
        return applicationService.listByInternship(internshipId);
    }

    @PostMapping
    public ResponseEntity<Application> create(@Valid @RequestBody Application application) {
        Application saved = applicationService.create(application);
        return ResponseEntity.created(URI.create("/api/applications/" + saved.getId())).body(saved);
    }
}
