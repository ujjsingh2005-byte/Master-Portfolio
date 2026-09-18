import React, { useState } from 'react';
import { ArrowRight, Download, Mail, Github, Linkedin, GraduationCap, FileText, Camera, ShieldCheck, X } from 'lucide-react';

const Hero = ({ profile, onOpenSettings, isAdmin }) => {
  const name = profile?.name || 'Ujjwal Singh';
  const title = profile?.title || 'Full-Stack Software Engineer';
  const educationDegree = profile?.educationDegree || 'B.Tech Computer Science Engineering';
  const tagline = profile?.tagline || 'Building scalable web applications, intelligent AI microservices & seamless user experiences.';
  const bio = profile?.bio || 'Full-Stack Developer and B.Tech CSE student passionate about engineering resilient web software systems, cloud REST APIs, and production-grade digital products.';
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
    <section id="home" className="section" style={{ minHeight: '88vh', display: 'flex', alignItems: 'center', paddingTop: '3rem', position: 'relative' }}>
      {/* Extremely Subtle Radial Emerald Glow behind Hero */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(53, 208, 127, 0.07) 0%, rgba(232, 201, 139, 0.02) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3.5rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        
        {/* Left Column: Headline, Description & CTAs */}
        <div>
          {/* Status Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.75rem', alignItems: 'center' }}>
            <div className="badge-pill" style={{ backgroundColor: 'rgba(53, 208, 127, 0.08)', border: '1px solid rgba(53, 208, 127, 0.3)', color: 'var(--accent-emerald)' }}>
              <span className="status-dot" /> OPEN TO OPPORTUNITIES
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.85rem',
                backgroundColor: 'rgba(232, 201, 139, 0.08)',
                border: '1px solid rgba(232, 201, 139, 0.25)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--accent-champagne)',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}
            >
              <GraduationCap size={15} /> {educationDegree}
            </div>
          </div>

          {/* Name & Headline */}
          <span style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--accent-champagne)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
            Hi, I'm {name}
          </span>

          <h1 style={{ fontSize: '3.25rem', fontWeight: '800', lineHeight: 1.15, marginBottom: '1.25rem', letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>
            {title} <br />
            <span className="text-emerald" style={{ display: 'inline-block', marginTop: '0.25rem' }}>
              BUILDING SCALABLE WEB SYSTEMS.
            </span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1rem', maxWidth: '580px', lineHeight: 1.55, fontWeight: '500' }}>
            {tagline}
          </p>

          <p style={{ fontSize: '0.975rem', color: 'var(--text-secondary)', marginBottom: '2.25rem', maxWidth: '580px', lineHeight: 1.65 }}>
            {bio}
          </p>

          {/* Primary Action CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem', alignItems: 'center' }}>
            <a href="#projects" className="btn-primary">
              Explore Projects <ArrowRight size={18} />
            </a>

            <button onClick={handleResumeClick} className="btn-secondary" title="View & Download Resume">
              <FileText size={18} color="var(--accent-emerald)" /> View Resume
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
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-emerald)';
                e.currentTarget.style.color = 'var(--accent-emerald)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <Download size={18} />
            </a>
          </div>

          {/* Social Links Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Connect:
            </span>
            <a
              href="https://github.com/ujjsingh2005-byte"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              title="GitHub Profile"
              style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-emerald)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/ujjsingh2005"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
              style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-emerald)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:ujjsingh203@gmail.com"
              aria-label="Email Contact"
              title="Email Contact"
              style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-emerald)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Right Column: Profile Photo Visual Presentation */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div
            className="glass-card"
            style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              maxWidth: '360px',
              padding: '0.85rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(53, 208, 127, 0.3)',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5)'
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
                    backgroundColor: 'rgba(13, 15, 14, 0.9)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--accent-emerald)',
                    backdropFilter: 'blur(8px)',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}
                >
                  <Camera size={14} /> Edit Photo
                </button>
              )}
            </div>

            {/* Small Floating Metadata Badge */}
            <div
              style={{
                padding: '1rem 0.5rem 0.5rem 0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)' }}>{name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Full Stack Software Engineer</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: '600', color: 'var(--accent-emerald)', backgroundColor: 'rgba(53, 208, 127, 0.1)', padding: '0.3rem 0.7rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(53, 208, 127, 0.25)' }}>
                <span className="status-dot" /> Available
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
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
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
              overflow: 'hidden',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)'
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
                backgroundColor: 'var(--bg-primary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <FileText size={20} color="var(--accent-emerald)" />
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>{resumeFileName}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Official Verified Resume Document</p>
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
                  style={{ color: 'var(--text-secondary)', padding: '0.35rem', background: 'none', border: 'none', cursor: 'pointer' }}
                  aria-label="Close Modal"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* PDF Viewer Canvas */}
            <div style={{ flex: 1, backgroundColor: '#141816', overflow: 'hidden' }}>
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

