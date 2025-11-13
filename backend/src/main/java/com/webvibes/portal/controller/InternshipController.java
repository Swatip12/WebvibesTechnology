package com.webvibes.portal.controller;

import com.webvibes.portal.model.Internship;
import com.webvibes.portal.service.InternshipService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/internships")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class InternshipController {

    private final InternshipService internshipService;

    @GetMapping
    public List<Internship> listAll() {
        return internshipService.listAll();
    }

    @GetMapping("/active")
    public List<Internship> listActive() {
        return internshipService.listActive();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Internship> get(@PathVariable Long id) {
        return internshipService.get(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Internship> create(@Valid @RequestBody Internship internship) {
        Internship saved = internshipService.create(internship);
        return ResponseEntity.created(URI.create("/api/internships/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Internship> update(@PathVariable Long id, @Valid @RequestBody Internship internship) {
        return internshipService.update(id, internship)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        internshipService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
