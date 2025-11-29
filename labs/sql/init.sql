CREATE DATABASE IF NOT EXISTS college;
USE college;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    major VARCHAR(50),
    gpa DECIMAL(3, 2)
);

INSERT INTO students (name, major, gpa) VALUES 
('Alice Johnson', 'Computer Science', 3.8),
('Bob Smith', 'Mathematics', 3.2),
('Charlie Brown', 'Physics', 3.9);

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100),
    credits INT
);

INSERT INTO courses (course_name, credits) VALUES
('Intro to AI', 4),
('Database Systems', 3);