import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        color: 'var(--text-primary)',
        transition: 'all var(--transition-fast)'
      }}
    >
      {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
    </button>
  );
};

export default ThemeToggle;
