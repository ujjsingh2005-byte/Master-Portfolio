const mongoose = require('mongoose');

const SocialLinksSchema = new mongoose.Schema({
  github: { type: String, default: 'https://github.com' },
  linkedin: { type: String, default: 'https://linkedin.com' },
  twitter: { type: String, default: 'https://twitter.com' },
  portfolio: { type: String, default: '#' }
}, { _id: false });

const EducationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  duration: { type: String, required: true },
  achievements: { type: [String], default: [] }
});

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  location: { type: String, default: 'Remote' },
  responsibilities: { type: [String], default: [] },
  technologies: { type: [String], default: [] },
  certificateUrl: { type: String, default: '' }
});

const CertificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organization: { type: String, required: true },
  date: { type: String, required: true },
  certificateUrl: { type: String, default: '#' },
  icon: { type: String, default: 'Award' }
});

const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, default: 'Ujjwal Singh' },
    title: { type: String, required: true, trim: true, default: 'Full-Stack Software Engineer' },
    educationDegree: { type: String, default: 'B.Tech Computer Science Engineering' },
    tagline: { type: String, default: 'Building scalable web applications & seamless user experiences.' },
    bio: { type: String, default: 'Full-Stack Developer and B.Tech CSE student passionate about building modern, scalable, high-performance web applications with beautiful user experiences.' },
    journey: { type: String, default: 'Started coding during Computer Science studies and fell in love with engineering end-to-end software solutions. Experienced in building responsive React frontends and Node.js microservices.' },
    careerGoals: { type: String, default: 'Aiming to lead high-impact engineering projects, contribute to open-source software, and push the boundaries of modern full-stack web technologies.' },
    strengths: { type: [String], default: ["Full-Stack Architecture", "RESTful API Design", "Responsive UI/UX Design", "Performance Tuning", "Clean Code"] },
    technologiesOfInterest: { type: [String], default: ["TypeScript", "GraphQL", "Docker & Kubernetes", "Serverless Architecture", "Next.js"] },
    email: { type: String, required: true, default: 'ujjwal.singh.dev@example.com' },
    location: { type: String, default: 'India' },
    profileImage: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    resumeFileName: { type: String, default: '' },
    socialLinks: { type: SocialLinksSchema, default: () => ({}) },
    education: { type: [EducationSchema], default: [] },
    experience: { type: [ExperienceSchema], default: [] },
    certifications: { type: [CertificationSchema], default: [] }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Profile', ProfileSchema);
