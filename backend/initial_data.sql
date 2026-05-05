-- Initial Data for LearnX

-- Clear existing data (use with caution)
TRUNCATE skill_paths, announcements RESTART IDENTITY CASCADE;

-- Insert Skill Paths
INSERT INTO skill_paths (title, description, image_url, color) VALUES
('Python Developer', 'Master the most popular programming language of 2026.', '/assets/pythondev.png', '#4f46e5'),
('SQL Developer', 'Learn how to query and manage relational databases.', '/assets/sql.png', '#6366f1'),
('Data Structures & Algorithms', 'Enhance your problem-solving skills for technical interviews.', '/assets/image1.png', '#8b5cf6'),
('Aptitude Preparation', 'Prepare for your placements with quantitative and verbal aptitude.', '/assets/aptitude.png', '#a78bfa');

-- Insert Announcements
INSERT INTO announcements (title, body, dot_color) VALUES
('New Skill Path: React Developer', 'We are excited to announce our upcoming React path launching next week!', '#10b981'),
('System Maintenance tonight', 'Our database will be upgraded at midnight (IST).', '#f59e0b');
