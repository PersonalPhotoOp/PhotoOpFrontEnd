-- Create the database
CREATE DATABASE CloudLensPhotographyApp;
USE CloudLensPhotographyApp;

-- 1. Table to store user information
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

-- 2. Table to store photo collections created by users
CREATE TABLE Collections (
    collection_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    collection_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- 3. Table to store images with references to Cloudinary URLs and metadata
CREATE TABLE Images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    collection_id INT NOT NULL,
    cloudinary_url VARCHAR(255) NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (collection_id) REFERENCES Collections(collection_id) ON DELETE CASCADE
);

-- 4. Table to store active user sessions for login tracking
CREATE TABLE Sessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    logout_time TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- 5. Table to store tags for categorizing images
CREATE TABLE Tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL UNIQUE
);

-- 6. Many-to-many relationship table for associating tags with images
CREATE TABLE ImageTags (
    image_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (image_id, tag_id),
    FOREIGN KEY (image_id) REFERENCES Images(image_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES Tags(tag_id) ON DELETE CASCADE
);

-- 7. Table to store user-specific preferences
CREATE TABLE UserPreferences (
    preference_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    theme VARCHAR(20) DEFAULT 'light',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    display_layout VARCHAR(20) DEFAULT 'grid',
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);


-- Queries and Transactions
-- Retrieve all collections and their images for a specific user
SELECT c.collection_id, c.name AS collection_name, i.image_id, i.cloudinary_url, i.upload_date
FROM Users u
JOIN Collections c ON u.user_id = c.user_id
JOIN Images i ON c.collection_id = i.collection_id
WHERE u.user_id = ?;

-- Retrieve all images tagged with a specific term for a particular user
SELECT i.image_id, i.cloudinary_url, i.upload_date
FROM Users u
JOIN Collections c ON u.user_id = c.user_id
JOIN Images i ON c.collection_id = i.collection_id
JOIN ImageTags it ON i.image_id = it.image_id
JOIN Tags t ON it.tag_id = t.tag_id
WHERE u.user_id = ? AND t.tag_name = ?;

-- Insert a new image into a specified collection
INSERT INTO Images (collection_id, cloudinary_url)
VALUES (?, ?);

-- Add a new tag to an image (creating the tag if it doesn’t exist)
-- Step 1: Insert the tag if it doesn’t already exist
INSERT INTO Tags (tag_name) 
VALUES (?) 
ON DUPLICATE KEY UPDATE tag_id=tag_id;

-- Step 2: Associate the tag with the image
INSERT INTO ImageTags (image_id, tag_id)
VALUES (?, (SELECT tag_id FROM Tags WHERE tag_name = ?));

-- Log a user login by creating a session
INSERT INTO Sessions (user_id, session_token) 
VALUES (?, 'unique_session_token_here');

-- Update session with logout time on logout
UPDATE Sessions
SET logout_time = CURRENT_TIMESTAMP
WHERE user_id = ? AND session_token = ?;

-- Update user preferences for a specific user
UPDATE UserPreferences
SET theme = ?, notifications_enabled = ?, display_layout = ?
WHERE user_id = ?;

-- Retrieve user preferences for personalization
SELECT theme, notifications_enabled, display_layout
FROM UserPreferences
WHERE user_id = ?;
