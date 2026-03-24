# FocusBoard – Full Stack Task Manager

A production-ready full-stack task management application with secure authentication and responsive task handling.

Users can register, log in, and manage personal tasks with a clean UI and protected API.

🔗 **Live App (Frontend):** https://usertaskboard.netlify.app
🔗 **Backend API (Render):** https://focusboard-xqok.onrender.com

---

## 🚀 Key Highlights

- Full-stack architecture (React + Node + MongoDB)
- JWT-based authentication with protected routes
- Deployed frontend (Netlify) and backend (Render)
- Secure password hashing and token verification
- Feature-based frontend architecture
- Service-layer backend architecture
- Environment-based configuration for development and production

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- React Context API
- Custom Hooks

## Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt password hashing

---

# Features

### Authentication

- User registration
- User login
- JWT token authentication
- Protected API routes
- Protected frontend routes

### Task Management

- Create tasks
- View tasks
- Toggle completion
- Delete tasks
- Task priority levels (low, medium, high) for better task organization

### Security

- Password hashing with bcrypt
- JWT authentication middleware
- Token verification on protected routes

---

# Screenshots

## Register

![Register](./screenshots/register.png)

## Login

![Login](./screenshots/login.png)

## Task Board

![Task Board](./screenshots/dashboard.png)

## Completed Tasks

![Completed Tasks](./screenshots/completed-tasks.png)

---

# Project Structure

## Frontend

```
src
├── assets
├── components
│   ├── layout
│   └── tasks
├── contexts
│   └── AuthContext.tsx
├── hooks
│   └── useTasks.ts
├── pages
│   ├── LoginPage.tsx
│   └── RegisterPage.tsx
├── services
│   └── taskService.ts
├── styles
└── types
    └── Task.ts
```

## Backend

```
server/src
├── controllers
│   ├── authController.ts
│   └── taskController.ts
├── middleware
│   └── auth.ts
├── models
│   ├── UserModel.ts
│   └── TaskModel.ts
├── routes
│   ├── auth.ts
│   └── tasks.ts
├── services
│   ├── authService.ts
│   └── taskService.ts
└── index.ts
```

---

# Environment Variables

### `.env.development`

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5050
VITE_API_URL=http://localhost:5050
```

### `.env.production`

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5050
VITE_API_URL=https://your-api-url
```

---

# Running the Project

## Install Dependencies

Frontend

```
npm install
```

Backend

```
cd server
npm install
```

---

## Start Development Servers

Backend

```
cd server
npm run dev
```

Frontend

```
npm run dev
```

Frontend runs on: `http://localhost:5173`

Backend runs on: `http://localhost:5050`

---

# API Overview

### Auth Routes

- `POST /auth/register` – Register a new user
- `POST /auth/login` – Login and receive JWT

### Task Routes (Protected)

- `GET /tasks` – Get user tasks
- `POST /tasks` – Create a task
- `PUT /tasks/:id` – Update a task
- `DELETE /tasks/:id` – Delete a task

---

# 🏗 Architecture Decisions

This application follows a full-stack separation of concerns:

```
Frontend (React) → API (Express) → Services → Database (MongoDB)
```

### Feature-Based Structure

Task-related components are grouped inside `components/tasks/` — this keeps feature logic colocated and scalable.

### State Management

Task state is abstracted into a custom hook (`useTasks`) which separates business logic from UI composition.

### Services Layer (Backend)

Business logic is moved to **services** so controllers remain lightweight.

```
Route → Controller → Service → Database
```

Benefits:

- Cleaner route handlers
- Reusable logic
- Easier testing
- Better separation of concerns

### Single Source of Truth

All task mutations live inside `useTasks` — this prevents state inconsistencies between components.

### Derived State

Active task count is derived from `tasks` rather than stored separately to prevent state drift.

### Type Safety

A centralized `Task` type ensures consistency across components.

---

# Security Flow

```
User Login
    ↓
Backend validates credentials
    ↓
JWT token generated
    ↓
Token stored in localStorage
    ↓
Frontend sends Authorization header
    ↓
Backend middleware verifies token
```

---

# Future Improvements

- Task due dates
- Task categories
- Drag-and-drop task ordering
- Refresh tokens
- User profiles
- Deployment with Docker

---

# React + TypeScript + Vite (Template Info)

This project started with the official Vite React + TypeScript template.

It provides:

- Fast Refresh via Vite
- ESLint integration
- TypeScript support
- Modern React tooling

See the Vite docs for more: https://vite.dev

---

# Author

Built as part of a full-stack development journey focused on modern React, TypeScript, and backend API design.

This project demonstrates real-world skills including authentication, API architecture, and full-stack deployment.
