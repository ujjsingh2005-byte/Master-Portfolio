import React from 'react';

const SectionHeader = ({ title, subtitle, badge }) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
      {badge && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 1rem',
            marginBottom: '0.85rem',
            fontSize: '0.8rem',
            fontWeight: '600',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'var(--accent-emerald)',
            backgroundColor: 'rgba(53, 208, 127, 0.08)',
            border: '1px solid rgba(53, 208, 127, 0.25)',
            borderRadius: 'var(--radius-full)'
          }}
        >
          <span className="status-dot" style={{ width: '6px', height: '6px' }} />
          {badge}
        </span>
      )}
      <h2 style={{ fontSize: '2.25rem', fontWeight: '800', letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: 'var(--text-secondary)', maxWidth: '620px', margin: '0.75rem auto 0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;

