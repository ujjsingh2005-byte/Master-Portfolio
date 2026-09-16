import React, { useState } from 'react';
import { ArrowRight, Download, Mail, Github, Linkedin, Twitter, Sparkles, GraduationCap, Eye, FileText, Camera, Upload, X } from 'lucide-react';

const Hero = ({ profile, onOpenSettings, isAdmin }) => {
  const name = profile?.name || 'Ujjwal Singh';
  const title = profile?.title || 'Full-Stack Software Engineer';
  const educationDegree = profile?.educationDegree || 'B.Tech Computer Science Engineering';
  const tagline = profile?.tagline || 'Building scalable web applications & seamless user experiences.';
  const bio = profile?.bio || 'Full-Stack Developer and B.Tech CSE student passionate about building modern, scalable, high-performance web applications with beautiful user experiences.';
  const profileImage = profile?.profileImage || '/profile/ujjwal_singh_profile.jpg';
  const resumeUrl = profile?.resumeUrl || '/resume/Ujjwal_Singh_Resume.png';
  const resumeFileName = profile?.resumeFileName || 'Ujjwal_Singh_Resume.png';
  const social = profile?.socialLinks || {};

  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);

  const handleResumeClick = (e) => {
    e.preventDefault();
    if (resumeUrl && resumeUrl !== '#') {
      setIsResumePreviewOpen(true);
    } else if (onOpenSettings) {
      alert('No resume uploaded yet. Opening Profile Management to upload your resume.');
      onOpenSettings('resume');
    } else {
      alert('Resume not uploaded yet.');
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

            {/* Resume Button opening preview modal */}
            <button
              onClick={handleResumeClick}
              className="btn-secondary"
              title="Click to view official resume"
            >
              Resume <Eye size={18} />
            </button>
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

        {/* Right Column: Profile Image / Upload Space Card */}
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
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {profileImage ? (
                <>
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
                        border: '1px solid var(--border-active)',
                        color: '#ffffff',
                        fontSize: '0.825rem',
                        fontWeight: '600',
                        backdropFilter: 'blur(8px)',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        transition: 'transform var(--transition-fast)'
                      }}
                    >
                      <Camera size={16} /> Edit Photo
                    </button>
                  )}
                </>
              ) : isAdmin ? (
                <div
                  onClick={() => onOpenSettings && onOpenSettings('photo')}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                    border: '2px dashed var(--border-active)',
                    borderRadius: 'calc(var(--radius-lg) - 6px)',
                    transition: 'all var(--transition-normal)'
                  }}
                  className="photo-upload-space"
                >
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(99, 102, 241, 0.12)',
                      border: '1px solid var(--border-active)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-primary)',
                      marginBottom: '1rem'
                    }}
                  >
                    <Upload size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                    Upload Profile Photo
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', maxWidth: '240px' }}>
                    Click here to add your profile picture (JPG, PNG, WEBP)
                  </p>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.45rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--accent-primary)',
                      color: '#ffffff',
                      fontSize: '0.825rem',
                      fontWeight: '600'
                    }}
                  >
                    <Camera size={15} /> Select Image
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    textAlign: 'center',
                    background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
                    borderRadius: 'calc(var(--radius-lg) - 6px)'
                  }}
                >
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(99, 102, 241, 0.15)',
                      border: '1px solid var(--border-active)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-primary)',
                      fontSize: '2rem',
                      fontWeight: '800',
                      marginBottom: '1rem'
                    }}
                  >
                    US
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    Ujjwal Singh
                  </h3>
                  <span style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', fontWeight: '600' }}>
                    Full-Stack Engineer
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Resume Image Lightbox Modal */}
      {isResumePreviewOpen && (
        <div
          onClick={() => setIsResumePreviewOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 2500,
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
              maxWidth: '850px',
              width: '100%',
              maxHeight: '92vh',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(99, 102, 241, 0.12)', color: 'var(--accent-primary)' }}>
                  <FileText size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Ujjwal Singh - Official Resume</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>AKTU, Lucknow • B.Tech Computer Science Engineering</span>
                </div>
              </div>

              <button
                onClick={() => setIsResumePreviewOpen(false)}
                style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: 'var(--radius-sm)', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={resumeUrl}
                alt="Ujjwal Singh Resume"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: 'var(--radius-xs)', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={resumeFileName}
                className="btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}
              >
                <Download size={16} /> Download Resume
              </a>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}
              >
                <Eye size={16} /> Open Full Size Image
              </a>
            </div>
          </div>
        </div>
      )}

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
