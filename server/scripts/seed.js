require('dotenv').config();
const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Project = require('../models/Project');

const sampleProfile = {
  name: "Ujjwal Singh",
  title: "Full-Stack Software Engineer",
  educationDegree: "B.Tech Computer Science Engineering",
  tagline: "Building scalable web applications & seamless user experiences.",
  bio: "Full-Stack Developer and B.Tech CSE student passionate about building modern, scalable, high-performance web applications with beautiful user experiences.",
  journey: "Started coding during Computer Science Engineering studies and fell in love with creating end-to-end software solutions. Experienced in React, Node.js, Express, and MongoDB.",
  careerGoals: "Aiming to lead high-impact engineering projects, contribute to open-source software, and push the boundaries of modern full-stack web technologies.",
  strengths: ["Full-Stack System Architecture", "RESTful API Design", "Responsive UI/UX Design", "Performance Optimization", "Clean Code & Refactoring"],
  technologiesOfInterest: ["TypeScript", "GraphQL", "Docker & Kubernetes", "Serverless Architecture", "Next.js"],
  email: "ujjwal.singh.dev@example.com",
  location: "India",
  resumeUrl: "",
  resumeFileName: "",
  profileImage: "",
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    portfolio: "https://portfoliopro.dev"
  },
  education: [
    {
      institution: "State University of Technology",
      degree: "B.Tech",
      fieldOfStudy: "Computer Science Engineering (CSE)",
      duration: "2022 - 2026",
      achievements: [
        "Specialized in Full-Stack Web Development & Data Structures",
        "Lead Developer for Annual University Tech Symposium Website",
        "Ranked Top 5% in Algorithm Design & Web System Architecture"
      ]
    }
  ],
  experience: [
    {
      company: "Apex Tech Innovations",
      role: "Full-Stack Software Engineer",
      duration: "2024 - Present",
      location: "Remote / On-site",
      responsibilities: [
        "Engineered responsive React micro-frontends serving over 50,000 active monthly users.",
        "Designed and implemented RESTful microservices using Node.js, Express, and MongoDB Atlas.",
        "Improved API throughput by 35% using Redis caching and query indexing."
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Git"]
    }
  ],
  certifications: [
    {
      name: "AWS Certified Developer – Associate",
      organization: "Amazon Web Services",
      date: "2024",
      certificateUrl: "#",
      icon: "Award"
    },
    {
      name: "MongoDB Certified Developer Associate",
      organization: "MongoDB Inc.",
      date: "2024",
      certificateUrl: "#",
      icon: "Database"
    }
  ]
};

const sampleSkills = [
  { name: 'HTML5', category: 'Frontend', icon: 'Code', proficiency: 'Expert' },
  { name: 'CSS3 / Modern CSS', category: 'Frontend', icon: 'Palette', proficiency: 'Expert' },
  { name: 'JavaScript (ES6+)', category: 'Frontend', icon: 'FileCode', proficiency: 'Expert' },
  { name: 'React.js', category: 'Frontend', icon: 'Atom', proficiency: 'Expert' },
  { name: 'Redux / Context API', category: 'Frontend', icon: 'Layers', proficiency: 'Advanced' },
  { name: 'Tailwind CSS', category: 'Frontend', icon: 'Wind', proficiency: 'Expert' },
  { name: 'Node.js', category: 'Backend', icon: 'Server', proficiency: 'Expert' },
  { name: 'Express.js', category: 'Backend', icon: 'Zap', proficiency: 'Expert' },
  { name: 'REST APIs', category: 'Backend', icon: 'Globe', proficiency: 'Expert' },
  { name: 'JWT & Auth Security', category: 'Backend', icon: 'Lock', proficiency: 'Advanced' },
  { name: 'MongoDB Atlas', category: 'Database', icon: 'Database', proficiency: 'Expert' },
  { name: 'Mongoose ODM', category: 'Database', icon: 'Cpu', proficiency: 'Expert' },
  { name: 'MySQL / SQL', category: 'Database', icon: 'HardDrive', proficiency: 'Intermediate' },
  { name: 'Git & GitHub', category: 'Tools', icon: 'GitBranch', proficiency: 'Expert' },
  { name: 'VS Code', category: 'Tools', icon: 'Terminal', proficiency: 'Expert' },
  { name: 'Vite', category: 'Tools', icon: 'Zap', proficiency: 'Expert' },
  { name: 'Postman', category: 'Tools', icon: 'Send', proficiency: 'Advanced' }
];

const sampleProjects = [
  {
    title: "DevPulse - Developer Community Platform",
    description: "A full-stack developer platform for real-time collaboration, technical article sharing, and interactive coding discussions.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    category: "Full-Stack",
    githubUrl: "https://github.com/example/devpulse",
    liveUrl: "https://devpulse-demo.example.com",
    features: [
      "User authentication & JWT security",
      "Real-time post creation & markdown editor",
      "Interactive code snippets with syntax highlighting",
      "Tag-based project search and indexing"
    ],
    featured: true
  },
  {
    title: "ShopSphere - E-Commerce Dashboard & Store",
    description: "High-performance online shopping engine with inventory management, cart state synchronization, and secure checkout processing.",
    image: "https://images.unsplash.com/photo-1556742049-0a67daf4005a?auto=format&fit=crop&q=80&w=800",
    technologies: ["React", "Express", "MongoDB", "Redux", "Stripe API"],
    category: "Full-Stack",
    githubUrl: "https://github.com/example/shopsphere",
    liveUrl: "https://shopsphere-demo.example.com",
    features: [
      "Dynamic product catalog with multi-facet filters",
      "Persistent basket state & discount logic",
      "Admin analytics panel for sales and inventory tracking",
      "Fully responsive checkout workflow"
    ],
    featured: true
  },
  {
    title: "TaskFlow - Agile Team Productivity System",
    description: "Kanban-style project management board with drag-and-drop task organization, activity logs, and deadline notifications.",
    image: "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&q=80&w=800",
    technologies: ["React", "Node.js", "MongoDB", "Express", "CSS Modules"],
    category: "Frontend",
    githubUrl: "https://github.com/example/taskflow",
    liveUrl: "https://taskflow-demo.example.com",
    features: [
      "Drag-and-drop Kanban workflow columns",
      "Team member assignment and priority tagging",
      "Custom task filter & status history",
      "Dark mode visual layout support"
    ],
    featured: true
  },
  {
    title: "Nexus API Guard - Rate Limiting & Auth Gateway",
    description: "Lightweight Express middleware microservice for enterprise API security, rate limiting, request validation, and centralized logs.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    technologies: ["Node.js", "Express", "MongoDB", "Redis", "Helmet"],
    category: "Backend",
    githubUrl: "https://github.com/example/nexus-api-guard",
    liveUrl: "https://nexus-gateway-demo.example.com",
    features: [
      "Token bucket rate limiting per IP / API Key",
      "Role-based authorization middleware",
      "Structured JSON audit logger",
      "Sub-millisecond route validation throughput"
    ],
    featured: true
  }
];

const seedData = async () => {
  try {
    const connString = process.env.MONGODB_URI;
    if (!connString) {
      console.log('⚠️ MONGODB_URI missing in .env file. Unable to seed MongoDB.');
      process.exit(0);
    }

    await mongoose.connect(connString);
    console.log('Connected to MongoDB for seeding...');

    await Profile.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});

    await Profile.create(sampleProfile);
    await Skill.insertMany(sampleSkills);
    await Project.insertMany(sampleProjects);

    console.log('✅ Database seeded successfully with Ujjwal Singh profile!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}
