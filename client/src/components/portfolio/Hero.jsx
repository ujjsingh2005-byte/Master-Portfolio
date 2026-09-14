import React from 'react';
import { ArrowRight, Download, Mail, Github, Linkedin, Twitter, Sparkles, GraduationCap, Eye, FileText } from 'lucide-react';

const defaultAvatarPlaceholder = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600';

const Hero = ({ profile, onOpenSettings }) => {
  const name = profile?.name || 'Ujjwal Singh';
  const title = profile?.title || 'Full-Stack Software Engineer';
  const educationDegree = profile?.educationDegree || 'B.Tech Computer Science Engineering';
  const tagline = profile?.tagline || 'Building scalable web applications & seamless user experiences.';
  const bio = profile?.bio || 'Full-Stack Developer and B.Tech CSE student passionate about building modern, scalable, high-performance web applications with beautiful user experiences.';
  const profileImage = profile?.profileImage || defaultAvatarPlaceholder;
  const resumeUrl = profile?.resumeUrl || '';
  const resumeFileName = profile?.resumeFileName || 'Ujjwal_Singh_Resume.pdf';
  const social = profile?.socialLinks || {};

  const handleResumeClick = (e) => {
    if (!resumeUrl) {
      e.preventDefault();
      if (onOpenSettings) {
        alert('No resume PDF uploaded yet. Opening Profile Management to upload your resume.');
        onOpenSettings('resume');
      } else {
        alert('Resume not uploaded yet.');
      }
    }
  };

  return (
    <section id="home" className="section" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', paddingTop: '3rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        
        {/* Left Column: Text & CTAs */}
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
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
                fontWeight: '600'
              }}
            >
              <Sparkles size={16} /> Available for full-stack engineering roles
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1rem',
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--accent-secondary)',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}
            >
              <GraduationCap size={16} /> {educationDegree}
            </div>
          </div>

          <h1 style={{ fontSize: '3.25rem', fontWeight: '800', lineHeight: 1.15, marginBottom: '0.75rem', tracking: '-0.03em' }}>
            Hi, I'm <span className="text-gradient">{name}</span>
          </h1>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            {title}
          </h2>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', maxWidth: '540px', lineHeight: 1.6 }}>
            {tagline}
          </p>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '540px', lineHeight: 1.6 }}>
            {bio}
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <a href="#projects" className="btn-primary">
              View My Work <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Me <Mail size={18} />
            </a>

            {/* Resume Button dynamically connected to resumeUrl */}
            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={resumeFileName}
                className="btn-secondary"
                title={`Resume: ${resumeFileName}`}
              >
                Resume <Download size={18} />
              </a>
            ) : (
              <button
                onClick={handleResumeClick}
                className="btn-secondary"
                style={{ opacity: 0.75 }}
                title="Resume not uploaded yet"
              >
                Resume <FileText size={18} />
              </button>
            )}
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

        {/* Right Column: Profile Image Card */}
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
                src={profileImage}
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
