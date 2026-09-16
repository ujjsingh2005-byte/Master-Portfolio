const Project = require('../models/Project');
const { successResponse, errorResponse } = require('../utils/apiResponse');

let defaultProjects = [
  {
    _id: "p1",
    title: "CourseHub",
    description: "Engineered CourseHub, a scalable online course management system using Node.js, Express.js, MongoDB, and React.js, supporting 1,000+ concurrent users with improved application performance and reliability.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    technologies: ["JavaScript", "Express", "Node.js", "React.js", "MongoDB", "Tailwind CSS", "Cloudinary"],
    category: "Full-Stack",
    githubUrl: "https://github.com/ujjsingh2005-byte/CourseHub",
    liveUrl: "https://github.com/ujjsingh2005-byte/CourseHub",
    features: [
      "Engineered CourseHub supporting 1,000+ concurrent users with high reliability",
      "Optimized backend APIs & DB queries in Node.js & MongoDB, reducing response time by 30%",
      "Implemented JWT-based authentication with role-based access control for students, instructors, and admins",
      "Integrated secure payment gateway for paid courses, reducing administrative effort by 40%"
    ],
    featured: true,
    createdAt: new Date("2025-08-15").toISOString()
  },
  {
    _id: "p2",
    title: "Smart Parking System",
    description: "Developed a smart parking management system for efficient parking slot allocation, real-time slot availability monitoring, and administrative booking management.",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=800",
    technologies: ["React", "Node.js", "Express.js", "MongoDB"],
    category: "Full-Stack",
    githubUrl: "https://github.com/ujjsingh2005-byte/Smart-Parking-System",
    liveUrl: "https://github.com/ujjsingh2005-byte/Smart-Parking-System",
    features: [
      "Developed smart parking management system for efficient slot allocation",
      "Real-time parking slot availability tracking and instant booking",
      "Designed user-friendly UI for customers and system administrators",
      "Integrated backend services and MongoDB database management"
    ],
    featured: true,
    createdAt: new Date("2025-05-10").toISOString()
  },
  {
    _id: "p3",
    title: "Bharat Sign AI 3 | AI Sign Language Platform",
    description: "Built a multilingual communication platform connecting spoken languages with Indian Sign Language using text, voice, and gesture-based AI computer vision translation.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Python", "FastAPI", "MediaPipe", "OpenCV", "Supabase", "PostgreSQL"],
    category: "AI & Web",
    githubUrl: "https://github.com/ujjsingh2005-byte/Bharat-Sign-AI",
    liveUrl: "https://bharat-sign-ai.vercel.app",
    features: [
      "Multilingual platform connecting spoken languages with Indian Sign Language",
      "Text, voice, and gesture-based translation engine",
      "English-to-ISL translation architecture with regional Indian language support",
      "Two-way sign language recognition using MediaPipe & OpenCV AI vision models"
    ],
    featured: true,
    createdAt: new Date("2025-01-20").toISOString()
  },
  {
    _id: "p4",
    title: "UPI Shield | AI Fraud & Transaction Security",
    description: "Engineered UPI Shield, an AI-powered financial fraud detection and secure transaction protection system protecting digital UPI payment flows against fraudulent activities.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "Vercel"],
    category: "Full-Stack",
    githubUrl: "https://github.com/ujjsingh2005-byte/Upi-Shield-",
    liveUrl: "https://upi-shield-lime.vercel.app/",
    features: [
      "Real-time UPI transaction risk scoring and anomaly detection engine",
      "AI-assisted payment verification & anti-fraud security rules",
      "Seamless dashboard interface for monitoring suspicious digital payment activities",
      "Deployed on Vercel with high-availability serverless architecture"
    ],
    featured: true,
    createdAt: new Date("2025-10-10").toISOString()
  }
];

