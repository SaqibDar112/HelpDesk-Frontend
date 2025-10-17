## Live demo link
https://help-desk-frontend-livid.vercel.app
## backend
https://helpdesk-backend-0f82.onrender.com
## I created different repos one for backend and another frontend for easy deployment and understanding
## We can create just one only then we can deploy by opting the root directory
## Backend Repo Link - https://github.com/SaqibDar112/HelpDesk-backend

# 🧰 HelpDesk Management System

A full-stack **Helpdesk Ticket Management System** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
It allows users to register, create and manage support tickets, assign agents, track progress, and automatically handle SLA breaches.

---

## 🚀 Features

### 👤 User Management
- Register and Login using JWT Authentication.  
- Roles: `user`, `agent`, `admin`.  
- Each role has different permissions.

### 🎫 Ticket Management
- Users can create support tickets with:
  - Title, Description, and Priority (`Low`, `Medium`, `High`)
- Tickets go through status stages:
  - `open` → `in-progress` → `resolved` → `closed`
- Agents or Admins can update ticket status.

### 💬 Comments & Timeline
- Add comments to any ticket.  
- Every action is logged in a timeline for audit trail.

### ⏰ SLA (Service Level Agreement) Tracking
- SLAs automatically track deadlines based on ticket priority.  
- If an SLA is breached, the system marks it and notifies relevant users.  
- A **cron job (`slaCron.js`)** runs in the backend to check for SLA breaches.

### 🧩 Idempotency Key Support
- All `POST` and `PATCH` requests include an `Idempotency-Key` header to prevent duplicate submissions.

---

---

## ⚙️ Tech Stack

### 🧠 Backend
- **Node.js** — Server environment  
- **Express.js** — RESTful API  
- **MongoDB + Mongoose** — Database  
- **jsonwebtoken (JWT)** — Authentication  
- **cron** — Scheduled SLA checks  
- **bcrypt.js** — Password hashing  

### 💻 Frontend
- **React.js (Vite)** — User Interface  
- **Axios** — API communication  
- **React Router DOM** — Routing  
- **Tailwind CSS** — Styling  

### ☁️ Others
- **MongoDB Atlas** — Cloud database  
- **Postman** — API testing  

---

## 🧩 API Overview

---

## 🧪 How to Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/helpdesk-system.git
cd helpdesk

cd backend
npm install

.env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret


cd frontend
npm install
npm run dev

Open the app at 👉 http://localhost:5173

✅ Demo Flow

Register a new user from the frontend.
a
Login to access your dashboard.

Create a new ticket with title, description, and priority.

View and update ticket status (In Progress, Resolve, Close).

Add comments and view timeline updates.

SLA checker (slaCron.js) runs automatically in the background.

🏆 Summary

This Helpdesk Management System demonstrates:

Full-stack development using MERN

Authentication & Authorization with roles

RESTful API design

Real-time ticket lifecycle management

Automated SLA breach detection
