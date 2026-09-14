import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = ({ profile }) => {
  const social = profile?.socialLinks || {};
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', padding: '3rem 0 2rem 0' }}>
      <div className="container">
        
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: '800' }} className="text-gradient">
              PortfolioPro
            </span>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Full-Stack Software Engineering Portfolio
            </p>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {social.github && (
              <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}>
                <Github size={20} />
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}>
                <Linkedin size={20} />
              </a>
            )}
            {social.twitter && (
              <a href={social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}>
                <Twitter size={20} />
              </a>
            )}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
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
            <ArrowUp size={18} />
          </button>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          &copy; {currentYear} {profile?.name || 'Alex Morgan'}. Built with React, Vite, Node.js, Express & MongoDB. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
