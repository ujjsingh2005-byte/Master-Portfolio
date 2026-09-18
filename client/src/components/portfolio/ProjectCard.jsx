import React, { useState } from 'react';
import { ExternalLink, Github, Info, Trash2, Loader2, CheckCircle2 } from 'lucide-react';

const ProjectCard = ({ project, onSelect, onDelete }) => {
  const { _id, title, description, image, technologies = [], category, githubUrl, liveUrl, features = [] } = project;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
        position: 'relative',
        cursor: 'pointer',
        borderTop: isHovered ? '2px solid var(--accent-emerald)' : '1px solid var(--border-color)',
        transition: 'all var(--transition-normal)'
      }}
    >
      {/* Project Cover Image */}
      <div style={{ position: 'relative', width: '100%', height: '210px', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)' }}>
        <img
          src={image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform var(--transition-slow)'
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '0.3rem 0.85rem',
            backgroundColor: 'rgba(13, 15, 14, 0.88)',
            backdropFilter: 'blur(8px)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: '600',
            color: 'var(--accent-emerald)',
            border: '1px solid rgba(53, 208, 127, 0.3)'
          }}
        >
          {category}
        </span>
      </div>

      {/* Card Body */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.6rem', letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>
          {title}
        </h3>

        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', flex: 1, lineHeight: 1.6 }}>
          {description}
        </p>

        {/* Key Features Bullet Highlights */}
        {features && features.length > 0 && (
          <div style={{ marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {features.slice(0, 2).map((feat, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={15} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                  {feat}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {technologies.map((tech, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: '500',
                padding: '0.2rem 0.6rem',
                backgroundColor: 'rgba(53, 208, 127, 0.08)',
                color: 'var(--accent-emerald)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(53, 208, 127, 0.2)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Card Footer Launch Links */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="GitHub Repository"
                title="Open GitHub Repository"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--text-secondary)',
                  transition: 'color var(--transition-fast)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <Github size={17} /> Source
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="Live Demo Website"
                title="Open Live Website / Demo"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--accent-emerald)',
                  transition: 'color var(--transition-fast)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-emerald-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--accent-emerald)')}
              >
                <ExternalLink size={17} /> Live Demo
              </a>
            )}

            {/* Delete Project (Admin Only) */}
            {onDelete && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                aria-label="Delete project"
                title="Delete project"
                style={{
                  color: 'var(--status-error)',
                  padding: '0.2rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  opacity: isDeleting ? 0.5 : 0.85,
                  transition: 'opacity var(--transition-fast)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {isDeleting ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={16} />}
              </button>
            )}
          </div>

          <button
            onClick={() => onSelect(project)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.85rem',
              fontWeight: '600',
              color: 'var(--accent-champagne)',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
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

