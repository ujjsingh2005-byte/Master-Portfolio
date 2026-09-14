import React from 'react';
import SectionHeader from './SectionHeader';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';

const Experience = ({ profile }) => {
  const experienceList = profile?.experience || [
    {
      company: "Apex Tech Innovations",
      role: "Full-Stack Developer",
      duration: "2024 - Present",
      location: "San Francisco, CA",
      responsibilities: [
        "Engineered responsive React micro-frontends serving over 50,000 active monthly users.",
        "Designed and implemented RESTful microservices using Node.js, Express, and MongoDB Atlas.",
        "Improved API throughput by 35% using Redis caching and query indexing."
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Git"]
    },
    {
      company: "CloudScale Labs",
      role: "Frontend Engineer Intern",
      duration: "2023 - 2024",
      location: "Remote",
      responsibilities: [
        "Developed reusable UI component library following accessible WCAG 2.1 AA standards.",
        "Collaborated with UX designers to convert Figma designs into pixel-perfect React components."
      ],
      technologies: ["React", "JavaScript", "HTML5", "CSS3", "Vite"]
    }
  ];

  return (
    <section id="experience" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <SectionHeader
          badge="Career Milestone"
          title="Professional Experience"
          subtitle="My industry work history, software engineering responsibilities, and delivered impact."
        />

        <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {experienceList.map((exp, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '2rem' }}>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '700' }}>
                    {exp.role}
                  </h3>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--accent-primary)', marginTop: '0.2rem' }}>
                    {exp.company}
                  </h4>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--accent-secondary)', backgroundColor: 'rgba(6, 182, 212, 0.1)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>
                    <Calendar size={14} /> {exp.duration}
                  </span>
                  {exp.location && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                      <MapPin size={13} /> {exp.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Responsibilities */}
              <div style={{ marginBottom: '1.25rem' }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      <CheckCircle size={16} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '4px' }} />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '0.2rem 0.6rem',
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-secondary)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
