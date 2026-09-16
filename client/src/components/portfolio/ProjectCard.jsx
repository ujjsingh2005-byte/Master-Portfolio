import React, { useState } from 'react';
import { ExternalLink, Github, Info, Trash2, Loader2 } from 'lucide-react';

const ProjectCard = ({ project, onSelect, onDelete }) => {
  const { _id, title, description, image, technologies, category, githubUrl, liveUrl } = project;
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        setIsDeleting(true);
        await onDelete(_id);
      } catch (err) {
        console.error('Delete error:', err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div
      className="glass-card"
      onClick={() => onSelect(project)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
        position: 'relative',
        cursor: 'pointer'
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

        {/* Links & Actions (Details & Delete Button) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="Source Code"
                title="View GitHub Repository"
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
                onClick={(e) => e.stopPropagation()}
                aria-label="Live Preview"
                title="Open Live Project / Demo"
                style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}
              >
                <ExternalLink size={18} />
              </a>
            )}

            {/* Delete Button */}
            {onDelete && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                aria-label="Delete project"
                title="Delete project from portfolio"
                style={{
                  color: 'var(--status-error)',
                  padding: '0.2rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  opacity: isDeleting ? 0.5 : 0.85,
                  transition: 'opacity var(--transition-fast)'
                }}
              >
                {isDeleting ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={17} />}
              </button>
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
