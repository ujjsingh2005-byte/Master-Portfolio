# TECHNICAL DESIGN DOCUMENT (TDD / TDR)

## PROJECT NAME
**PortfolioPro** – Production-Ready Full-Stack Personal Portfolio Website

---

## 1. PURPOSE
Design and implement a modern full-stack personal portfolio website with a scalable frontend, secure backend, REST API architecture, and MongoDB database.

The system provides a professional user experience and demonstrates real-world full-stack software development practices, prioritizing:
- Clean architecture
- Scalability
- Security
- Performance
- Accessibility
- Responsive design
- Maintainability

---

## 2. HIGH LEVEL SYSTEM DESIGN

```
USER -> REACT FRONTEND (Vercel) --[HTTPS / REST API]--> EXPRESS BACKEND (Render) --[Mongoose]--> MONGODB ATLAS
```

The frontend and backend remain independent decoupled applications communicating strictly via REST APIs over HTTPS.

---

## 3. APPLICATION ARCHITECTURE

A layered system architecture:

```
FRONTEND: Presentation Layer -> Component Layer -> Service Layer -> REST API Client
BACKEND:  Routes -> Controllers -> Middleware -> Mongoose Models -> MongoDB Atlas
```

---

## 4. FRONTEND DESIGN
- **Technology**: React 18, Vite, JavaScript ES6+, Modern CSS
- **Architecture**:
```
client/src/
├── components/
│   ├── layout/       (Navbar, Footer, MobileMenu)
│   ├── common/       (Loader, ErrorMessage, ThemeToggle, SectionHeader)
│   └── portfolio/    (Hero, About, Skills, Projects, Education, Experience, Certifications, Contact)
├── services/         (api.js)
├── hooks/            (useTheme.js)
├── styles/           (variables.css, global.css)
├── App.jsx
└── main.jsx
```

---

## 5. COMPONENT DESIGN
Components strictly observe the **Single Responsibility Principle (SRP)**:
- `ProjectCard`: Renders project information visually.
- `ProjectModal`: Displays expanded project features and link metadata.
- `ContactForm`: Captures and validates user form input.
- `API Service` (`services/api.js`): Encapsulates HTTP communication with backend REST endpoints.

UI components do not directly execute raw database operations or unabstracted HTTP calls.

---

## 6. STATE MANAGEMENT DESIGN
- **Component State (`useState`)**: Form controls, loading states, modal visibility, search inputs.
- **Side Effects (`useEffect`)**: Data fetching triggers, scroll event listeners.
- **Theme Management (`useTheme`)**: Custom hook reading and updating `localStorage` preference and document root attributes (`data-theme`).

---

## 7. API COMMUNICATION DESIGN
All HTTP client requests pass through a centralized API service module (`src/services/api.js`) utilizing environment-configurable base URLs (`VITE_API_URL`).

```
React Component -> api.js Service -> Express REST API
```

---

## 8. BACKEND DESIGN
- **Technology**: Node.js, Express.js, Mongoose ODM, MongoDB Atlas
- **Request/Response Flow**:
```
HTTP Request -> Express Router -> Middleware (Security/RateLimit/Validation) -> Controller -> Mongoose Model -> MongoDB Atlas -> Uniform JSON Response
```

---

## 9. BACKEND FOLDER DESIGN
```
server/
├── config/           (db.js)
├── controllers/      (projectController.js, skillController.js, profileController.js, contactController.js)
├── middleware/       (errorHandler.js, rateLimiter.js, validation.js)
├── models/           (Project.js, Skill.js, Profile.js, Contact.js)
├── routes/           (healthRoutes.js, projectRoutes.js, skillRoutes.js, profileRoutes.js, contactRoutes.js)
├── seed/             (seedData.js)
├── utils/            (apiResponse.js)
├── .env.example
├── package.json
└── server.js
```

---

## 10. ROUTE DESIGN
- `GET /api/health`: Health status & database connection report.
- `GET /api/profile`: Developer profile data.
- `GET /api/skills`: Categorized skill data.
- `GET /api/projects`: Project list with `search` and `category` query filters.
- `GET /api/projects/:id`: Single project detail.
- `POST /api/contact`: Form submission endpoint with validation and rate limiting.

---

## 11. REQUEST FLOW DESIGN
```
User -> Contact Form Submission -> Client Validation -> API Service -> POST /api/contact -> Rate Limiter -> Validation Middleware -> Contact Controller -> Contact Model -> MongoDB -> Success Response (201) -> Client UI Confirmation
```

---

## 12. DATABASE & SCHEMA DESIGN

### Collections in `portfolioDB`:
1. `projects`
2. `skills`
3. `profiles`
4. `contacts`

### Schemas:
- **Contact**: `name` (String, required, min 2), `email` (String, required, regex validated), `subject` (String, required), `message` (String, required, min 10), `createdAt` (Date).
- **Project**: `title` (String), `description` (String), `image` (String), `technologies` ([String]), `category` (String), `features` ([String]), `githubUrl` (String), `liveUrl` (String), `createdAt` (Date).
- **Skill**: `name` (String), `category` (String), `icon` (String), `proficiency` (String).
- **Profile**: `name` (String), `title` (String), `bio` (String), `email` (String), `socialLinks` (Object), `education` (Array), `experience` (Array), `certifications` (Array).

---

## 13. ERROR HANDLING & SECURITY DESIGN

### Error Handling:
Uniform JSON response format across all status codes:
```json
{ "success": false, "message": "User friendly error message" }
```
Internal server stack traces and credentials are never exposed to clients.

### Security Layers:
- **Helmet**: Enables HTTP security headers.
- **CORS**: Restricts request origins to configured client domain (`CLIENT_URL`).
- **Rate Limiting**: Protects `POST /api/contact` (max 5 requests / 15 mins per IP).
- **Input Sanitization**: `express-validator` escapes and sanitizes inputs to prevent XSS and injection attacks.

---

## 14. UI DESIGN SYSTEM & ACCESSIBILITY
- **Tokens**: CSS Custom Properties (`--bg-primary`, `--bg-secondary`, `--text-primary`, `--accent-primary`, `--border-color`).
- **Modes**: Light & Dark mode support with smooth CSS transitions.
- **Responsive Breakpoints**: Tested across 320px, 375px, 480px, 768px, 1024px, 1280px, 1440px.
- **Accessibility**: Semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), visible focus rings, keyboard tab navigation, and `prefers-reduced-motion` compliance.

---

## 15. VERIFICATION & TECHNICAL VALIDATION
- **Architecture**: Decoupled React frontend and Express REST backend.
- **Database**: Mongoose models verified with mock fallback for local environments and seed scripts for Atlas deployment.
- **Security**: Rate limiting, CORS, Helmet, and input validation verified.
- **Build Quality**: Verified zero build errors on Vite (`npm run build`).
