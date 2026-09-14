# TECHNICAL REQUIREMENTS DOCUMENT (TRD)

## PROJECT NAME
**PortfolioPro** – Full-Stack Personal Portfolio Website

---

## 1. TECHNICAL OVERVIEW
Build a production-quality full-stack personal portfolio website.

The system uses a modern frontend, backend, REST APIs, and a cloud database.

**Architecture Flow:**
```
React Frontend -> REST API -> Node.js + Express.js -> Mongoose ODM -> MongoDB Atlas
```

---

## 2. TECHNOLOGY STACK

### FRONTEND:
- **Framework**: React.js 18
- **Build Tool**: Vite
- **Language**: JavaScript ES6+
- **Styling**: Modern CSS3 (Variables, Flexbox/Grid, Glassmorphism)
- **API Client**: Native Fetch API / Axios

### BACKEND:
- **Runtime**: Node.js (v24+)
- **Framework**: Express.js

### DATABASE:
- **Database**: MongoDB Atlas
- **ODM**: Mongoose

### SECURITY:
- Helmet (Security Headers)
- CORS (Origin Restrictions)
- Express Rate Limit (Abuse Prevention)
- Input Validation & Sanitization (`express-validator`)

### DEVELOPMENT:
- Git / GitHub / npm

### DEPLOYMENT:
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

---

## 3. SYSTEM ARCHITECTURE
Client-Server Architecture.

### CLIENT (React Frontend):
- Display UI components and layout system
- Handle client-side routing & navigation
- Validate forms
- Consume REST APIs
- Display loading indicators & error boundaries
- Manage light/dark theme preference

### SERVER (Node.js + Express):
- Expose RESTful API endpoints
- Validate and sanitize incoming HTTP requests
- Process business logic
- Connect to database via Mongoose
- Save contact messages
- Return uniform API JSON responses
- Centralized error handling
- Apply security middleware

### DATABASE (MongoDB Atlas):
- Store project documents
- Store technical skills documents
- Store developer profile documents
- Store user contact message documents

---

## 4. FRONTEND TECHNICAL REQUIREMENTS
- React with Vite setup
- Functional Components with React Hooks (`useState`, `useEffect`, `useContext`, `useMemo`)
- Modular & Reusable component design
- Zero duplicate UI logic

---

## 5. FRONTEND FOLDER STRUCTURE
```
client/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── MobileMenu.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectModal.jsx
│   │   ├── Education.jsx
│   │   ├── Experience.jsx
│   │   ├── Certifications.jsx
│   │   ├── Contact.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── Loader.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── SectionHeader.jsx
│   │   └── Footer.jsx
│   ├── hooks/
│   │   └── useTheme.js
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   ├── variables.css
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 6. FRONTEND FUNCTIONAL REQUIREMENTS
- **Navigation**: Sticky navbar, smooth scrolling, active section observer, mobile hamburger menu.
- **Theme**: Light & Dark mode toggle with `localStorage` preference persistence.
- **Projects**: Asynchronous API fetching, loading skeleton/spinner, error states, search input, category filters, and detail modal view.
- **Contact**: Client validation, API submission, loading indicator, success feedback, and error handling.

---

## 7. API SERVICE REQUIREMENTS
- Centralized API client module: `client/src/services/api.js`
- Configurable environment variable: `VITE_API_URL` (e.g. `http://localhost:5000/api`)

---

## 8. BACKEND FOLDER STRUCTURE
```
server/
├── config/
│   └── db.js
├── controllers/
│   ├── profileController.js
│   ├── skillController.js
│   ├── projectController.js
│   └── contactController.js
├── middleware/
│   ├── errorHandler.js
│   ├── rateLimiter.js
│   └── validation.js
├── models/
│   ├── Contact.js
│   ├── Project.js
│   ├── Skill.js
│   └── Profile.js
├── routes/
│   ├── healthRoutes.js
│   ├── profileRoutes.js
│   ├── skillRoutes.js
│   ├── projectRoutes.js
│   └── contactRoutes.js
├── seed/
│   └── seedData.js
├── utils/
│   └── apiResponse.js
├── .env.example
├── package.json
└── server.js
```

