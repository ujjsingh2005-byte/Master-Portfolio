import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ message = 'Loading content...' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 0', gap: '1rem', color: 'var(--text-secondary)' }}>
      <Loader2 size={36} className="spin-anim" style={{ color: 'var(--accent-primary)', animation: 'spin 1s linear infinite' }} />
      <span>{message}</span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
