# Khetify - Direct Farm-to-Consumer Marketplace
A high-performance B2C marketplace platform designed to empower farmers by connecting them directly with consumers. This tool eliminates middlemen, ensuring higher profits for farmers and fresher produce for buyers.

📂 Project Structure
server.js – The robust Node.js & Express backend handling REST APIs and MySQL connectivity.
App.js – The core React.js frontend featuring a dual-interface for Farmers and Consumers.
Database (MySQL) – Relational schema for managing users, products, and real-time order tracking.

🚀 Key Features
Dual Dashboard: Specialized interfaces for both Farmer (Inventory/Earnings) and Consumer (Mandi/Orders).
Live Marketplace: Real-time product browsing with search and dynamic filtering.
Simulated Payment Gateway: Secure-checkout experience with integrated order confirmation.
Order Tracking: Live status updates from "Pending" to "Delivered" for logistics transparency.

🛠️ How to Run
# Database Setup
Open your MySQL terminal.
Create a database named khetify_db.
Import the provided SQL schema for products, users, and orders tables.

# Install Backend Dependencies
Bash
cd backend
npm install express mysql2 cors body-parser
node server.js

# Install Frontend Dependencies
Bash
cd frontend
npm install axios lucide-react tailwindcss
npm start
