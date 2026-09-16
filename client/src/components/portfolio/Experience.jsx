import React, { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import { Calendar, MapPin, CheckCircle, Plus, Trash2, Loader2 } from 'lucide-react';
import AddExperienceModal from './AddExperienceModal';
import { deleteExperience } from '../../services/api';

const Experience = ({ profile, onProfileUpdated, isAdmin }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const experienceList = profile?.experience || [
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
  ];

  const handleDeleteExp = async (exp, idx) => {
    const identifier = exp._id || exp.company || idx;
    const title = `${exp.role} at ${exp.company}`;
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        setDeletingId(identifier);
        await deleteExperience(identifier);
        if (onProfileUpdated) onProfileUpdated();
      } catch (err) {
        alert(err.message || 'Failed to delete work experience.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <section id="experience" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <SectionHeader
              badge="Career Milestone"
              title="Professional Experience"
              subtitle="My industry work history, software engineering responsibilities, and delivered impact."
            />
          </div>

          {isAdmin && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}
            >
              <Plus size={18} /> Add Experience
            </button>
          )}
        </div>

        <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {experienceList.map((exp, idx) => {
            const identifier = exp._id || exp.company || idx;
            const isDeletingThis = deletingId === identifier;

            return (
              <div key={identifier} className="glass-card" style={{ padding: '2rem' }}>
                
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--accent-secondary)', backgroundColor: 'rgba(6, 182, 212, 0.1)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>
                        <Calendar size={14} /> {exp.duration}
                      </span>

                      {/* Admin Delete Icon */}
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteExp(exp, idx)}
                          disabled={isDeletingThis}
                          aria-label={`Delete ${exp.role}`}
                          title={`Delete ${exp.role}`}
                          style={{
                            color: 'var(--status-error)',
                            padding: '0.25rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            opacity: isDeletingThis ? 0.4 : 0.75,
                            transition: 'opacity var(--transition-fast)',
                            cursor: 'pointer'
                          }}
                        >
                          {isDeletingThis ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={17} />}
                        </button>
                      )}
                    </div>

                    {exp.location && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                        <MapPin size={13} /> {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Responsibilities */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
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
                )}

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
            );
          })}
        </div>

        {/* Add Experience Modal */}
        <AddExperienceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onExperienceAdded={onProfileUpdated}
        />

      </div>
    </section>
  );
};

export default Experience;
