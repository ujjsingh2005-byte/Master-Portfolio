const Skill = require('../models/Skill');
const { successResponse, errorResponse } = require('../utils/apiResponse');

let defaultSkills = [
  // Programming Languages
  { _id: 's1', name: 'C++', category: 'Programming', icon: 'Code', proficiency: 'Core' },
  { _id: 's2', name: 'Python (Basic)', category: 'Programming', icon: 'Terminal', proficiency: 'Familiar' },
  { _id: 's3', name: 'Java', category: 'Programming', icon: 'Code', proficiency: 'Experienced' },
  { _id: 's4', name: 'C', category: 'Programming', icon: 'Code', proficiency: 'Experienced' },
  { _id: 's5', name: 'JavaScript (ES6+)', category: 'Programming', icon: 'FileCode', proficiency: 'Core' },

  // Frontend & UI Architecture
  { _id: 's6', name: 'React.js', category: 'Frontend', icon: 'Atom', proficiency: 'Core' },
  { _id: 's7', name: 'Next.js', category: 'Frontend', icon: 'Globe', proficiency: 'Experienced' },
  { _id: 's8', name: 'Tailwind CSS', category: 'Frontend', icon: 'Wind', proficiency: 'Core' },
  { _id: 's9', name: 'HTML/CSS', category: 'Frontend', icon: 'Palette', proficiency: 'Core' },

  // Backend & Microservices
  { _id: 's10', name: 'Node.js', category: 'Backend', icon: 'Server', proficiency: 'Core' },
  { _id: 's11', name: 'Express.js', category: 'Backend', icon: 'Zap', proficiency: 'Core' },
  { _id: 's12', name: 'FastAPI', category: 'Backend', icon: 'Zap', proficiency: 'Experienced' },

  // Databases & Storage
  { _id: 's13', name: 'MongoDB', category: 'Database', icon: 'Database', proficiency: 'Core' },
  { _id: 's14', name: 'SQL & PostgreSQL', category: 'Database', icon: 'HardDrive', proficiency: 'Experienced' },
  { _id: 's15', name: 'Supabase', category: 'Database', icon: 'Database', proficiency: 'Experienced' },

  // AI & Vision Systems
  { _id: 's16', name: 'MediaPipe & OpenCV', category: 'AI & ML', icon: 'Cpu', proficiency: 'Experienced' },

  // Tools & Infrastructure
  { _id: 's17', name: 'Git & GitHub', category: 'Tools & Cloud', icon: 'GitBranch', proficiency: 'Core' },
  { _id: 's18', name: 'Google Cloud Platform', category: 'Tools & Cloud', icon: 'CloudUpload', proficiency: 'Experienced' },
  { _id: 's19', name: 'VS Code', category: 'Tools & Cloud', icon: 'Terminal', proficiency: 'Core' },
  { _id: 's20', name: 'Linux', category: 'Tools & Cloud', icon: 'Terminal', proficiency: 'Experienced' }
];

exports.getSkills = async (req, res, next) => {
  try {
    let skills = [];
    if (Skill.db && Skill.db.readyState === 1) {
      try {
        const dbSkills = await Skill.find({}).lean();
        if (!dbSkills || dbSkills.length !== defaultSkills.length || dbSkills.some(s => s.category === 'Tools')) {
          await Skill.deleteMany({});
          await Skill.insertMany(defaultSkills.map(({ _id, ...s }) => s));
          skills = await Skill.find().lean();
        } else {
          skills = dbSkills;
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
