import React from 'react';
import { ArrowRight, Download, Mail, Github, Linkedin, Twitter, Sparkles } from 'lucide-react';

const Hero = ({ profile }) => {
  const name = profile?.name || 'Alex Morgan';
  const title = profile?.title || 'Full-Stack Software Engineer';
  const tagline = profile?.tagline || 'Building scalable web applications & seamless user experiences.';
  const bio = profile?.bio || 'Passionate Full-Stack Developer with expertise in React, Node.js, Express, and MongoDB.';
  const image = profile?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600';
  const resumeUrl = profile?.resumeUrl || '#';
  const social = profile?.socialLinks || {};

  return (
    <section id="home" className="section" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', paddingTop: '3rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        
        {/* Left Column: Text & CTAs */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid var(--border-active)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--accent-primary)',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}
          >
            <Sparkles size={16} /> Available for full-stack engineering roles
          </div>

          <h1 style={{ fontSize: '3.25rem', fontWeight: '800', lineHeight: 1.15, marginBottom: '1rem', tracking: '-0.03em' }}>
            Hi, I'm <span className="text-gradient">{name}</span>
          </h1>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            {title}
          </h2>

          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '540px' }}>
            {tagline}
          </p>

          <p style={{ fontSize: '0.975rem', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '540px' }}>
            {bio}
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <a href="#projects" className="btn-primary">
              View Projects <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Me <Mail size={18} />
            </a>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Resume <Download size={18} />
            </a>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: '500' }}>Connect with me:</span>
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
        </div>

        {/* Right Column: Profile Image / Card */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '380px',
              aspectRatio: '1',
              borderRadius: 'var(--radius-lg)',
              padding: '8px',
              background: 'var(--accent-gradient)',
              boxShadow: 'var(--shadow-accent)'
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 'calc(var(--radius-lg) - 6px)',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-secondary)',
                position: 'relative'
              }}
            >
              <img
                src={image}
                alt={name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 868px) {
          #home .container {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
            text-align: center;
          }
          #home h1 {
            font-size: 2.5rem !important;
          }
          #home div[style*="justify-content: center"] {
            order: -1;
          }
          #home div[style*="flex-wrap: wrap"] {
            justify-content: center;
          }
          #home div[style*="align-items: center"] {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
