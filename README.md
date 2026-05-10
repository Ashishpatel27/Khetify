# Khetify - Direct Farm-to-Consumer Marketplace

A high-performance B2C marketplace platform designed to empower farmers by connecting them directly with consumers. This tool eliminates middlemen, ensuring higher profits for farmers and fresher produce for buyers.

---

## 📂 Project Structure
* **server.js** – The robust Node.js & Express backend handling REST APIs and MySQL connectivity.
* **App.js** – The core React.js frontend featuring a dual-interface for Farmers and Consumers.
* **Database (MySQL)** – Relational schema for managing users, products, and real-time order tracking.

---

## 🛠️ How to Run
```bash
### # Database Setup
# Open your MySQL terminal.
# Create a database named khetify_db.
# Import the provided SQL schema for products, users, and orders tables.

### # Install Backend Dependencies

# cd backend
# npm install express mysql2 cors body-parser
# node server.js

---

### # Install Frontend Dependencies

# cd frontend
# npm install axios lucide-react tailwindcss
# npm start
