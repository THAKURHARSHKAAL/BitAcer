<?php
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'bitacer';

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Create tables if they don't exist
$tables = [
    "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        wallet_address VARCHAR(42),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",
    
    "CREATE TABLE IF NOT EXISTS nfts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        token_id VARCHAR(100) NOT NULL UNIQUE,
        owner_id INT,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        image_url VARCHAR(255),
        price DECIMAL(20,8),
        is_listed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users(id)
    )",
    
    "CREATE TABLE IF NOT EXISTS transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nft_id INT,
        seller_id INT,
        buyer_id INT,
        price DECIMAL(20,8),
        transaction_hash VARCHAR(66),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (nft_id) REFERENCES nfts(id),
        FOREIGN KEY (seller_id) REFERENCES users(id),
        FOREIGN KEY (buyer_id) REFERENCES users(id)
    )"
];

foreach ($tables as $sql) {
    try {
        $conn->exec($sql);
    } catch(PDOException $e) {
        die("Error creating table: " . $e->getMessage());
    }
}
