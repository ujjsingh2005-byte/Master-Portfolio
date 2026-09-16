const Skill = require('../models/Skill');
const { successResponse, errorResponse } = require('../utils/apiResponse');

let defaultSkills = [
  // Languages
  { _id: 's1', name: 'C++', category: 'Frontend', icon: 'Code', proficiency: 'Expert' },
  { _id: 's2', name: 'Python', category: 'Backend', icon: 'Terminal', proficiency: 'Intermediate' },
  { _id: 's3', name: 'Java', category: 'Backend', icon: 'Code', proficiency: 'Advanced' },
  { _id: 's4', name: 'C', category: 'Backend', icon: 'Code', proficiency: 'Advanced' },
  { _id: 's5', name: 'HTML5 & CSS3', category: 'Frontend', icon: 'Palette', proficiency: 'Expert' },
  { _id: 's6', name: 'JavaScript (ES6+)', category: 'Frontend', icon: 'FileCode', proficiency: 'Expert' },

  // Frontend & Frameworks
  { _id: 's7', name: 'React.js', category: 'Frontend', icon: 'Atom', proficiency: 'Expert' },
  { _id: 's8', name: 'Next.js', category: 'Frontend', icon: 'Globe', proficiency: 'Advanced' },
  { _id: 's9', name: 'Tailwind CSS', category: 'Frontend', icon: 'Wind', proficiency: 'Expert' },

  // Backend & Databases
  { _id: 's10', name: 'Node.js', category: 'Backend', icon: 'Server', proficiency: 'Expert' },
  { _id: 's11', name: 'Express.js', category: 'Backend', icon: 'Zap', proficiency: 'Expert' },
  { _id: 's12', name: 'FastAPI', category: 'Backend', icon: 'Zap', proficiency: 'Advanced' },
  { _id: 's13', name: 'MongoDB', category: 'Database', icon: 'Database', proficiency: 'Expert' },
  { _id: 's14', name: 'SQL & PostgreSQL', category: 'Database', icon: 'HardDrive', proficiency: 'Advanced' },
  { _id: 's15', name: 'Supabase', category: 'Database', icon: 'Database', proficiency: 'Advanced' },

  // AI & Developer Tools
  { _id: 's16', name: 'MediaPipe & OpenCV', category: 'Tools', icon: 'Cpu', proficiency: 'Advanced' },
  { _id: 's17', name: 'Google Cloud Platform', category: 'Tools', icon: 'CloudUpload', proficiency: 'Advanced' },
  { _id: 's18', name: 'Git & GitHub', category: 'Tools', icon: 'GitBranch', proficiency: 'Expert' },
  { _id: 's19', name: 'VS Code', category: 'Tools', icon: 'Terminal', proficiency: 'Expert' },
  { _id: 's20', name: 'Linux', category: 'Tools', icon: 'Terminal', proficiency: 'Advanced' }
];

exports.getSkills = async (req, res, next) => {
  try {
    let skills = [];
    if (Skill.db && Skill.db.readyState === 1) {
      try {
        skills = await Skill.find().lean();
        // If MongoDB contains old sample skills (Redux, Mongoose ODM, Redis, Vite), replace with resume skills
        if (skills && skills.some(s => ['Redux / Context API', 'Mongoose ODM', 'Redis', 'Vite', 'Postman'].includes(s.name))) {
          await Skill.deleteMany({});
          await Skill.insertMany(defaultSkills.map(({ _id, ...s }) => s));
          skills = await Skill.find().lean();
        }
      } catch (err) {
        console.warn('MongoDB query error for skills, using default list:', err.message);
      }
    }

    if (!skills || skills.length === 0) {
      skills = [...defaultSkills];
    }

    return successResponse(res, 200, skills, 'Skills retrieved successfully');
  } catch (error) {
    return successResponse(res, 200, defaultSkills, 'Skills retrieved successfully (fallback)');
  }
};

// Add new Skill
exports.createSkill = async (req, res, next) => {
  try {
    const { name, category, proficiency, icon } = req.body;

    if (!name || !name.trim()) {
      return errorResponse(res, 400, 'Skill name is required');
    }

    let newSkill;

    if (Skill.db && Skill.db.readyState === 1) {
      try {
        newSkill = await Skill.create({
          name: name.trim(),
          category: category || 'Frontend',
          proficiency: proficiency || 'Advanced',
          icon: icon || 'Code'
        });
      } catch (dbErr) {
        newSkill = {
          _id: 's_' + Date.now(),
          name: name.trim(),
          category: category || 'Frontend',
          proficiency: proficiency || 'Advanced',
          icon: icon || 'Code',
          createdAt: new Date().toISOString()
        };
        defaultSkills.unshift(newSkill);
      }
    } else {
      newSkill = {
        _id: 's_' + Date.now(),
        name: name.trim(),
        category: category || 'Frontend',
        proficiency: proficiency || 'Advanced',
        icon: icon || 'Code',
        createdAt: new Date().toISOString()
      };
      defaultSkills.unshift(newSkill);
    }

    return successResponse(res, 201, newSkill, 'Skill added successfully!');
  } catch (error) {
    return errorResponse(res, 400, error.message || 'Failed to add skill');
  }
};

// Delete Skill
exports.deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (Skill.db && Skill.db.readyState === 1 && id.length === 24) {
      try {
        await Skill.findByIdAndDelete(id);
      } catch (e) {}
    }

    defaultSkills = defaultSkills.filter(s => s._id !== id);

    return successResponse(res, 200, { id }, 'Skill deleted successfully');
  } catch (error) {
    return errorResponse(res, 400, error.message || 'Failed to delete skill');
  }
};
