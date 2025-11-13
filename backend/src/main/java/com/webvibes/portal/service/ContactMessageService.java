package com.webvibes.portal.service;

import com.webvibes.portal.model.ContactMessage;
import com.webvibes.portal.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactMessageService {
    private final ContactMessageRepository repository;

    public List<ContactMessage> listAll() { return repository.findAll(); }

    public ContactMessage create(ContactMessage msg) { return repository.save(msg); }
}
