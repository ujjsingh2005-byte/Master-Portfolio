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
      company: "BharatCares & IBM SkillsBuild",
      role: "AI Automation & Intelligent Solutions Intern",
      duration: "June 2026 - July 2026",
      location: "Remote / AICTE",
      responsibilities: [
        "Completed 6-week intensive internship in AI Automation & Intelligent Solutions in association with AICTE and IBM SkillsBuild.",
        "Engineered automated AI workflows, intelligent system solutions, and data processing pipelines.",
        "Delivered AI projects under mentorship of IBM SkillsBuild and BharatCares leadership."
      ],
      technologies: ["AI Automation", "IBM SkillsBuild", "Machine Learning", "Python", "Intelligent Systems"]
    },
    {
      company: "Next Leap Analytics Pvt. Ltd.",
      role: "AI Content and Technology Intern",
      duration: "Nov 2025 - Dec 2025",
      location: "Mumbai, Maharashtra",
      responsibilities: [
        "Actively contributed to Generative-AI-based content creation and automated workflow optimization.",
        "Designed and implemented AI-driven question generation engines and structured data management pipelines.",
        "Awarded Official Internship Completion Letter with top performance rating from Head of Operations."
      ],
      technologies: ["Generative AI", "AI Question Generation", "Prompt Engineering", "Data Management", "Python"]
    },
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
      name: "AI Tools & Claude Workshop",
      organization: "be10x",
      date: "September 1, 2026",
      certificateUrl: "/certificates/be10x_ai_tools_certificate.jpg",
      icon: "Cpu"
    },
    {
      name: "IBM SkillsBuild AI Automation & Intelligent Solutions Internship",
      organization: "BharatCares & IBM SkillsBuild (AICTE)",
      date: "July 2026",
      certificateUrl: "/certificates/ibm_skillsbuild_certificate.jpg",
      icon: "ShieldCheck"
    },
    {
      name: "HackIndia 2026 - Web3 & AI Hackathon",
      organization: "HackIndia & C# Corner",
      date: "2026",
      certificateUrl: "/certificates/hackindia_2026_certificate.jpg",
      icon: "Code"
    },
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
        if (profile) {
          // Auto-update certificate URLs if they were '#'
          let updated = false;
          if (profile.certifications) {
            profile.certifications = profile.certifications.map(c => {
              const matchingDefault = defaultProfile.certifications.find(d => d.name === c.name);
              if (matchingDefault && (!c.certificateUrl || c.certificateUrl === '#')) {
                updated = true;
                return { ...c, certificateUrl: matchingDefault.certificateUrl };
              }
              return c;
            });
          }
          const existingCertNames = new Set((profile.certifications || []).map(c => c.name));
          const certsToAdd = defaultProfile.certifications.filter(c => !existingCertNames.has(c.name));
          if (certsToAdd.length > 0) {
            updated = true;
            profile.certifications = [...(profile.certifications || []), ...certsToAdd];
          }

          // Auto-sync missing work experiences
          const existingExpRoles = new Set((profile.experience || []).map(e => e.role + e.company));
          const expsToAdd = defaultProfile.experience.filter(e => !existingExpRoles.has(e.role + e.company));
          if (expsToAdd.length > 0) {
            updated = true;
            profile.experience = [...expsToAdd, ...(profile.experience || [])];
          }

          if (updated) {
            await Profile.updateOne({}, { $set: { certifications: profile.certifications, experience: profile.experience } });
            profile = await Profile.findOne().lean();
          }
        }
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

// POST Add Certification
exports.addCertification = async (req, res, next) => {
  try {
    const { name, organization, date, certificateUrl, icon } = req.body;
    if (!name || !organization || !date) {
      return errorResponse(res, 400, 'Name, Organization, and Date are required');
    }

    const newCert = {
      name: name.trim(),
      organization: organization.trim(),
      date: date.trim(),
      certificateUrl: certificateUrl ? certificateUrl.trim() : '#',
      icon: icon || 'Award'
    };

    let profile = null;
    if (Profile.db && Profile.db.readyState === 1) {
      profile = await Profile.findOne();
      if (!profile) {
        profile = new Profile(defaultProfile);
      }
      profile.certifications.push(newCert);
      profile.updatedAt = new Date();
      await profile.save();
    } else {
      newCert._id = 'cert_' + Date.now();
      defaultProfile.certifications.push(newCert);
      profile = defaultProfile;
    }

    return successResponse(res, 201, profile.certifications, 'Certification added successfully!');
  } catch (error) {
    return errorResponse(res, 400, error.message || 'Failed to add certification');
  }
};

