-- Database setup script for Internship Portal
-- Run this in MySQL client or MySQL Workbench

CREATE DATABASE IF NOT EXISTS webvibes_portal;

CREATE USER IF NOT EXISTS 'webvibes_user'@'localhost' IDENTIFIED BY 'webvibes_pass';

GRANT ALL PRIVILEGES ON webvibes_portal.* TO 'webvibes_user'@'localhost';

FLUSH PRIVILEGES;

-- Verify the setup
SHOW DATABASES LIKE 'webvibes_portal';
SELECT User, Host FROM mysql.user WHERE User = 'webvibes_user';
