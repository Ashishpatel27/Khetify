CREATE DATABASE khetify_db;
USE khetify_db;

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(100),
    price DECIMAL(10,2),
    quantity VARCHAR(50),
    farmer_name VARCHAR(100),
    image_url VARCHAR(255)
);

-- Kuch sample data daal dete hain
INSERT INTO products (item_name, price, quantity, farmer_name, image_url) VALUES 
('Fresh Tamatar', 40.00, '100kg', 'Ram Singh', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'),
('Organic Gehu', 22.00, '500kg', 'Sohan Lal', 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400');

-- 1. Users Table (Farmer aur Consumer dono ke liye)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('farmer', 'consumer', 'admin', 'delivery') DEFAULT 'consumer',
    phone VARCHAR(15)
);

-- 2. Orders Table (Tracking ke liye)
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id INT,
    product_id INT,
    quantity_ordered VARCHAR(50),
    total_price DECIMAL(10,2),
    status ENUM('Pending', 'Packed', 'Out for Delivery', 'Delivered') DEFAULT 'Pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