---

## 9. BACKEND SERVER REQUIREMENTS
Express.js setup configured with:
- JSON & URL-encoded body parser
- CORS with client origin protection
- Helmet security headers
- Rate limiting middleware
- Modular routes & centralized error handlers

---

## 10. ENVIRONMENT VARIABLES

### BACKEND `.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### FRONTEND `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 11. DATABASE CONNECTION
- Reusable Mongoose database connection module (`server/config/db.js`).
- Reads `MONGODB_URI` from process environment.
- Handles connection success & graceful fallback for unconfigured environments.

---

## 12. DATABASE MODELS

### CONTACT MODEL (`models/Contact.js`)
- `name`: String, Required, Trim, max 100
- `email`: String, Required, Trim, Lowercase, Regex Email Validation
- `subject`: String, Required, Trim, max 200
- `message`: String, Required, Trim, min 10, max 3000
- `createdAt`: Date, Default `Date.now`

### PROJECT MODEL (`models/Project.js`)
- `title`: String, Required
- `description`: String, Required
- `image`: String
- `technologies`: [String], Required
- `category`: String (`Full-Stack`, `Frontend`, `Backend`, `Mobile`, `Other`)
- `githubUrl`: String
- `liveUrl`: String
- `features`: [String]
- `featured`: Boolean
- `createdAt`: Date

### SKILL MODEL (`models/Skill.js`)
- `name`: String, Required
- `category`: String (`Frontend`, `Backend`, `Database`, `Tools`, `Other`)
- `icon`: String
- `proficiency`: String

### PROFILE MODEL (`models/Profile.js`)
- `name`: String, Required
- `title`: String, Required
- `bio`: String, Required
- `email`: String, Required
- `socialLinks`: Object (`github`, `linkedin`, `twitter`, `portfolio`)
- `education`: Array of education objects
- `experience`: Array of experience objects
- `certifications`: Array of certification objects

---

## 13. REST API REQUIREMENTS

### HEALTH CHECK: `GET /api/health`
Response: `{ "success": true, "message": "Server is running smoothly", "data": { "uptime": ..., "database": ... } }`

### PROJECT API:
- `GET /api/projects`: Query params `category`, `search`, `tech`
- `GET /api/projects/:id`: Single project lookup

### SKILLS API: `GET /api/skills`

### PROFILE API: `GET /api/profile`

### CONTACT API: `POST /api/contact`
- Request Payload: `{ "name": "", "email": "", "subject": "", "message": "" }`
- Response: HTTP 201 Created on success, HTTP 400 on validation error, HTTP 429 on rate limit exceeded.

---

## 14. API RESPONSE STANDARD
Uniform JSON Structure:
```json
// Success
{ "success": true, "message": "Success message", "data": {} }

// Error
{ "success": false, "message": "User friendly error message", "errors": [] }
```

---

## 15. ERROR HANDLING
Centralized middleware handling standard status codes (400, 401, 404, 422, 429, 500). Internal stack traces and database secrets are never exposed in production.

---

## 16. SECURITY REQUIREMENTS
- **Helmet**: Secures HTTP headers.
- **CORS**: Restricts API calls to approved client origin (`CLIENT_URL`).
- **Rate Limiting**: Protects contact submissions (max 5 per 15 min) and API requests.
- **Input Validation**: Sanitizes HTML and validates data types using `express-validator`.

---

## 17. TESTING & VALIDATION SUMMARY
- **Frontend Build**: Verified via Vite (`npm run build`).
- **Backend API Test**: Verified health, profile, skills, projects, and contact endpoints via Node HTTP test suite.
- **Form Validation**: Tested both valid submissions (HTTP 201) and invalid inputs (HTTP 400).