exports.getProjects = async (req, res, next) => {
  try {
    const { category, search, tech } = req.query;
    let projects = [];

    if (Project.db && Project.db.readyState === 1) {
      try {
        const query = {};
        if (category && category !== 'All') {
          query.category = category;
        }
        if (search) {
          query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ];
        }
        if (tech) {
          query.technologies = { $in: [new RegExp(tech, 'i')] };
        }
        projects = await Project.find(query).sort({ createdAt: -1 }).lean();

        // Always update project githubUrl and liveUrl to valid GitHub/Vercel links
        if (projects && projects.length > 0) {
          let updated = false;
          if (projects.length < defaultProjects.length || !projects.some(p => p.title.includes('UPI Shield'))) {
            updated = true;
          }
          projects = projects.map(p => {
            const matchingDefault = defaultProjects.find(d => d.title === p.title);
            if (matchingDefault && (!p.githubUrl || p.githubUrl === '#' || p.githubUrl === 'https://github.com/ujjsingh2005-byte' || p.githubUrl.includes('Bharat-Sign-AI-3') || p.liveUrl !== matchingDefault.liveUrl)) {
              updated = true;
              return { ...p, githubUrl: matchingDefault.githubUrl, liveUrl: matchingDefault.liveUrl };
            }
            return p;
          });
          if (updated) {
            await Project.deleteMany({});
            await Project.insertMany(defaultProjects.map(({ _id, ...dp }) => dp));
            projects = await Project.find(query).sort({ createdAt: -1 }).lean();
          }
        }

        // If MongoDB contains old sample projects (DevPulse, ShopSphere, TaskFlow, Nexus), clean them up!
        if (projects && projects.some(p => ['DevPulse - Developer Community Platform', 'ShopSphere - E-Commerce Dashboard & Store', 'TaskFlow - Agile Team Productivity System', 'Nexus API Guard - Rate Limiting & Auth Gateway'].includes(p.title))) {
          await Project.deleteMany({});
          await Project.insertMany(defaultProjects.map(({ _id, ...p }) => p));
          projects = await Project.find(query).sort({ createdAt: -1 }).lean();
        }
      } catch (err) {
        console.warn('MongoDB query error, falling back to memory store:', err.message);
      }
    }

    if (!projects || projects.length === 0) {
      projects = [...defaultProjects];
      if (category && category !== 'All') {
        projects = projects.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const s = search.toLowerCase();
        projects = projects.filter(p => 
          p.title.toLowerCase().includes(s) || p.description.toLowerCase().includes(s)
        );
      }
      if (tech) {
        const t = tech.toLowerCase();
        projects = projects.filter(p => 
          p.technologies.some(techItem => techItem.toLowerCase().includes(t))
        );
      }
    }

    return successResponse(res, 200, projects, 'Projects retrieved successfully');
  } catch (error) {
    return successResponse(res, 200, defaultProjects, 'Projects retrieved successfully (fallback)');
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let project = null;

    if (Project.db && Project.db.readyState === 1 && id.length === 24) {
      try {
        project = await Project.findById(id).lean();
      } catch (e) {}
    }

    if (!project) {
      project = defaultProjects.find(p => p._id === id) || defaultProjects[0];
    }

    if (!project) {
      return errorResponse(res, 404, 'Project not found');
    }

    return successResponse(res, 200, project, 'Project retrieved successfully');
  } catch (error) {
    const fallback = defaultProjects.find(p => p._id === req.params.id) || defaultProjects[0];
    return successResponse(res, 200, fallback, 'Project retrieved successfully');
  }
};

// Create / Upload new Project
exports.createProject = async (req, res, next) => {
  try {
    const { title, description, image, technologies, category, githubUrl, liveUrl, features } = req.body;

    if (!title || !title.trim()) {
      return errorResponse(res, 400, 'Project title is required');
    }

    if (!description || !description.trim()) {
      return errorResponse(res, 400, 'Project description is required');
    }

    const techArray = Array.isArray(technologies)
      ? technologies
      : (typeof technologies === 'string' ? technologies.split(',').map(t => t.trim()).filter(Boolean) : []);

    const featuresArray = Array.isArray(features)
      ? features
      : (typeof features === 'string' ? features.split('\n').map(f => f.trim()).filter(Boolean) : []);

    const defaultImage = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800';

    let newProject;

    if (Project.db && Project.db.readyState === 1) {
      try {
        newProject = await Project.create({
          title: title.trim(),
          description: description.trim(),
          image: image || defaultImage,
          technologies: techArray.length > 0 ? techArray : ['React', 'Node.js'],
          category: category || 'Full-Stack',
          githubUrl: githubUrl || '#',
          liveUrl: liveUrl || '#',
          features: featuresArray,
          featured: true
        });
      } catch (dbErr) {
        console.warn('MongoDB write error, adding to memory store:', dbErr.message);
        newProject = {
          _id: 'p_' + Date.now(),
          title: title.trim(),
          description: description.trim(),
          image: image || defaultImage,
          technologies: techArray.length > 0 ? techArray : ['React', 'Node.js'],
          category: category || 'Full-Stack',
          githubUrl: githubUrl || '#',
          liveUrl: liveUrl || '#',
          features: featuresArray,
          featured: true,
          createdAt: new Date().toISOString()
        };
        defaultProjects.unshift(newProject);
      }
    } else {
      newProject = {
        _id: 'p_' + Date.now(),
        title: title.trim(),
        description: description.trim(),
        image: image || defaultImage,
        technologies: techArray.length > 0 ? techArray : ['React', 'Node.js'],
        category: category || 'Full-Stack',
        githubUrl: githubUrl || '#',
        liveUrl: liveUrl || '#',
        features: featuresArray,
        featured: true,
        createdAt: new Date().toISOString()
      };
      defaultProjects.unshift(newProject);
    }

    return successResponse(res, 201, newProject, 'Project uploaded and created successfully!');
  } catch (error) {
    return errorResponse(res, 400, error.message || 'Failed to create project');
  }
};

// Delete Project
exports.deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (Project.db && Project.db.readyState === 1 && id.length === 24) {
      try {
        await Project.findByIdAndDelete(id);
      } catch (e) {}
    }
    
    defaultProjects = defaultProjects.filter(p => p._id !== id);

    return successResponse(res, 200, { id }, 'Project deleted successfully');
  } catch (error) {
    return errorResponse(res, 400, error.message || 'Failed to delete project');
  }
};
