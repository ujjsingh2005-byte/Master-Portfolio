import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message = 'Failed to load content. Please try again.', onRetry }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 1.5rem',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--status-error)',
        margin: '1.5rem 0'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <AlertCircle size={20} />
        <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '0.4rem 1rem',
            backgroundColor: 'var(--status-error)',
            color: '#fff',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
