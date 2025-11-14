package com.webvibes.portal.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webvibes.portal.model.Application;
import com.webvibes.portal.model.Internship;
import com.webvibes.portal.repository.ApplicationRepository;
import com.webvibes.portal.repository.InternshipRepository;
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
class ApplicationControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private InternshipRepository internshipRepository;

    private Long testInternshipId;

    @BeforeEach
    void setUp() {
        applicationRepository.deleteAll();
        internshipRepository.deleteAll();
        
        // Create a test internship
        Internship internship = new Internship();
        internship.setTitle("Test Internship");
        internship.setDepartment("Engineering");
        internship.setLocation("Remote");
        internship.setDurationWeeks(10);
        internship.setDescription("Test description");
        internship.setActive(true);
        testInternshipId = internshipRepository.save(internship).getId();
    }

    @Test
    void testCreateApplication() throws Exception {
        Application application = new Application();
        application.setInternshipId(testInternshipId);
        application.setFullName("John Doe");
        application.setEmail("john.doe@example.com");
        application.setPhone("+1234567890");
        application.setResumeUrl("https://example.com/resume.pdf");
        application.setCoverLetter("I am very interested in this position...");

        mockMvc.perform(post("/api/applications")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(application)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.internshipId").value(testInternshipId))
                .andExpect(jsonPath("$.fullName").value("John Doe"))
                .andExpect(jsonPath("$.email").value("john.doe@example.com"))
                .andExpect(jsonPath("$.phone").value("+1234567890"))
                .andExpect(jsonPath("$.resumeUrl").value("https://example.com/resume.pdf"))
                .andExpect(jsonPath("$.coverLetter").value("I am very interested in this position..."))
                .andExpect(jsonPath("$.appliedAt").exists());
    }

    @Test
    void testGetAllApplications() throws Exception {
        Application app1 = createTestApplication("Alice Smith", "alice@example.com");
        Application app2 = createTestApplication("Bob Johnson", "bob@example.com");
        
        applicationRepository.save(app1);
        applicationRepository.save(app2);

        mockMvc.perform(get("/api/applications"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].fullName").value("Alice Smith"))
                .andExpect(jsonPath("$[1].fullName").value("Bob Johnson"));
    }

    @Test
    void testGetApplicationsByInternship() throws Exception {
        // Create another internship
        Internship internship2 = new Internship();
        internship2.setTitle("Another Internship");
        internship2.setDepartment("Marketing");
        internship2.setLocation("New York");
        internship2.setDurationWeeks(8);
        internship2.setDescription("Marketing internship");
        internship2.setActive(true);
        Long internship2Id = internshipRepository.save(internship2).getId();

        // Create applications for different internships
        Application app1 = createTestApplication("Alice Smith", "alice@example.com");
        app1.setInternshipId(testInternshipId);
        
        Application app2 = createTestApplication("Bob Johnson", "bob@example.com");
        app2.setInternshipId(testInternshipId);
        
        Application app3 = createTestApplication("Charlie Brown", "charlie@example.com");
        app3.setInternshipId(internship2Id);
        
        applicationRepository.save(app1);
        applicationRepository.save(app2);
        applicationRepository.save(app3);

        mockMvc.perform(get("/api/applications/internship/" + testInternshipId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].fullName").value("Alice Smith"))
                .andExpect(jsonPath("$[1].fullName").value("Bob Johnson"));

        mockMvc.perform(get("/api/applications/internship/" + internship2Id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].fullName").value("Charlie Brown"));
    }

    @Test
    void testCreateApplication_ValidationError() throws Exception {
        Application application = new Application();
        // Missing required fields

        mockMvc.perform(post("/api/applications")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(application)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreateApplication_InvalidEmail() throws Exception {
        Application application = createTestApplication("Test User", "invalid-email");

        mockMvc.perform(post("/api/applications")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(application)))
                .andExpect(status().isBadRequest());
    }

    private Application createTestApplication(String fullName, String email) {
        Application application = new Application();
        application.setInternshipId(testInternshipId);
        application.setFullName(fullName);
        application.setEmail(email);
        application.setPhone("+1234567890");
        application.setResumeUrl("https://example.com/resume.pdf");
        application.setCoverLetter("I am interested in this position.");
        return application;
    }
}
