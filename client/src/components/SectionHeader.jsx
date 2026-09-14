import React from 'react';

const SectionHeader = ({ title, subtitle, badge }) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
      {badge && (
        <span
          style={{
            display: 'inline-block',
            padding: '0.35rem 1rem',
            marginBottom: '0.75rem',
            fontSize: '0.85rem',
            fontWeight: '600',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'var(--accent-primary)',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid var(--border-active)',
            borderRadius: 'var(--radius-full)'
          }}
        >
          {badge}
        </span>
      )}
      <h2 style={{ fontSize: '2.25rem', fontWeight: '800', tracking: '-0.025em' }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0.75rem auto 0 auto', fontSize: '1.05rem' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
