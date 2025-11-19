# 📋 Task Manager with Role-Based Access Control (RBAC)

A full-stack **MERN** (MongoDB, Express, React, Node.js) application designed to demonstrate secure Authentication, Authorization, and CRUD operations.

This project features a complete task management system where users can manage their personal tasks, while Administrators have oversight of the entire system.

---

## 🚀 Features

### 🔐 Authentication & Security

- **User Registration & Login:** Secure access using **JWT (JSON Web Tokens)**.
- **Password Hashing:** Passwords are encrypted using **Bcrypt** before storage.
- **Protected Routes:** Frontend route guards prevent unauthorized access to the Dashboard.

### 👤 Role-Based Access Control (RBAC)

- **User Role:**
  - Create, Read, Update, and Delete (CRUD) _own_ tasks only.
  - Cannot access tasks created by others.
- **Admin Role:**
  - View **all** tasks in the system.
  - Delete **any** task.
  - Restricted from creating tasks (Monitoring role only).

### 🛠️ Functionality & UX

- **Pagination:** Server-side pagination to handle large datasets efficiently.
- **Search & Filter:** Real-time filtering by Task Status and Search terms.
- **Responsive UI:** Built with **Tailwind CSS** for a modern, mobile-friendly design.
- **State Management:** React Context API for managing Authentication state.

---

## 💻 Tech Stack

| Area         | Technology                                          |
| :----------- | :-------------------------------------------------- |
| **Frontend** | React (Vite), Tailwind CSS, Axios, React Router DOM |
| **Backend**  | Node.js, Express.js                                 |
| **Database** | MongoDB, Mongoose                                   |
| **Auth**     | JSON Web Token (JWT), BcryptJS                      |

---

## 🛠️ Setup Instructions

Follow these steps to get the project running locally.

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local installed or Atlas Cloud URL)

### 1. Clone the Repository

```bash
git clone <your-repo-url-here>
cd task-manager-rbac
```

````

### 2\. Backend Configuration

Navigate to the backend folder and install dependencies.

```bash
cd backend
npm install
```

**Create a `.env` file** in the `backend` root directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager_db
JWT_SECRET=your_super_secret_key_123
```

_(Note: Replace `MONGO_URI` with your Atlas connection string if using cloud DB)_

Start the Backend server:

```bash
npm run dev
```

_Server should run on http://localhost:5000_

### 3\. Frontend Configuration

Open a new terminal, navigate to the frontend folder, and install dependencies.

```bash
cd ../frontend
npm install
```

Start the React application:

```bash
npm run dev
```

_App should run on http://localhost:5173_

---

## 📡 API Endpoints

The backend exposes the following RESTful endpoints:

### Authentication

| Method | Endpoint        | Description                   |
| :----- | :-------------- | :---------------------------- |
| `POST` | `/api/register` | Register a new user           |
| `POST` | `/api/login`    | Login and receive a JWT token |

### Tasks

| Method   | Endpoint         | Description                                            | Access                   |
| :------- | :--------------- | :----------------------------------------------------- | :----------------------- |
| `GET`    | `/api/tasks`     | Get all tasks (Supports pagination: `?page=1&limit=6`) | User (Own) / Admin (All) |
| `POST`   | `/api/tasks`     | Create a new task                                      | User Only                |
| `GET`    | `/api/tasks/:id` | Get details of a specific task                         | Owner / Admin            |
| `PUT`    | `/api/tasks/:id` | Update a task (Title, Desc, Status)                    | Owner Only               |
| `DELETE` | `/api/tasks/:id` | Delete a task                                          | Owner / Admin            |

---

## 🧪 Testing the Roles

### 1\. Create a Standard User

1.  Go to the Register page.
2.  Sign up with username: `user1` / password: `123`.
3.  Create some tasks. You will see only your tasks.

### 2\. Create an Admin User

_By default, all new registrations are "users". To test the Admin role:_

1.  Register a new user (e.g., `admin1`).
2.  Open your Database (MongoDB Compass or Atlas).
3.  Find the `users` collection.
4.  Find `admin1` and manually change the `role` field from `"user"` to `"admin"`.
5.  Log out and Log back in as `admin1`.
6.  You should now see an **"Admin Mode"** banner and see tasks created by `user1`.

---

## 📂 Project Structure

```text
task-manager-rbac/
├── backend/
│   ├── config/         # DB Connection
│   ├── controllers/    # Logic for Auth and Tasks
│   ├── middleware/     # Auth & Admin checks
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Routes
│   └── server.js       # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI (TaskCard, Navbar)
    │   ├── context/    # Auth State Management
    │   ├── pages/      # Dashboard, Login, Forms
    │   ├── services/   # Axios Configuration
    │   └── App.jsx     # Routing & Route Guards
```

---

## 📝 License

This project is open-source and available for educational purposes.

```
````
