# 📚 Library Management System

### 🧠 Tech Stack
- Frontend: React + Tailwind CSS (Vite)
- Backend: Node.js + Express + Sequelize + MySQL
- Auth: JWT + bcrypt

### ⚙️ Setup Guide

1. Create database in phpMyAdmin:
   ```sql
   CREATE DATABASE library_db;
   ```

2. Start backend:
   ```
   cd library-management-system/server
   npm install
   npm run seed
   npm start
   ```

3. Start frontend:
   ```
   cd ../client
   npm install
   npm run dev
   ```

Default login:
| Role | Username | Password |
|------|-----------|-----------|
| User | user1 | 123456 |
| Author | author1 | 123456 |
