import React, { useState, useEffect } from 'react';
import { Menu, UserCog, FileText } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';
import MobileMenu from './MobileMenu';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = ({ onOpenSettings, isAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map(item => item.label.toLowerCase());
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          backgroundColor: isScrolled ? 'var(--bg-glass)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent',
          transition: 'all var(--transition-normal)',
          padding: '0.85rem 0'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo / Brand Name */}
          <a
            href="#home"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '1.25rem',
              fontWeight: '800',
              letterSpacing: '-0.03em'
            }}
          >
            <span className="text-gradient">Ujjwal Singh</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>.dev</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
            {navItems.map((item) => {
              const sectionId = item.label.toLowerCase();
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    transition: 'color var(--transition-fast)',
                    position: 'relative',
                    padding: '0.2rem 0'
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'var(--accent-gradient)',
                        borderRadius: 'var(--radius-full)'
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions Right Side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Resume Quick Access CTA */}
            <a
              href="/resume/Ujjwal_Singh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{
                padding: '0.45rem 0.9rem',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-md)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <FileText size={15} color="var(--accent-primary)" />
              <span className="desktop-only-text">Resume</span>
            </a>

            {/* Admin Settings Button if authenticated */}
            {isAdmin && (
              <button
                onClick={() => onOpenSettings && onOpenSettings()}
                aria-label="Edit Profile & Resume"
                title="Edit Profile & Resume"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(99, 102, 241, 0.12)',
                  border: '1px solid var(--border-active)',
                  color: 'var(--accent-primary)',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <UserCog size={16} />
                <span className="desktop-only-text">Admin</span>
              </button>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Hamburger Trigger */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              style={{
                color: 'var(--text-primary)',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
      />

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav {
            display: none !important;
          }
        }
        @media (min-width: 961px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 540px) {
          .desktop-only-text {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
