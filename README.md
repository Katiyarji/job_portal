# 💼 Job Portal (MERN Stack)

This is a Job Portal web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).  
It helps job seekers find and apply for jobs, and recruiters post jobs and manage candidates easily.

---

## 🚀 Features

- User login/signup (JWT authentication)
- Job posting & job application system
- Candidate & recruiter profiles
- Resume upload
- Job search with filters
- Admin dashboard
- Real-time notifications (basic)

---

## 🧰 Tech Stack

- Frontend: React.js  
- Backend: Node.js, Express.js  
- Database: MongoDB  
- Auth: JWT, bcrypt  

---

## ⚙️ How to Run

### 1. Clone the repo
```bash
git clone https://github.com/your-username/job-portal.git
cd job-portal
```

2. Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

3. Setup environment variables (backend/.env)
```bash
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
```

4. Run project
```bash
# backend
cd backend
npm start

# frontend (new terminal)
cd frontend
npm start
```
