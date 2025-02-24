# Task Whiz

Task Whiz is a task management application built with **React + TypeScript (Frontend)**, **Node.js + Express (Backend)**, and **PostgreSQL (Database)**. The application provides **user authentication (JWT-based)** and full **CRUD operations** for task management.

## Features

- **User Authentication** (Register/Login with JWT tokens)
- **Task Management** (Create, View, Edit, Delete, Mark Complete)
- **PostgreSQL Database** with relational user-task structure
- **Secure API** (JWT-based authorization)
- **Material UI for UI Components**

---

## 📌 **Database Setup with Migrations**

Instead of manually creating tables, we use **Knex.js** for database migrations. Follow these steps:

### **1️⃣ Install Dependencies**

Run this in the backend folder:

```bash
npm install knex pg
```

### **2️⃣ Run Migrations**

```bash
npx knex migrate:latest
```

This will **automatically create the tables** in your PostgreSQL database.

### **3️⃣ Run Seed Data (Optional)**

If you want to populate the database with sample data:

```bash
npx knex seed:run
```

---

## 🚀 **Backend Setup**

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a **`.env`** file and configure your database credentials:
   ```ini
   DB_USER=your_username
   DB_HOST=localhost
   DB_NAME=taskwhiz
   DB_PORT=5432
   JWT_SECRET=your_secret_key
   ```
4. Run database migrations:
   ```bash
   npx knex migrate:latest
   ```
5. Start the backend server:
   ```bash
   npm start
   ```
   The backend runs on **port 3001**.

---

## 🎨 **Frontend Setup**

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a **`.env`** file and configure the backend API URL:
   ```ini
   REACT_APP_API_URL=http://localhost:3001
   ```
4. Start the frontend application:
   ```bash
   npm start
   ```
   The frontend runs on **port 3000**.

---

## 🔗 **API Endpoints**

### **Authentication**

- `POST /auth/register` - Create a new user
- `POST /auth/login` - Login user and return a JWT token

### **Tasks (Protected Routes - Requires JWT)**

- `GET /tasks` - Retrieve user's tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

---

## ⚙ **Development Notes**

- **Passwords** are securely hashed using **bcrypt**.
- **Task routes** require a **valid JWT** in the Authorization header.
- The **frontend UI** is designed with **Material UI** for a modern and responsive look.
- **Tasks are linked to users** via a foreign key relationship in the database.

---

## 🎥 **Demo Video**

## https://www.loom.com/share/725154c3229d4fc49db84b0e8bb2a2a3?sid=26fb46ed-89cc-4fa8-a8f7-fc63bfb20f9a

## 📜 **Original Challenge Requirements**

This project was built based on the given challenge requirements and extended with a modern, scalable approach.

---

## ✅ **Next Steps**

- Deploy backend on **Render/Vercel/Heroku**.
- Deploy frontend on **Vercel/Netlify**.
- Add **drag-and-drop** task reordering.
- Implement **task prioritization and reminders**.

---

### 🎉 **Enjoy using Task Whiz!** 🚀
