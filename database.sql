-- ============================================
-- FIX FOR MEDILINE PHARMACY CONTACT TABLE
-- Run this in phpMyAdmin
-- ============================================

-- Drop the old table if it exists (this will delete old data)
DROP TABLE IF EXISTS contact_messages;

-- Create the correct contact_messages table
CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(150) NOT NULL,
  message LONGTEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create indexes for better performance
ALTER TABLE contact_messages ADD INDEX idx_email (email);
ALTER TABLE contact_messages ADD INDEX idx_created_at (created_at);