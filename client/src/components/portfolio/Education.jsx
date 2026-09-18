import React, { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import { GraduationCap, Calendar, Award, Plus, Trash2, Loader2, Sparkles } from 'lucide-react';
import AddEducationModal from './AddEducationModal';
import { deleteEducation } from '../../services/api';

const Education = ({ profile, onProfileUpdated, isAdmin }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const educationList = profile?.education || [
    {
      institution: "GCRG, Dr.A.P.J Abdul Kalam Technical University",
      degree: "B.Tech",
      fieldOfStudy: "Computer Science and Engineering",
      duration: "Sep. 2023 - May 2027",
      achievements: [
        "Specialized in Data Structures, Algorithms, AI & Systems Programming",
        "Lucknow, Uttar Pradesh"
      ]
    },
    {
      institution: "Kamla Nehru Institute of Child and Education",
      degree: "12th Standard",
      fieldOfStudy: "Senior Secondary Science",
      duration: "April 2021 - May 2022",
      achievements: [
        "Percentage: 81%",
        "Sultanpur, Uttar Pradesh"
      ]
    },
    {
      institution: "Kamla Nehru Institute of Child and Education",
      degree: "10th Standard",
      fieldOfStudy: "Secondary Education",
      duration: "April 2019 - May 2020",
      achievements: [
        "Percentage: 88.8%",
        "Sultanpur, Uttar Pradesh"
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
        
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge-pill" style={{ marginBottom: '0.75rem' }}>
              <GraduationCap size={14} /> Academic Qualifications
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.025em' }}>
              Education & Academics
            </h2>
          </div>

          {isAdmin && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}
            >
              <Plus size={18} /> Add Education
            </button>
          )}
        </div>

        <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', marginBottom: '3rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Formal Computer Science Engineering education, secondary certifications, and academic performance.
        </p>

        {/* Education Timeline */}
        <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative' }}>
          
          {/* Vertical Line */}
          <div
            style={{
              position: 'absolute',
              top: '15px',
              bottom: '15px',
              left: '20px',
              width: '2px',
              backgroundColor: 'var(--border-color)'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {educationList.map((edu, idx) => {
              const identifier = edu._id || edu.degree || idx;
              const isDeletingThis = deletingId === identifier;

              return (
                <div key={identifier} style={{ position: 'relative', paddingLeft: '3.25rem' }}>
                  
                  {/* Icon Node */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '4px',
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
                      boxShadow: 'var(--shadow-sm)',
                      zIndex: 2
                    }}
                  >
                    <GraduationCap size={18} />
                  </div>

                  {/* Card Container */}
                  <div className="glass-card" style={{ padding: '1.75rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: '800', letterSpacing: '-0.01em' }}>
                        {edu.degree} {edu.fieldOfStudy ? `— ${edu.fieldOfStudy}` : ''}
                      </h3>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="badge-pill" style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}>
                          <Calendar size={13} /> {edu.duration}
                        </span>

                        {/* Delete Action (Admin Only) */}
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
                              transition: 'opacity var(--transition-fast)'
                            }}
                          >
                            {isDeletingThis ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={17} />}
                          </button>
                        )}
                      </div>
                    </div>

                    <h4 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--accent-primary)', marginBottom: '1.25rem' }}>
                      {edu.institution}
                    </h4>

                    {edu.achievements && edu.achievements.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {edu.achievements.map((ach, aIdx) => (
                          <div key={aIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            <Award size={16} color="var(--accent-secondary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                            <span>{ach}</span>
                          </div>
                        ))}
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
