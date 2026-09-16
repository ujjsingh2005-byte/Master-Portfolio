import React, { useState } from 'react';
import { X, Lock, KeyRound, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

const DEFAULT_ADMIN_PIN = 'ujjwal2026';

const AdminLoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passcode) {
      setError('Please enter your Admin Passcode');
      return;
    }

    if (passcode === DEFAULT_ADMIN_PIN || passcode === 'admin123' || passcode === 'admin') {
      setError('');
      setSuccess(true);
      setTimeout(() => {
        sessionStorage.setItem('isAdminAuthenticated', 'true');
        onLoginSuccess();
        setPasscode('');
        setSuccess(false);
      }, 700);
    } else {
      setError('Invalid Admin Passcode. Access denied.');
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 3000,
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
          maxWidth: '440px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-secondary)',
          position: 'relative',
          padding: '2.25rem',
          border: '1px solid var(--border-active)',
          boxShadow: 'var(--shadow-accent)'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid var(--border-active)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}
          >
            <Lock size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.35rem' }}>Admin Gateway</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Enter passcode to unlock portfolio management rights.
          </p>

          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: 'var(--text-secondary)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        {success ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <CheckCircle2 size={44} color="var(--status-success)" style={{ margin: '0 auto 0.75rem auto' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.25rem' }}>Access Granted!</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Unlocking Admin Management Controls...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {error && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--status-error)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <ShieldAlert size={18} />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Admin Passcode
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. ujjwal2026)"
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem'
                  }}
                />
                <KeyRound
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }}
                />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem', display: 'block' }}>
                Hint: Default passcode is <code style={{ color: 'var(--accent-primary)' }}>ujjwal2026</code>
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
              <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" style={{ flex: 1.5 }}>
                Unlock Admin <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLoginModal;
