import React, { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import { Calendar, MapPin, CheckCircle, Plus, Trash2, Loader2, FileText, X, Eye, Award } from 'lucide-react';
import AddExperienceModal from './AddExperienceModal';
import { deleteExperience } from '../../services/api';

const defaultDocImages = {
  "BharatCares & IBM SkillsBuild": "/experience/ibm_skillsbuild_certificate.jpg",
  "Next Leap Analytics Pvt. Ltd.": "/experience/nextleap_internship_letter.jpg"
};

const Experience = ({ profile, onProfileUpdated, isAdmin }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);

  const experienceList = profile?.experience || [
    {
      company: "BharatCares & IBM SkillsBuild",
      role: "AI Automation & Intelligent Solutions Intern",
      duration: "June 2026 - July 2026",
      location: "Remote / AICTE",
      responsibilities: [
        "Completed 6-week intensive internship in AI Automation & Intelligent Solutions in association with AICTE and IBM SkillsBuild.",
        "Engineered automated AI workflows, intelligent system solutions, and data processing pipelines.",
        "Delivered AI projects under mentorship of IBM SkillsBuild and BharatCares leadership."
      ],
      technologies: ["AI Automation", "IBM SkillsBuild", "Machine Learning", "Python", "Intelligent Systems"],
      certificateUrl: "/experience/ibm_skillsbuild_certificate.jpg"
    },
    {
      company: "Next Leap Analytics Pvt. Ltd.",
      role: "AI Content and Technology Intern",
      duration: "Nov 2025 - Dec 2025",
      location: "Mumbai, Maharashtra",
      responsibilities: [
        "Actively contributed to Generative-AI-based content creation and automated workflow optimization.",
        "Designed and implemented AI-driven question generation engines and structured data management pipelines.",
        "Awarded Official Internship Completion Letter with top performance rating from Head of Operations."
      ],
      technologies: ["Generative AI", "AI Question Generation", "Prompt Engineering", "Data Management", "Python"],
      certificateUrl: "/experience/nextleap_internship_letter.jpg"
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

  const handleViewDoc = (e, exp) => {
    if (e) e.stopPropagation();
    const docUrl = exp.certificateUrl || defaultDocImages[exp.company];
    if (docUrl) {
      setPreviewDoc({
        title: `${exp.role} - ${exp.company}`,
        company: exp.company,
        duration: exp.duration,
        imageUrl: docUrl
      });
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
            const docUrl = exp.certificateUrl || defaultDocImages[exp.company];
            const hasDoc = Boolean(docUrl);

            return (
              <div
                key={identifier}
                className="glass-card"
                onClick={(e) => {
                  if (hasDoc) handleViewDoc(e, exp);
                }}
                style={{
                  padding: '2rem',
                  cursor: hasDoc ? 'pointer' : 'default',
                  transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
                }}
              >
                
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteExp(exp, idx);
                          }}
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

                {/* Bottom Bar with Tech Tags and Certificate View Button */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  
                  {/* Technologies */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
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

                  {/* View Certificate / Completion Letter Button */}
                  {hasDoc && (
                    <button
                      onClick={(e) => handleViewDoc(e, exp)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.825rem',
                        fontWeight: '600',
                        color: 'var(--accent-primary)',
                        backgroundColor: 'rgba(99, 102, 241, 0.12)',
                        border: '1px solid var(--border-active)',
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                      }}
                      title="Click to view official completion letter or certificate"
                    >
                      <FileText size={15} /> View Official Document
                    </button>
                  )}

                </div>

              </div>
            );
          })}
        </div>

        {/* Document Image Lightbox Modal */}
        {previewDoc && (
          <div
            onClick={() => setPreviewDoc(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 2500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="glass-card"
              style={{
                maxWidth: '850px',
                width: '100%',
                maxHeight: '90vh',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{previewDoc.title}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Official Document • {previewDoc.duration}</span>
                </div>

                <button
                  onClick={() => setPreviewDoc(null)}
                  style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', textAlign: 'center', backgroundColor: '#0f172a', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={previewDoc.imageUrl}
                  alt={previewDoc.title}
                  style={{ maxWidth: '100%', maxHeight: '65vh', objectFit: 'contain', borderRadius: 'var(--radius-sm)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                <a
                  href={previewDoc.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}
                >
                  <Eye size={16} /> Open Full Size Document
                </a>
              </div>
            </div>
          </div>
        )}

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
