import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map(item => item.label.toLowerCase());
      const scrollPosition = window.scrollY + 200;

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

    window.addEventListener('scroll', handleScroll);
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
          borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent',
          transition: 'all var(--transition-normal)',
          padding: '1rem 0'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#home" style={{ fontSize: '1.4rem', fontWeight: '800', tracking: '-0.03em' }} className="text-gradient">
            PortfolioPro
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {navItems.map((item) => {
              const sectionId = item.label.toLowerCase();
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: isActive ? '600' : '400',
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    transition: 'color var(--transition-fast)',
                    position: 'relative'
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-6px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: 'var(--accent-primary)',
                        borderRadius: 'var(--radius-full)'
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions (Theme Toggle & Mobile Menu trigger) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              style={{ color: 'var(--text-primary)', padding: '0.5rem' }}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <style>{`
        @media (max-width: 868px) {
          .desktop-nav {
            display: none !important;
          }
        }
        @media (min-width: 869px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
