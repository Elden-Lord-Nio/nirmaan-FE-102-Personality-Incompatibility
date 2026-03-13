CREATE DATABASE IF NOT EXISTS goallink;
USE goallink;

-- Users Table: Stores authentication and profile data
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    gender VARCHAR(20) DEFAULT 'male',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Personality_Results Table: Stores the MBTI test results mapping to a user
CREATE TABLE Personality_Results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    mbti_type VARCHAR(4) NOT NULL, -- e.g., 'INTJ', 'ENFP'
    extroversion_score INT,
    intuition_score INT,
    thinking_score INT,
    judging_score INT,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Interests Table: Stores individual interests, mapping to a user
CREATE TABLE Interests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    interest_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);
