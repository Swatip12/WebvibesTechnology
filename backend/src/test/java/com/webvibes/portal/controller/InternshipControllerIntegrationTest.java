package com.webvibes.portal.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webvibes.portal.model.Internship;
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
class InternshipControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private InternshipRepository internshipRepository;

    @BeforeEach
    void setUp() {
        internshipRepository.deleteAll();
    }

    @Test
    void testCreateInternship() throws Exception {
        Internship internship = new Internship();
        internship.setTitle("Software Engineer Intern");
        internship.setDepartment("Engineering");
        internship.setLocation("Remote");
        internship.setDurationWeeks(12);
        internship.setDescription("Work on exciting projects");
        internship.setActive(true);

        mockMvc.perform(post("/api/internships")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(internship)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.title").value("Software Engineer Intern"))
                .andExpect(jsonPath("$.department").value("Engineering"))
                .andExpect(jsonPath("$.location").value("Remote"))
                .andExpect(jsonPath("$.durationWeeks").value(12))
                .andExpect(jsonPath("$.description").value("Work on exciting projects"))
                .andExpect(jsonPath("$.active").value(true));
    }

    @Test
    void testGetAllInternships() throws Exception {
        Internship internship1 = createTestInternship("Backend Developer", "Engineering", "New York");
        Internship internship2 = createTestInternship("Frontend Developer", "Engineering", "San Francisco");
        
        internshipRepository.save(internship1);
        internshipRepository.save(internship2);

        mockMvc.perform(get("/api/internships"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].title").value("Backend Developer"))
                .andExpect(jsonPath("$[1].title").value("Frontend Developer"));
    }

    @Test
    void testGetActiveInternships() throws Exception {
        Internship active = createTestInternship("Active Internship", "Engineering", "Boston");
        active.setActive(true);
        
        Internship inactive = createTestInternship("Inactive Internship", "Marketing", "Chicago");
        inactive.setActive(false);
        
        internshipRepository.save(active);
        internshipRepository.save(inactive);

        mockMvc.perform(get("/api/internships/active"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].title").value("Active Internship"))
                .andExpect(jsonPath("$[0].active").value(true));
    }

    @Test
    void testGetInternshipById() throws Exception {
        Internship internship = createTestInternship("Data Analyst", "Analytics", "Austin");
        Internship saved = internshipRepository.save(internship);

        mockMvc.perform(get("/api/internships/" + saved.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(saved.getId()))
                .andExpect(jsonPath("$.title").value("Data Analyst"))
                .andExpect(jsonPath("$.department").value("Analytics"));
    }

    @Test
    void testGetInternshipById_NotFound() throws Exception {
        mockMvc.perform(get("/api/internships/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testUpdateInternship() throws Exception {
        Internship internship = createTestInternship("Original Title", "Engineering", "Seattle");
        Internship saved = internshipRepository.save(internship);

        saved.setTitle("Updated Title");
        saved.setLocation("Portland");

        mockMvc.perform(put("/api/internships/" + saved.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(saved)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Title"))
                .andExpect(jsonPath("$.location").value("Portland"));
    }

    @Test
    void testUpdateInternship_NotFound() throws Exception {
        Internship internship = createTestInternship("Test", "Engineering", "Remote");

        mockMvc.perform(put("/api/internships/999")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(internship)))
                .andExpect(status().isNotFound());
    }

    @Test
    void testDeleteInternship() throws Exception {
        Internship internship = createTestInternship("To Delete", "Engineering", "Remote");
        Internship saved = internshipRepository.save(internship);

        mockMvc.perform(delete("/api/internships/" + saved.getId()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/internships/" + saved.getId()))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCreateInternship_ValidationError() throws Exception {
        Internship internship = new Internship();
        // Missing required fields

        mockMvc.perform(post("/api/internships")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(internship)))
                .andExpect(status().isBadRequest());
    }

    private Internship createTestInternship(String title, String department, String location) {
        Internship internship = new Internship();
        internship.setTitle(title);
        internship.setDepartment(department);
        internship.setLocation(location);
        internship.setDurationWeeks(10);
        internship.setDescription("Test description");
        internship.setActive(true);
        return internship;
    }
}
