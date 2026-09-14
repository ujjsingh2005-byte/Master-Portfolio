import React from 'react';
import { ExternalLink, Github, Info } from 'lucide-react';

const ProjectCard = ({ project, onSelect }) => {
  const { title, description, image, technologies, category, githubUrl, liveUrl } = project;

  return (
    <div
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%'
      }}
    >
      {/* Project Image */}
      <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)' }}>
        <img
          src={image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }}
        />
        <span
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '0.25rem 0.75rem',
            backgroundColor: 'var(--bg-glass)',
            backdropFilter: 'blur(8px)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)'
          }}
        >
          {category}
        </span>
      </div>

      {/* Card Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem' }}>
          {title}
        </h3>

        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', flex: 1, lineHeight: 1.6 }}>
          {description}
        </p>

        {/* Tech Stack Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {technologies.map((tech, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.2rem 0.5rem',
                backgroundColor: 'rgba(99, 102, 241, 0.08)',
                color: 'var(--accent-primary)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(99, 102, 241, 0.15)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links & Details Action */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Source Code"
                style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}
              >
                <Github size={18} />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live Preview"
                style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>

          <button
            onClick={() => onSelect(project)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.85rem',
              fontWeight: '600',
              color: 'var(--accent-primary)'
            }}
          >
            Details <Info size={15} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProjectCard;
