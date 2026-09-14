const Skill = require('../models/Skill');
const { successResponse, errorResponse } = require('../utils/apiResponse');

let defaultSkills = [
  // Frontend
  { _id: 's1', name: 'HTML5', category: 'Frontend', icon: 'Code', proficiency: 'Expert' },
  { _id: 's2', name: 'CSS3 / Modern CSS', category: 'Frontend', icon: 'Palette', proficiency: 'Expert' },
  { _id: 's3', name: 'JavaScript (ES6+)', category: 'Frontend', icon: 'FileCode', proficiency: 'Expert' },
  { _id: 's4', name: 'React.js', category: 'Frontend', icon: 'Atom', proficiency: 'Expert' },
  { _id: 's5', name: 'Redux / Context API', category: 'Frontend', icon: 'Layers', proficiency: 'Advanced' },
  { _id: 's6', name: 'Tailwind CSS', category: 'Frontend', icon: 'Wind', proficiency: 'Expert' },

  // Backend
  { _id: 's7', name: 'Node.js', category: 'Backend', icon: 'Server', proficiency: 'Expert' },
  { _id: 's8', name: 'Express.js', category: 'Backend', icon: 'Zap', proficiency: 'Expert' },
  { _id: 's9', name: 'REST APIs', category: 'Backend', icon: 'Globe', proficiency: 'Expert' },
  { _id: 's10', name: 'JWT & Auth Security', category: 'Backend', icon: 'Lock', proficiency: 'Advanced' },

  // Database
  { _id: 's11', name: 'MongoDB Atlas', category: 'Database', icon: 'Database', proficiency: 'Expert' },
  { _id: 's12', name: 'Mongoose ODM', category: 'Database', icon: 'Cpu', proficiency: 'Expert' },
  { _id: 's13', name: 'MySQL / SQL', category: 'Database', icon: 'HardDrive', proficiency: 'Intermediate' },
  { _id: 's14', name: 'Redis', category: 'Database', icon: 'Box', proficiency: 'Intermediate' },

  // Tools
  { _id: 's15', name: 'Git & GitHub', category: 'Tools', icon: 'GitBranch', proficiency: 'Expert' },
  { _id: 's16', name: 'VS Code', category: 'Tools', icon: 'Terminal', proficiency: 'Expert' },
  { _id: 's17', name: 'Vite', category: 'Tools', icon: 'Zap', proficiency: 'Expert' },
  { _id: 's18', name: 'Postman', category: 'Tools', icon: 'Send', proficiency: 'Advanced' },
  { _id: 's19', name: 'Vercel & Render', category: 'Tools', icon: 'CloudUpload', proficiency: 'Advanced' }
];

exports.getSkills = async (req, res, next) => {
  try {
    let skills = [];
    if (Skill.db && Skill.db.readyState === 1) {
      try {
        skills = await Skill.find().lean();
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
