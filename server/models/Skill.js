const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other'],
      default: 'Frontend'
    },
    icon: {
      type: String,
      default: ''
    },
    proficiency: {
      type: String,
      default: 'Advanced'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Skill', SkillSchema);
