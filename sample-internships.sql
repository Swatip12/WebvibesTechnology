-- Sample internship data for testing
USE webvibes_portal;

INSERT INTO internship (title, department, location, duration_weeks, description, active, posted_at) VALUES
('Software Development Intern', 'Engineering', 'Bangalore', 12, 'Work on cutting-edge web applications using modern technologies. Gain hands-on experience with full-stack development.', true, NOW()),
('Data Science Intern', 'Analytics', 'Mumbai', 10, 'Analyze large datasets and build machine learning models. Learn data visualization and statistical analysis.', true, NOW()),
('UI/UX Design Intern', 'Design', 'Pune', 8, 'Create beautiful and intuitive user interfaces. Work with design tools and collaborate with developers.', true, NOW()),
('Marketing Intern', 'Marketing', 'Delhi', 12, 'Develop marketing campaigns and analyze market trends. Learn digital marketing strategies.', true, NOW()),
('DevOps Intern', 'Engineering', 'Bangalore', 12, 'Learn cloud infrastructure, CI/CD pipelines, and automation. Work with AWS and Docker.', true, NOW());
