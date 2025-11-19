# 📋 Task Manager with Role-Based Access Control (RBAC)

A full-stack **MERN** application demonstrating secure Authentication, Authorization, and Task Management with user and admin roles.

This project includes protected routes, secure JWT login, RBAC permissions, and a clean, responsive UI built with Tailwind CSS.

🔗 **GitHub Repository:**
[https://github.com/bhargavaalapati/mern_task_manager_RBA](https://github.com/bhargavaalapati/mern_task_manager_RBA)

---

## 🚀 Features

### 🔐 Authentication & Security

- Secure **User Registration & Login** using JWT.
- **Password hashing** with Bcrypt.
- **Protected routes** on both Frontend & Backend.

### 👤 Role-Based Access Control (RBAC)

- **User Role (Default):**

  - Can Create, Read, Update, Delete **only their own** tasks.

- **Admin Role:**

  - Can view **all** tasks in the system.
  - Can delete **any** task.
  - Restricted from creating tasks (monitoring-only role).

### 🛠️ Functionality & UX

- **Pagination** for improved performance.
- **Search & Filter** by task title and status.
- **Responsive UI** built using Tailwind CSS.
- **React Context API** for Authentication state.

---

## 💻 Tech Stack

| Area         | Technologies                                    |
| ------------ | ----------------------------------------------- |
| **Frontend** | React (Vite), Tailwind CSS, Axios, React Router |
| **Backend**  | Node.js, Express.js                             |
| **Database** | MongoDB, Mongoose                               |
| **Auth**     | JWT, BcryptJS                                   |

---

# 🛠️ Setup Instructions

Follow the steps below to run this project locally.

---

### ✔️ Prerequisites

- Node.js (v14+)
- MongoDB (Local or Atlas)

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/bhargavaalapati/mern_task_manager_RBA
cd mern_task_manager_RBA
```

---

## 2️⃣ Backend Configuration

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager_db
JWT_SECRET=your_super_secret_key_123
```

> Replace `MONGO_URI` with your Atlas connection string if needed.

Start the backend:

```bash
npm run dev
```

Backend URL: **[http://localhost:5000](http://localhost:5000)**

---

## 3️⃣ Frontend Configuration

Open a new terminal:

```bash
cd ../frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend URL: **[http://localhost:5173](http://localhost:5173)**

---

# 📡 API Endpoints

## 🔐 Authentication

| Method | Endpoint        | Description                 |
| ------ | --------------- | --------------------------- |
| POST   | `/api/register` | Register a new user         |
| POST   | `/api/login`    | Login and receive JWT token |

---

## 📝 Tasks

| Method | Endpoint         | Description                                   | Access                   |
| ------ | ---------------- | --------------------------------------------- | ------------------------ |
| GET    | `/api/tasks`     | Get tasks (with pagination `?page=1&limit=6`) | User (own) / Admin (all) |
| POST   | `/api/tasks`     | Create a new task                             | User only                |
| GET    | `/api/tasks/:id` | Get task details                              | Owner / Admin            |
| PUT    | `/api/tasks/:id` | Update task (title, desc, status)             | Owner only               |
| DELETE | `/api/tasks/:id` | Delete task                                   | Owner / Admin            |

---

# 🧪 Testing the Roles

### ✔️ Standard User

1. Register a user (e.g., `user1`)
2. Login and create tasks
3. User sees **only their own** tasks

### ✔️ Admin User

1. Register another user (e.g., `admin1`)
2. Open MongoDB Compass/Atlas
3. Go to **users** collection
4. Change role manually:

```json
"role": "admin"
```

5. Login again → You should see:
   ✔ Admin Mode banner
   ✔ All users’ tasks

---

# 📂 Project Structure

```
task-manager-rbac/
├── backend/
│   ├── config/         # MongoDB connection
│   ├── controllers/    # Auth & Task controllers
│   ├── middleware/     # JWT auth & Role checks
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routing
│   └── server.js       # Backend entry point
│
└── frontend/
    ├── src/
    │   ├── components/ # UI components
    │   ├── context/    # Auth context
    │   ├── pages/      # App pages
    │   ├── services/   # Axios setup
    │   └── App.jsx     # Routes & guards
```

---

## 📝 License

This project is open-source and free for educational use.
