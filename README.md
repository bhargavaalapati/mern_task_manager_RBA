# 📋 Task Manager with Role-Based Access Control (RBAC)

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## 🚀 Tech Stack

![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react&logoColor=white)
![Node](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Framework-Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-black?logo=jsonwebtokens)
![REST API](https://img.shields.io/badge/API-REST-0052CC)
![GitHub](https://img.shields.io/badge/Version%20Control-GitHub-181717?logo=github)

---

A full-stack **MERN** application that demonstrates secure authentication, user/admin role permissions, protected routes, and a clean UI with task management features.

This project is designed to be **cloned and run locally**, making it easy for reviewers or teammates to test your backend & frontend without deployment.

---

## 🚀 Features

### 🔐 Authentication & Security

- JWT-based Login / Register
- Password hashing using **Bcrypt**
- Protected API routes & frontend route guards

### 👤 Role-Based Access Control (RBAC)

- **User Role**

  - Create, Read, Update, Delete **only their own tasks**

- **Admin Role**

  - View **all tasks**
  - Delete **any task**
  - Cannot create tasks (monitoring-only role)

### 🛠️ Functionality & UI

- Server-side pagination
- Search by text + filter by status
- Responsive UI built with Tailwind CSS
- React Context API for Auth State

---

## 💻 Tech Stack

| Layer        | Technologies                                    |
| ------------ | ----------------------------------------------- |
| **Frontend** | React (Vite), Tailwind CSS, Axios, React Router |
| **Backend**  | Node.js, Express.js                             |
| **Database** | MongoDB, Mongoose                               |
| **Auth**     | JWT, Bcrypt                                     |

---

# ⚙️ How to Run the Project Locally

This project is **not deployed**, so cloning and running locally is the correct way to test it.

---

## ✔️ Prerequisites

Before running this project, you must install:

- **Node.js** (v14 or higher)
- **MongoDB**

  - Installed locally **OR**
  - MongoDB Atlas cloud connection string

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/bhargavaalapati/mern_task_manager_RBA
cd mern_task_manager_RBA
```

---

## 2️⃣ Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

### ➤ Create a `.env` file

Inside the **backend/** folder, create a file named `.env` and paste:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager_db
JWT_SECRET=put_any_secret_key_here
```

> If using MongoDB Atlas, replace `MONGO_URI` with your cloud connection string.

Start the backend server:

```bash
npm run dev
```

If successful, the terminal will show:

```
MongoDB Connected
Server running on port 5000
```

---

## 3️⃣ Frontend Setup

Open a new terminal tab:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Start the React app:

```bash
npm run dev
```

Your browser link will be shown, usually:

➡ [http://localhost:5173](http://localhost:5173)

---

# 🧪 Testing Guide (Important)

This section ensures anyone can test **User Mode** and **Admin Mode** locally.

---

## ✔️ Test as a Normal User

1. Go to the Register page
2. Create an account (e.g., `user1`)
3. Login → You will land on the Dashboard
4. Create tasks → You can Edit/Delete **your own** tasks
5. You will **not** see tasks created by others

---

## ✔️ Test Admin Role (Manual Promotion)

All registered users start as “user”.
To test **Admin Mode**, follow these steps:

1. Open **MongoDB Compass / Atlas**
2. Open the `users` collection
3. Find the user you want to promote (e.g., `admin1`)
4. Change this field:

```json
"role": "admin"
```

5. Log in again → You will now see:

   - **Admin Mode** banner
   - **All tasks** from all users
   - **Create Task** button disabled (admin can only monitor)

---

# 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| POST   | `/api/register` | Register a user   |
| POST   | `/api/login`    | Login & get token |

---

### 📝 Tasks

| Method | Endpoint         | Description                      | Access                   |
| ------ | ---------------- | -------------------------------- | ------------------------ |
| GET    | `/api/tasks`     | Get tasks (pagination supported) | User → own / Admin → all |
| POST   | `/api/tasks`     | Create a task                    | User only                |
| GET    | `/api/tasks/:id` | Get task details                 | Owner / Admin            |
| PUT    | `/api/tasks/:id` | Update a task                    | Owner only               |
| DELETE | `/api/tasks/:id` | Delete a task                    | Owner / Admin            |

---

# 📂 Project Structure

```
task-manager-rbac/
├── backend/
│   ├── config/          # MongoDB connection
│   ├── controllers/     # Auth & Task logic
│   ├── middleware/      # JWT auth & role check
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Backend routes
│   └── server.js        # App entry point
│
└── frontend/
    ├── src/
    │   ├── components/  # UI components (TaskCard, Navbar)
    │   ├── context/     # Auth context
    │   ├── pages/       # Dashboard, Login, etc.
    │   ├── services/    # Axios instance
    │   └── App.jsx      # Routing + Guards
```

---

# 📝 License

This project is open-source and available for educational use.
