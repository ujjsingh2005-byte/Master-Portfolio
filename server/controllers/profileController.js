const Profile = require('../models/Profile');
const { successResponse, errorResponse } = require('../utils/apiResponse');

// Default profile dataset for Ujjwal Singh
let defaultProfile = {
  name: "Ujjwal Singh",
  title: "Full-Stack Software Engineer",
  educationDegree: "B.Tech Computer Science Engineering",
  tagline: "Building scalable web applications & seamless user experiences.",
  bio: "Full-Stack Developer and B.Tech CSE student passionate about building modern, scalable, high-performance web applications with beautiful user experiences.",
  journey: "Started coding during Computer Science Engineering studies and fell in love with creating end-to-end software solutions. Spent the last 3+ years engineering user-centric web applications and REST microservices.",
  careerGoals: "Aiming to lead high-impact engineering projects, contribute to open-source software, and push the boundaries of modern full-stack web technologies.",
  strengths: ["Full-Stack System Architecture", "RESTful API Design", "Responsive UI/UX Design", "Performance Optimization", "Clean Code & Refactoring"],
  technologiesOfInterest: ["TypeScript", "GraphQL", "Docker & Kubernetes", "Serverless Architecture", "Next.js"],
  email: "ujjwal.singh.dev@example.com",
  location: "India",
  profileImage: "", // Empty default allows professional placeholder image
  resumeUrl: "",    // Empty default
  resumeFileName: "",
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

// GET Profile
exports.getProfile = async (req, res, next) => {
  try {
    let profile = null;
    if (Profile.db && Profile.db.readyState === 1) {
      try {
        profile = await Profile.findOne().lean();
      } catch (err) {}
    }
    
    if (!profile) {
      profile = defaultProfile;
    }
    
    return successResponse(res, 200, profile, 'Profile retrieved successfully');
  } catch (error) {
    return successResponse(res, 200, defaultProfile, 'Profile retrieved successfully');
  }
};

// PUT Update Personal Info
exports.updateProfile = async (req, res, next) => {
  try {
    const updateData = req.body;
    updateData.updatedAt = new Date();

    let profile = null;
    if (Profile.db && Profile.db.readyState === 1) {
      profile = await Profile.findOneAndUpdate({}, updateData, { new: true, upsert: true }).lean();
    } else {
      defaultProfile = { ...defaultProfile, ...updateData };
      profile = defaultProfile;
    }

    return successResponse(res, 200, profile, 'Profile updated successfully!');
  } catch (error) {
    return errorResponse(res, 400, error.message || 'Failed to update profile');
  }
};

// POST Upload / Update Profile Photo
exports.updateProfilePhoto = async (req, res, next) => {
  try {
    const { photo } = req.body;
    if (!photo) {
      return errorResponse(res, 400, 'Photo file or URL is required');
    }

    let profile = null;
    if (Profile.db && Profile.db.readyState === 1) {
      profile = await Profile.findOneAndUpdate(
        {},
        { profileImage: photo, updatedAt: new Date() },
        { new: true, upsert: true }
      ).lean();
    } else {
      defaultProfile.profileImage = photo;
      profile = defaultProfile;
    }

    return successResponse(res, 200, { profileImage: photo }, 'Profile photo updated successfully!');
  } catch (error) {
    return errorResponse(res, 400, error.message || 'Failed to update profile photo');
  }
};

// DELETE Profile Photo
exports.deleteProfilePhoto = async (req, res, next) => {
  try {
    let profile = null;
    if (Profile.db && Profile.db.readyState === 1) {
      profile = await Profile.findOneAndUpdate(
        {},
        { profileImage: '', updatedAt: new Date() },
        { new: true }
      ).lean();
    } else {
      defaultProfile.profileImage = '';
      profile = defaultProfile;
    }

    return successResponse(res, 200, { profileImage: '' }, 'Profile photo deleted successfully');
  } catch (error) {
    return errorResponse(res, 400, error.message || 'Failed to delete profile photo');
  }
};

// POST Upload Resume (PDF)
exports.uploadResume = async (req, res, next) => {
  try {
    const resumeUrl = req.body.resumeUrl || req.body.resume;
    const fileName = req.body.fileName;
    if (!resumeUrl) {
      return errorResponse(res, 400, 'Resume file is required');
    }

    const updatedFileName = fileName || 'Ujjwal_Singh_Resume.pdf';

    let profile = null;
    if (Profile.db && Profile.db.readyState === 1) {
      profile = await Profile.findOneAndUpdate(
        {},
        { resumeUrl, resumeFileName: updatedFileName, updatedAt: new Date() },
        { new: true, upsert: true }
      ).lean();
    } else {
      defaultProfile.resumeUrl = resumeUrl;
      defaultProfile.resumeFileName = updatedFileName;
      profile = defaultProfile;
    }

    return successResponse(res, 200, { resumeUrl, resumeFileName: updatedFileName }, 'Resume uploaded successfully!');
  } catch (error) {
    return errorResponse(res, 400, error.message || 'Failed to upload resume');
  }
};

// GET Resume Details
exports.getResume = async (req, res, next) => {
  try {
    let profile = null;
    if (Profile.db && Profile.db.readyState === 1) {
      profile = await Profile.findOne().select('resumeUrl resumeFileName').lean();
    }

    if (!profile) {
      profile = {
        resumeUrl: defaultProfile.resumeUrl,
        resumeFileName: defaultProfile.resumeFileName
      };
    }

    return successResponse(res, 200, profile, 'Resume details retrieved');
  } catch (error) {
    return successResponse(res, 200, { resumeUrl: defaultProfile.resumeUrl, resumeFileName: defaultProfile.resumeFileName }, 'Resume details retrieved');
  }
};

// DELETE Resume
exports.deleteResume = async (req, res, next) => {
  try {
    let profile = null;
    if (Profile.db && Profile.db.readyState === 1) {
      profile = await Profile.findOneAndUpdate(
        {},
        { resumeUrl: '', resumeFileName: '', updatedAt: new Date() },
        { new: true }
      ).lean();
    } else {
      defaultProfile.resumeUrl = '';
      defaultProfile.resumeFileName = '';
      profile = defaultProfile;
    }

    return successResponse(res, 200, { resumeUrl: '', resumeFileName: '' }, 'Resume deleted successfully');
  } catch (error) {
    return errorResponse(res, 400, error.message || 'Failed to delete resume');
  }
};
