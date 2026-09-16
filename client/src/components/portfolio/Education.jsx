import React, { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import { GraduationCap, Calendar, Award, Plus, Trash2, Loader2 } from 'lucide-react';
import AddEducationModal from './AddEducationModal';
import { deleteEducation } from '../../services/api';

const Education = ({ profile, onProfileUpdated, isAdmin }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const educationList = profile?.education || [
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
  ];

  const handleDeleteEdu = async (edu, idx) => {
    const identifier = edu._id || edu.degree || idx;
    const title = `${edu.degree} in ${edu.fieldOfStudy}`;
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        setDeletingId(identifier);
        await deleteEducation(identifier);
        if (onProfileUpdated) onProfileUpdated();
      } catch (err) {
        alert(err.message || 'Failed to delete education entry.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <section id="education" className="section">
      <div className="container">
        
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <SectionHeader
              badge="Academic Qualifications"
              title="Education & Academic Background"
              subtitle="A timeline of my formal computer science education, degrees, and academic milestones."
            />
          </div>

          {isAdmin && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}
            >
              <Plus size={18} /> Add Education
            </button>
          )}
        </div>

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
            {educationList.map((edu, idx) => {
              const identifier = edu._id || edu.degree || idx;
              const isDeletingThis = deletingId === identifier;

              return (
                <div key={identifier} style={{ position: 'relative', paddingLeft: '3.25rem' }}>
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
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: '600', backgroundColor: 'rgba(99, 102, 241, 0.1)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>
                          <Calendar size={14} /> {edu.duration}
                        </span>

                        {/* Admin Delete Icon */}
                        {isAdmin && (
                          <button
                            onClick={() => handleDeleteEdu(edu, idx)}
                            disabled={isDeletingThis}
                            aria-label={`Delete ${edu.degree}`}
                            title={`Delete ${edu.degree}`}
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
              );
            })}
          </div>

        </div>

        {/* Add Education Modal */}
        <AddEducationModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onEducationAdded={onProfileUpdated}
        />

      </div>
    </section>
  );
};

export default Education;