// DELETE Certification
exports.deleteCertification = async (req, res, next) => {
  try {
    const { id } = req.params;

    let profile = null;
    if (Profile.db && Profile.db.readyState === 1) {
      profile = await Profile.findOne();
      if (profile && profile.certifications) {
        profile.certifications = profile.certifications.filter(
          (cert) => cert._id.toString() !== id && cert.name !== id
        );
        profile.updatedAt = new Date();
        await profile.save();
      }
    } else {
      defaultProfile.certifications = defaultProfile.certifications.filter(
        (cert) => cert._id !== id && cert.name !== id
      );
      profile = defaultProfile;
    }

    return successResponse(res, 200, profile ? profile.certifications : [], 'Certification deleted successfully');
  } catch (error) {
    return errorResponse(res, 400, error.message || 'Failed to delete certification');
  }
};

// POST Add Education
exports.addEducation = async (req, res, next) => {
  try {
    const { institution, degree, fieldOfStudy, duration, achievements } = req.body;
    if (!institution || !degree || !fieldOfStudy || !duration) {
      return errorResponse(res, 400, 'Institution, Degree, Field of Study, and Duration are required');
    }

    const newEdu = {
      institution: institution.trim(),
      degree: degree.trim(),
      fieldOfStudy: fieldOfStudy.trim(),
      duration: duration.trim(),
      achievements: Array.isArray(achievements) ? achievements : (achievements ? achievements.split('\n').map(a => a.trim()).filter(Boolean) : [])
    };

    let profile = null;
    if (Profile.db && Profile.db.readyState === 1) {
      profile = await Profile.findOne();
      if (!profile) {
        profile = new Profile(defaultProfile);
      }
      profile.education.push(newEdu);
      profile.updatedAt = new Date();
      await profile.save();
    } else {
      newEdu._id = 'edu_' + Date.now();
      defaultProfile.education.push(newEdu);
      profile = defaultProfile;
    }

    return successResponse(res, 201, profile.education, 'Education added successfully!');
  } catch (error) {
    return errorResponse(res, 400, error.message || 'Failed to add education');
  }
};

// DELETE Education
exports.deleteEducation = async (req, res, next) => {
  try {
    const { id } = req.params;

    let profile = null;
    if (Profile.db && Profile.db.readyState === 1) {
      profile = await Profile.findOne();
      if (profile && profile.education) {
        profile.education = profile.education.filter(
          (edu, idx) => (edu._id ? edu._id.toString() !== id : true) && edu.degree !== id && idx.toString() !== id
        );
        profile.updatedAt = new Date();
        await profile.save();
      }
    } else {
      defaultProfile.education = defaultProfile.education.filter(
        (edu, idx) => (edu._id ? edu._id !== id : true) && edu.degree !== id && idx.toString() !== id
      );
      profile = defaultProfile;
    }

    return successResponse(res, 200, profile ? profile.education : [], 'Education deleted successfully');
  } catch (error) {
    return errorResponse(res, 400, error.message || 'Failed to delete education');
  }
};

// POST Add Experience
exports.addExperience = async (req, res, next) => {
  try {
    const { company, role, duration, location, responsibilities, technologies } = req.body;
    if (!company || !role || !duration) {
      return errorResponse(res, 400, 'Company, Role, and Duration are required');
    }

    const newExp = {
      company: company.trim(),
      role: role.trim(),
      duration: duration.trim(),
      location: location ? location.trim() : 'Remote',
      responsibilities: Array.isArray(responsibilities) ? responsibilities : (responsibilities ? responsibilities.split('\n').map(r => r.trim()).filter(Boolean) : []),
      technologies: Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',').map(t => t.trim()).filter(Boolean) : [])
    };

    let profile = null;
    if (Profile.db && Profile.db.readyState === 1) {
      profile = await Profile.findOne();
      if (!profile) {
        profile = new Profile(defaultProfile);
      }
      profile.experience.push(newExp);
      profile.updatedAt = new Date();
      await profile.save();
    } else {
      newExp._id = 'exp_' + Date.now();
      defaultProfile.experience.push(newExp);
      profile = defaultProfile;
    }

    return successResponse(res, 201, profile.experience, 'Work experience added successfully!');
  } catch (error) {
    return errorResponse(res, 400, error.message || 'Failed to add work experience');
  }
};

// DELETE Experience
exports.deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;

    let profile = null;
    if (Profile.db && Profile.db.readyState === 1) {
      profile = await Profile.findOne();
      if (profile && profile.experience) {
        profile.experience = profile.experience.filter(
          (exp, idx) => (exp._id ? exp._id.toString() !== id : true) && exp.company !== id && idx.toString() !== id
        );
        profile.updatedAt = new Date();
        await profile.save();
      }
    } else {
      defaultProfile.experience = defaultProfile.experience.filter(
        (exp, idx) => (exp._id ? exp._id !== id : true) && exp.company !== id && idx.toString() !== id
      );
      profile = defaultProfile;
    }

    return successResponse(res, 200, profile ? profile.experience : [], 'Work experience deleted successfully');
  } catch (error) {
    return errorResponse(res, 400, error.message || 'Failed to delete work experience');
  }
};
