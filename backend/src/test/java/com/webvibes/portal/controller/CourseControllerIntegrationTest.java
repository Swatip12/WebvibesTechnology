package com.webvibes.portal.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webvibes.portal.model.Course;
import com.webvibes.portal.repository.CourseRepository;
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
class CourseControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CourseRepository courseRepository;

    @BeforeEach
    void setUp() {
        courseRepository.deleteAll();
    }

    @Test
    void testCreateCourse() throws Exception {
        Course course = new Course();
        course.setTitle("Introduction to Java");
        course.setInstructor("John Doe");
        course.setDescription("Learn Java programming from scratch");
        course.setDuration("8 weeks");
        course.setCategory("Programming");
        course.setActive(true);

        mockMvc.perform(post("/api/courses")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(course)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.title").value("Introduction to Java"))
                .andExpect(jsonPath("$.instructor").value("John Doe"))
                .andExpect(jsonPath("$.description").value("Learn Java programming from scratch"))
                .andExpect(jsonPath("$.duration").value("8 weeks"))
                .andExpect(jsonPath("$.category").value("Programming"))
                .andExpect(jsonPath("$.active").value(true));
    }

    @Test
    void testGetAllCourses() throws Exception {
        Course course1 = createTestCourse("Web Development", "Jane Smith", "Programming");
        Course course2 = createTestCourse("UI/UX Design", "Bob Johnson", "Design");
        
        courseRepository.save(course1);
        courseRepository.save(course2);

        mockMvc.perform(get("/api/courses"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].title").value("Web Development"))
                .andExpect(jsonPath("$[1].title").value("UI/UX Design"));
    }

    @Test
    void testGetActiveCourses() throws Exception {
        Course active = createTestCourse("Active Course", "Instructor A", "Programming");
        active.setActive(true);
        
        Course inactive = createTestCourse("Inactive Course", "Instructor B", "Design");
        inactive.setActive(false);
        
        courseRepository.save(active);
        courseRepository.save(inactive);

        mockMvc.perform(get("/api/courses/active"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].title").value("Active Course"))
                .andExpect(jsonPath("$[0].active").value(true));
    }

    @Test
    void testGetCourseById() throws Exception {
        Course course = createTestCourse("Data Science", "Dr. Smith", "Analytics");
        Course saved = courseRepository.save(course);

        mockMvc.perform(get("/api/courses/" + saved.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(saved.getId()))
                .andExpect(jsonPath("$.title").value("Data Science"))
                .andExpect(jsonPath("$.instructor").value("Dr. Smith"))
                .andExpect(jsonPath("$.category").value("Analytics"));
    }

    @Test
    void testGetCourseById_NotFound() throws Exception {
        mockMvc.perform(get("/api/courses/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testUpdateCourse() throws Exception {
        Course course = createTestCourse("Original Title", "Original Instructor", "Programming");
        Course saved = courseRepository.save(course);

        saved.setTitle("Updated Title");
        saved.setInstructor("Updated Instructor");
        saved.setDuration("12 weeks");

        mockMvc.perform(put("/api/courses/" + saved.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(saved)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Title"))
                .andExpect(jsonPath("$.instructor").value("Updated Instructor"))
                .andExpect(jsonPath("$.duration").value("12 weeks"));
    }

    @Test
    void testUpdateCourse_NotFound() throws Exception {
        Course course = createTestCourse("Test", "Test Instructor", "Programming");

        mockMvc.perform(put("/api/courses/999")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(course)))
                .andExpect(status().isNotFound());
    }

    @Test
    void testDeleteCourse() throws Exception {
        Course course = createTestCourse("To Delete", "Instructor", "Programming");
        Course saved = courseRepository.save(course);

        mockMvc.perform(delete("/api/courses/" + saved.getId()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/courses/" + saved.getId()))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCreateCourse_ValidationError() throws Exception {
        Course course = new Course();
        // Missing required fields

        mockMvc.perform(post("/api/courses")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(course)))
                .andExpect(status().isBadRequest());
    }

    private Course createTestCourse(String title, String instructor, String category) {
        Course course = new Course();
        course.setTitle(title);
        course.setInstructor(instructor);
        course.setDescription("Test description for " + title);
        course.setDuration("6 weeks");
        course.setCategory(category);
        course.setActive(true);
        return course;
    }
}
