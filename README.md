# Task Manager App (React + TypeScript + Node + MongoDB)

A full-stack task management application where users can register, log in, and manage personal tasks securely.

Built with:

- React<br>
- TypeScript<br>
- Vite<br>
- Express<br>
- MongoDB<br>
- JWT Authentication<br>

---

# Tech Stack

## Frontend

- React<br>
- TypeScript<br>
- Vite<br>
- React Context API<br>
- Custom Hooks<br>

## Backend

- Node.js<br>
- Express<br>
- MongoDB<br>
- Mongoose<br>
- JWT Authentication<br>
- bcrypt password hashing<br>

---

# Features

### Authentication

- User registration<br>
- User login<br>
- JWT token authentication<br>
- Protected API routes<br>
- Protected frontend routes<br>

### Task Management

- Create tasks<br>
- View tasks<br>
- Toggle completion<br>
- Delete tasks<br>

### Security

- Password hashing with bcrypt<br>
- JWT authentication middleware<br>
- Token verification on protected routes<br>

---

# Project Structure

## Frontend

src<br>
├── assets<br>
├── components<br>
│ ├── layout<br>
│ └── tasks<br>
├── contexts<br>
│ └── AuthContext.tsx<br>
├── hooks<br>
│ └── useTasks.ts<br>
├── pages<br>
│ ├── LoginPage.tsx<br>
│ └── RegisterPage.tsx<br>
├── services<br>
│ └── taskService.ts<br>
├── styles<br>
└── types<br>
└── Task.ts<br>

## Backend

server/src<br>
├── controllers<br>
│ ├── authController.ts<br>
│ └── taskController.ts<br>
├── middleware<br>
│ └── auth.ts<br>
├── models<br>
│ ├── UserModel.ts<br>
│ └── TaskModel.ts<br>
├── routes<br>
│ ├── auth.ts<br>
│ └── tasks.ts<br>
├── services<br>
│ ├── authService.ts<br>
│ └── taskService.ts<br>
└── index.ts<br>

---

# Environment Variables

### `.env.development`

MONGO_URI=your_mongodb_connection_string<br>
JWT_SECRET=your_secret_key<br>
PORT=5050<br>
VITE_API_URL=http://localhost:5050<br>

### `.env.production`

MONGO_URI=your_mongodb_connection_string<br>
JWT_SECRET=your_secret_key<br>
PORT=5050<br>
VITE_API_URL=https://your-api-url<br>

---

# Running the Project

## Install Dependencies

Frontend

npm install

Backend

cd server
npm install

---

## Start Development Servers

Backend

cd server
npm run dev

Frontend

npm run dev

Frontend runs on:

http://localhost:5173

Backend runs on:

http://localhost:5050

---

# 🏗 Architecture Decisions

### Feature-Based Structure

Task-related components are grouped inside:

components/tasks/

This keeps feature logic colocated and scalable.

### State Management

Task state is abstracted into a custom hook:

useTasks

This separates business logic from UI composition.

### Services Layer (Backend)

Business logic is moved to **services** so controllers remain lightweight.

Route → Controller → Service → Database

Benefits:

- Cleaner route handlers<br>
- Reusable logic<br>
- Easier testing<br>
- Better separation of concerns<br>

### Single Source of Truth

All task mutations live inside:

useTasks

This prevents state inconsistencies between components.

### Derived State

Active task count is derived from `tasks` rather than stored separately to prevent state drift.

### Type Safety

A centralized `Task` type ensures consistency across components.

---

# Security Flow

Authentication flow:

User Login<br>
↓<br>
Backend validates credentials<br>
↓<br>
JWT token generated<br>
↓<br>
Token stored in localStorage<br>
↓<br>
Frontend sends Authorization header<br>
↓<br>
Backend middleware verifies token<br>

---

# Future Improvements

Potential enhancements:

- Task due dates<br>
- Task categories<br>
- Drag-and-drop task ordering<br>
- Refresh tokens<br>
- User profiles<br>
- Deployment with Docker<br>

---

# React + TypeScript + Vite (Template Info)

This project started with the official Vite React + TypeScript template.

It provides:

- Fast Refresh via Vite<br>
- ESLint integration<br>
- TypeScript support<br>
- Modern React tooling<br>

See the Vite docs for more:

https://vite.dev

---

# Author

Built as part of a full-stack development learning project.
