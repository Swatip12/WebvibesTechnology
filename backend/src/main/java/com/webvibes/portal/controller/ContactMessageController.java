package com.webvibes.portal.controller;

import com.webvibes.portal.model.ContactMessage;
import com.webvibes.portal.service.ContactMessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class ContactMessageController {

    private final ContactMessageService service;

    @GetMapping
    public List<ContactMessage> listAll() { return service.listAll(); }

    @PostMapping
    public ResponseEntity<ContactMessage> create(@Valid @RequestBody ContactMessage msg) {
        ContactMessage saved = service.create(msg);
        return ResponseEntity.created(URI.create("/api/contact/" + saved.getId())).body(saved);
    }
}
