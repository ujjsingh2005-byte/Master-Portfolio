import React from 'react';
import { X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const MobileMenu = ({ isOpen, onClose, activeSection, theme, toggleTheme }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--bg-glass)',
        backdropFilter: 'blur(16px)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 1.5rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
        <span style={{ fontSize: '1.25rem', fontWeight: '800' }} className="text-gradient">
          PortfolioPro
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button onClick={onClose} aria-label="Close menu" style={{ color: 'var(--text-primary)', padding: '0.5rem' }}>
            <X size={24} />
          </button>
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
        {navItems.map((item) => {
          const isActive = activeSection === item.label.toLowerCase();
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={onClose}
              style={{
                fontSize: '1.25rem',
                fontWeight: isActive ? '700' : '500',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-primary)',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--border-color)'
              }}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
        PortfolioPro &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default MobileMenu;
