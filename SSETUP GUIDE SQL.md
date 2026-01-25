<?php
// Database connection
$conn = new mysqli("localhost", "root", "", "");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database if not exists
$sql = "CREATE DATABASE IF NOT EXISTS mediline_pharmacy";
if ($conn->query($sql) !== TRUE) {
    echo "Error creating database: " . $conn->error;
    exit();
}

// Select database
$conn->select_db("mediline_pharmacy");

// Create table
$sql = "CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX(created_at)
)";

if ($conn->query($sql) === TRUE) {
    echo json_encode([
        "success" => true,
        "message" => "Database and table created successfully!"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error creating table: " . $conn->error
    ]);
}

$conn->close();
?>
