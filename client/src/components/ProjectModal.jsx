import React from 'react';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  const { title, description, image, technologies, category, githubUrl, liveUrl, features = [] } = project;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
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
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-secondary)',
          position: 'relative'
        }}
      >
        {/* Header Image */}
        <div style={{ position: 'relative', width: '100%', height: '260px', overflow: 'hidden' }}>
          <img
            src={image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '2rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--accent-primary)', letterSpacing: '0.05em' }}>
            {category} Project
          </span>

          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '0.25rem', marginBottom: '1rem' }}>
            {title}
          </h2>

          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            {description}
          </p>

          {/* Key Features */}
          {features && features.length > 0 && (
            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.75rem' }}>Key Architectural Features:</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {features.map((feature, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.925rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={18} color="var(--status-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.75rem' }}>Technologies Used:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {technologies.map((tech, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '0.35rem 0.85rem',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    color: 'var(--accent-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-active)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ flex: 1, minWidth: '160px' }}>
                <Github size={18} /> Source Code
              </a>
            )}
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flex: 1, minWidth: '160px' }}>
                <ExternalLink size={18} /> Live Demo
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectModal;
