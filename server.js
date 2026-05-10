const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Ashu@2701', // Apna MySQL password yahan likhein
    database: 'khetify_db'
}).promise();

// API: Get All Products
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API: Add New Product (Farmer Side)
app.post('/api/add-product', async (req, res) => {
    const { item_name, price, quantity, farmer_name, image_url } = req.body;
    try {
        await db.query('INSERT INTO products (item_name, price, quantity, farmer_name, image_url) VALUES (?, ?, ?, ?, ?)', 
        [item_name, price, quantity, farmer_name, image_url]);
        res.json({ message: "Khetify par fasal list ho gayi!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log("Khetify Server running on port 5000"));

// Product Delete karne ka API
app.delete('/api/delete-product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM products WHERE id = ?', [id]);
        res.json({ message: "Fasal Mandi se hata di gayi!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Order Place karne ka API
app.post('/api/place-order', async (req, res) => {
    const { buyer_id, product_id, quantity, total_price } = req.body;
    try {
        const query = 'INSERT INTO orders (buyer_id, product_id, quantity_ordered, total_price) VALUES (?, ?, ?, ?)';
        await db.query(query, [buyer_id || 1, product_id, quantity, total_price]);
        res.json({ message: "Order successfully place ho gaya!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});