# PortfolioPro – Full-Stack Personal Portfolio Website

PortfolioPro is a modern, premium, highly responsive, full-stack personal portfolio application built with **React**, **Vite**, **Node.js**, **Express.js**, and **MongoDB Atlas**.

Designed specifically to demonstrate real-world full-stack software development skills, scalable REST API architecture, database integration, security middleware, theme persistence (Light/Dark mode), and production readiness.

---

## Features

- **Modern & Responsive UI**: Built with a mobile-first design system, subtle micro-interactions, custom CSS variables, and glassmorphism cards.
- **Dark / Light Theme Toggle**: Persistent theme preference saved via `localStorage` with accessibility focus indicators and `prefers-reduced-motion` compliance.
- **RESTful API Backend**: Scalable Express server with centralized error handling, uniform JSON responses, and input sanitization.
- **Database Integration**: MongoDB Atlas with Mongoose ODM models (`Profile`, `Skill`, `Project`, `Contact`). Includes seamless in-memory fallback for local development without an active database connection.
- **Project Showcase**: Full-stack project grid with live search, technology filters, category tabs, and modal details view.
- **Dynamic Skills & Profile**: Skills and developer background loaded dynamically from backend APIs rather than hardcoded client strings.
- **Functional Contact Form**: Validated contact form with `express-validator` sanitization, duplicate submission prevention, rate limiting, and database storage (`POST /api/contact`).
- **Security & Protection**: Configured with Helmet security headers, CORS policies, and rate limiters (`express-rate-limit`).

---

## Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Styling**: Modern CSS3 (Variables, Flexbox/Grid, Animations, Glassmorphism)

### Backend
- **Runtime**: Node.js (v24+)
- **Framework**: Express.js
- **Database**: MongoDB Atlas / Mongoose ODM
- **Security**: Helmet, CORS, Express Rate Limit, Express Validator
- **Dev Tools**: Nodemon, Dotenv

---

## Project Structure

```
portfolio-project/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components (Navbar, Hero, Skills, Projects, etc.)
│   │   ├── hooks/            # Custom React hooks (useTheme)
│   │   ├── services/         # API integration client (api.js)
│   │   ├── styles/           # Design system CSS (variables.css, global.css)
│   │   ├── App.jsx           # App wrapper
│   │   └── main.jsx          # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/               # Database connection (db.js)
│   ├── controllers/          # Request handlers (project, skill, profile, contact)
│   ├── middleware/           # Security, validation, rate limiting & error handlers
│   ├── models/               # Mongoose schemas (Profile, Skill, Project, Contact)
│   ├── routes/               # API endpoint definitions
│   ├── seed/                 # Database seeder script (seedData.js)
│   ├── utils/                # API response helper utilities
│   ├── package.json
│   └── server.js             # Express application entry
├── .env.example              # Environment variables template
├── .gitignore
├── PRD.md                    # Product Requirements Document
└── README.md                 # Project documentation
```

---

## Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) (v9+)
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas) (optional for cloud database)

### 1. Clone & Dependencies

Install backend dependencies:
```bash
cd server
npm install
```

Install frontend dependencies:
```bash
cd ../client
npm install
```

---

## Environment Variables Setup

Create a `.env` file inside the `server/` directory (refer to `.env.example`):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfoliopro
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### MongoDB Atlas Setup (Cloud Database)
1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Cluster and Database named `portfoliopro`.
3. Obtain your connection string under **Connect -> Drivers**.
4. Replace `MONGODB_URI` in `.env` with your connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfoliopro?retryWrites=true&w=majority
   ```

---

## Database Seeding

To populate your MongoDB database with default profile info, skill sets, and projects:

```bash
cd server
npm run seed
```

---

## Running the Application

### 1. Start the Backend Server
```bash
cd server
npm run dev
# Server will launch at http://localhost:5000
```

### 2. Start the Frontend Application
In a separate terminal window:
```bash
cd client
npm run dev
# Frontend will launch at http://localhost:5173
```

---

## API Documentation

### Health Check
- **`GET /api/health`**
  - Response: Server status, uptime, and database connection state.

### Profile API
- **`GET /api/profile`**
  - Response: Full developer profile including bio, education, experience, social links, and certifications.

### Skills API
- **`GET /api/skills`**
  - Response: Array of technical skills categorized by Frontend, Backend, Database, and Tools.

### Projects API
- **`GET /api/projects`**
  - Query Params: `category` (Full-Stack, Frontend, Backend), `search` (keyword), `tech` (technology name)
  - Response: Array of matching project objects.
- **`GET /api/projects/:id`**
  - Response: Detailed project object with key features.

### Contact API
- **`POST /api/contact`**
  - Payload: `{ "name": "John Doe", "email": "john@example.com", "subject": "Inquiry", "message": "Message text..." }`
  - Response: Confirmation of saved contact submission in MongoDB.

---

## Deployment Guide

### Frontend Deployment (Vercel)
1. Push project repository to GitHub.
2. Connect repository to [Vercel](https://vercel.com).
3. Set **Root Directory** to `client`.
4. Build Command: `npm run build` | Output Directory: `dist`.
5. Add Environment Variable: `VITE_API_BASE_URL` pointing to your deployed backend URL.

### Backend Deployment (Render)
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository and set **Root Directory** to `server`.
3. Build Command: `npm install` | Start Command: `npm start`.
4. Environment Variables: Add `PORT`, `MONGODB_URI`, `CLIENT_URL`, `NODE_ENV=production`.

---

## License

Distributed under the MIT License. See `LICENSE` for details.
