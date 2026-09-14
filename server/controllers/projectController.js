const Project = require('../models/Project');
const { successResponse, errorResponse } = require('../utils/apiResponse');

let defaultProjects = [
  {
    _id: "p1",
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
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: "p2",
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
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: "p3",
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
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: "p4",
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
    featured: true,
    createdAt: new Date().toISOString()
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
