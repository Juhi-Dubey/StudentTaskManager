# Student Task Manager

A full-stack MERN application that helps students efficiently manage their daily tasks, deadlines, and productivity. The application provides secure user authentication, task tracking, filtering, sorting, dashboard analytics, dark mode support, and CSV export functionality.

## 🚀 Live Demo

Frontend: (https:/student-task-manager-sage-seven.vercel.app/dashboard)

Backend API: (https://student-task-manager-backend-foa1.onrender.com/)

---

## 📌 Features

### 🔐 Authentication & Security

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Password Hashing using bcrypt
* Strong Password Validation
* Email Validation
* Show/Hide Password Feature

### 📝 Task Management

* Create Tasks
* Update Tasks
* Delete Tasks
* Mark Tasks as Completed
* Undo Completed Tasks
* User-Specific Task Storage

### 🔍 Search, Filter & Sort

* Search Tasks by Title
* Search Tasks by Description
* Filter Tasks:
  * All
  * Pending
  * Completed

* Sort Tasks:
  * By Priority
  * By Due Date

* Priority-Based Ordering
  * High + Due Soon
  * High + Due Later
  * Medium
  * Low

### 📊 Dashboard Analytics

* Total Tasks Counter
* Pending Tasks Counter
* Completed Tasks Counter
* Overdue Tasks Counter
* Task Completion Progress Bar

### 🎨 User Experience

* Light Mode
* Dark Mode
* Toast Notifications
* Delete Confirmation Modal
* Mobile Responsive Design
* Smooth Edit Task Navigation

### 📁 Export Functionality

* Export Tasks as CSV File

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Hooks
* React Router DOM
* Axios
* CSS3

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcryptjs

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## 📂 Project Structure

```text
StudentTaskManager
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── utils
│   │   ├── App.jsx
│   |   ├── main.jsx
│   |   └── index.css
│   │
│   └── public
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Juhi-Dubey/StudentTaskManager.git
cd StudentTaskManager
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

```

Run backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📸 Screenshots

### Login Page

![Login Page](screenshots/Login.png)

### Dashboard

![Dashboard](screenshots/Dashboard.png)

### Light Mode

![Light Mode](screenshots/LightMode.png)

### Mobile View

![Mobile View 1](screenshots/PhoneView1.png)

![Mobile View 2](screenshots/PhoneView2.png)

---

## 🔮 Future Improvements

* Drag & Drop Task Ordering
* Task Categories
* Task Labels
* Email Reminders
* Recurring Tasks
* Calendar Integration

---

## 👩‍💻 Author

**Juhi Dubey**

BCA Student | MERN Stack Developer

GitHub: https://github.com/Juhi-Dubey/

LinkedIn: https://www.linkedin.com/in/juhi-dubey
