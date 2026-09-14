import React from 'react';
import SectionHeader from '../common/SectionHeader';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const Education = ({ profile }) => {
  const educationList = profile?.education || [
    {
      institution: "State University of Technology",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science & Engineering",
      duration: "2020 - 2024",
      achievements: [
        "Graduated Magna Cum Laude (GPA: 3.85/4.0)",
        "Lead Developer for Annual University Tech Symposium Website",
        "Published research paper on Web Performance Optimization"
      ]
    },
    {
      institution: "Full-Stack Software Engineering Bootcamp",
      degree: "Professional Certificate",
      fieldOfStudy: "Modern Web Development",
      duration: "2023",
      achievements: [
        "Completed 500+ hours of intensive hands-on coding",
        "Built 4 full-stack capstone projects using MERN stack"
      ]
    }
  ];

  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeader
          badge="Academic Qualifications"
          title="Education & Academic Background"
          subtitle="A timeline of my formal computer science education, degrees, and academic milestones."
        />

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical Timeline Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '20px',
              width: '2px',
              backgroundColor: 'var(--border-color)'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {educationList.map((edu, idx) => (
              <div key={idx} style={{ position: 'relative', paddingLeft: '3.25rem' }}>
                {/* Timeline Icon Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '4px',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-primary)',
                    border: '2px solid var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)',
                    zIndex: 2
                  }}
                >
                  <GraduationCap size={18} />
                </div>

                {/* Card Container */}
                <div className="glass-card" style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700' }}>
                      {edu.degree} in {edu.fieldOfStudy}
                    </h3>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: '600', backgroundColor: 'rgba(99, 102, 241, 0.1)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>
                      <Calendar size={14} /> {edu.duration}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                    {edu.institution}
                  </h4>

                  {edu.achievements && edu.achievements.length > 0 && (
                    <div>
                      <span style={{ fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                        Key Accomplishments
                      </span>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {edu.achievements.map((ach, aIdx) => (
                          <li key={aIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.925rem', color: 'var(--text-secondary)' }}>
                            <Award size={16} color="var(--accent-secondary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;
