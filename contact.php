<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit();
}

// Temporarily skip validation
$fullName = trim($_POST['fullName'] ?? '');
$phone    = trim($_POST['phone'] ?? '');
$message  = trim($_POST['message'] ?? '');

// Debug: see exactly what PHP received
if (empty($fullName) || empty($phone) || empty($message)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Missing fields",
        "received" => $_POST   // ← this will show what's actually coming in
    ]);
    exit();
}

// Rest of your DB code...
$host = 'localhost';
$dbname = 'mediline_pharmacy';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("
        INSERT INTO contact_messages (full_name, phone, message, created_at)
        VALUES (:full_name, :phone, :message, NOW())
    ");
    $stmt->execute([
        ':full_name' => $fullName,
        ':phone'     => $phone,
        ':message'   => $message
    ]);

    echo json_encode(["success" => true, "message" => "Message saved!"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "DB error: " . $e->getMessage()]);
}