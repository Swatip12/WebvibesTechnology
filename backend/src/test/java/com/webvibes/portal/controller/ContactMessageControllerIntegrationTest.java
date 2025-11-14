package com.webvibes.portal.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webvibes.portal.model.ContactMessage;
import com.webvibes.portal.repository.ContactMessageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@ActiveProfiles("test")
class ContactMessageControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @BeforeEach
    void setUp() {
        contactMessageRepository.deleteAll();
    }

    @Test
    void testCreateContactMessage() throws Exception {
        ContactMessage message = new ContactMessage();
        message.setName("Jane Doe");
        message.setEmail("jane.doe@example.com");
        message.setSubject("Inquiry about internships");
        message.setMessage("I would like to know more about available internship opportunities.");

        mockMvc.perform(post("/api/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(message)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").value("Jane Doe"))
                .andExpect(jsonPath("$.email").value("jane.doe@example.com"))
                .andExpect(jsonPath("$.subject").value("Inquiry about internships"))
                .andExpect(jsonPath("$.message").value("I would like to know more about available internship opportunities."))
                .andExpect(jsonPath("$.sentAt").exists());
    }

    @Test
    void testGetAllContactMessages() throws Exception {
        ContactMessage msg1 = createTestMessage("Alice Smith", "alice@example.com", "Question 1");
        ContactMessage msg2 = createTestMessage("Bob Johnson", "bob@example.com", "Question 2");
        
        contactMessageRepository.save(msg1);
        contactMessageRepository.save(msg2);

        mockMvc.perform(get("/api/contact"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name").value("Alice Smith"))
                .andExpect(jsonPath("$[1].name").value("Bob Johnson"));
    }

    @Test
    void testCreateContactMessage_ValidationError() throws Exception {
        ContactMessage message = new ContactMessage();
        // Missing required fields

        mockMvc.perform(post("/api/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(message)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreateContactMessage_InvalidEmail() throws Exception {
        ContactMessage message = createTestMessage("Test User", "invalid-email", "Test Subject");

        mockMvc.perform(post("/api/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(message)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testContactMessagePersistence() throws Exception {
        ContactMessage message = createTestMessage("John Doe", "john@example.com", "Test Subject");

        mockMvc.perform(post("/api/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(message)))
                .andExpect(status().isCreated());

        // Verify the message was saved to the database
        mockMvc.perform(get("/api/contact"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name").value("John Doe"))
                .andExpect(jsonPath("$[0].email").value("john@example.com"))
                .andExpect(jsonPath("$[0].subject").value("Test Subject"));
    }

    private ContactMessage createTestMessage(String name, String email, String subject) {
        ContactMessage message = new ContactMessage();
        message.setName(name);
        message.setEmail(email);
        message.setSubject(subject);
        message.setMessage("This is a test message.");
        return message;
    }
}
