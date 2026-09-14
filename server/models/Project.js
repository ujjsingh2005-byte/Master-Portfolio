const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true
    },
    image: {
      type: String,
      default: ''
    },
    technologies: {
      type: [String],
      required: [true, 'Technologies are required']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Full-Stack', 'Frontend', 'Backend', 'Mobile', 'Other'],
      default: 'Full-Stack'
    },
    githubUrl: {
      type: String,
      default: '#'
    },
    liveUrl: {
      type: String,
      default: '#'
    },
    features: {
      type: [String],
      default: []
    },
    featured: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Project', ProjectSchema);
