import React, { useState } from 'react';
import { ArrowRight, Download, Mail, Github, Linkedin, Sparkles, GraduationCap, Eye, FileText, Camera, ShieldCheck, X } from 'lucide-react';

const Hero = ({ profile, onOpenSettings, isAdmin }) => {
  const name = profile?.name || 'Ujjwal Singh';
  const title = profile?.title || 'Full-Stack Software Engineer';
  const educationDegree = profile?.educationDegree || 'B.Tech Computer Science Engineering';
  const tagline = profile?.tagline || 'Building scalable web applications, intelligent AI systems & seamless user experiences.';
  const bio = profile?.bio || 'Full-Stack Developer and B.Tech CSE student passionate about engineering high-performance web applications, cloud microservices, and modern user-centric digital products.';
  const profileImage = profile?.profileImage || '/profile/ujjwal_singh_profile.jpg';
  const resumeUrl = profile?.resumeUrl || '/resume/Ujjwal_Singh_Resume.pdf';
  const resumeFileName = profile?.resumeFileName || 'Ujjwal_Singh_Resume.pdf';

  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);

  const handleResumeClick = (e) => {
    e.preventDefault();
    if (resumeUrl && resumeUrl !== '#') {
      setIsResumePreviewOpen(true);
    } else if (onOpenSettings) {
      onOpenSettings('resume');
    } else {
      alert('Resume not available.');
    }
  };

  return (
    <section id="home" className="section" style={{ minHeight: '88vh', display: 'flex', alignItems: 'center', paddingTop: '2.5rem' }}>
      <div className="container hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3.5rem', alignItems: 'center' }}>
        
        {/* Left Column: Headline, Description & CTAs */}
        <div>
          {/* Status Badge */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div className="badge-pill">
              <span className="status-dot" /> Available for Opportunities
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.85rem',
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--accent-secondary)',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}
            >
              <GraduationCap size={15} /> {educationDegree}
            </div>
          </div>

          {/* Name & Title */}
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>
            Hi, I'm <span className="text-gradient">{name}</span>
          </h1>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '600', color: 'var(--accent-primary)', marginBottom: '1.25rem', letterSpacing: '-0.01em' }}>
            {title}
          </h2>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1rem', maxWidth: '560px', lineHeight: 1.5, fontWeight: '500' }}>
            {tagline}
          </p>

          <p style={{ fontSize: '0.975rem', color: 'var(--text-secondary)', marginBottom: '2.25rem', maxWidth: '560px', lineHeight: 1.65 }}>
            {bio}
          </p>

          {/* Primary Action CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem', alignItems: 'center' }}>
            <a href="#projects" className="btn-primary">
              View My Work <ArrowRight size={18} />
            </a>

            <button onClick={handleResumeClick} className="btn-secondary" title="View & Download Resume">
              <FileText size={18} color="var(--accent-primary)" /> View Resume
            </button>

            <a
              href={resumeUrl}
              download={resumeFileName}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume PDF"
              title="Download Resume PDF"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Download size={18} />
            </a>
          </div>

          {/* Social Links Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Connect:
            </span>
            <a
              href="https://github.com/ujjsingh2005-byte"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              title="GitHub Profile"
              style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
              style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:ujjsingh203@gmail.com"
              aria-label="Email Contact"
              title="Email Contact"
              style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Right Column: Hero Visual Container */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          {/* Ambient Glow Backdrop */}
          <div
            style={{
              position: 'absolute',
              inset: '-20px',
              background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 70%)',
              filter: 'blur(30px)',
              zIndex: 0
            }}
          />

          <div
            className="glass-card"
            style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              maxWidth: '360px',
              padding: '0.75rem',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <div
              style={{
                width: '100%',
                height: '420px',
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

              {/* Profile Image Change Action (Admin Only) */}
              {isAdmin && (
                <button
                  onClick={() => onOpenSettings && onOpenSettings('photo')}
                  aria-label="Change Profile Photo"
                  title="Change Profile Photo"
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.5rem 0.9rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    color: '#ffffff',
                    border: '1px solid var(--border-active)',
                    backdropFilter: 'blur(8px)',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}
                >
                  <Camera size={14} /> Edit Photo
                </button>
              )}
            </div>

            {/* Floating Info Tag */}
            <div
              style={{
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>{name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>AKTU, Lucknow, UP, India</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: '600', color: 'var(--status-success)', backgroundColor: 'rgba(34, 197, 94, 0.12)', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                <ShieldCheck size={14} /> Verified
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Preview Modal */}
      {isResumePreviewOpen && (
        <div
          onClick={() => setIsResumePreviewOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: 2500,
            display: 'flex',
            flexDirection: 'column',
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
              maxWidth: '920px',
              height: '88vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--bg-secondary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <FileText size={20} color="var(--accent-primary)" />
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{resumeFileName}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Official Resume Document</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <a
                  href={resumeUrl}
                  download={resumeFileName}
                  className="btn-primary"
                  style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
                >
                  <Download size={16} /> Download PDF
                </a>
                <button
                  onClick={() => setIsResumePreviewOpen(false)}
                  style={{ color: 'var(--text-secondary)', padding: '0.35rem' }}
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* PDF Viewer Canvas */}
            <div style={{ flex: 1, backgroundColor: '#1e293b', overflow: 'hidden' }}>
              <iframe
                src={resumeUrl}
                title="Resume Preview"
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
