import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2, Eye, Download, UserCheck, FileText, Camera, Loader2, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { uploadProfilePhoto, deleteProfilePhoto, uploadResume, deleteResume, updateProfile } from '../../services/api';

const defaultAvatarPlaceholder = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600';

const ProfileManagementModal = ({ isOpen, onClose, profile, onProfileUpdated, initialTab = 'photo' }) => {
  const [activeTab, setActiveTab] = useState(initialTab || 'photo'); // 'photo' | 'resume' | 'info'
  
  // Photo State
  const [photoPreview, setPhotoPreview] = useState('');
  const [photoLoading, setPhotoLoading] = useState(false);
  const [photoMessage, setPhotoMessage] = useState({ type: '', text: '' });

  // Resume State
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeMessage, setResumeMessage] = useState({ type: '', text: '' });

  // Personal Info State
  const [infoData, setInfoData] = useState({
    name: 'Ujjwal Singh',
    title: 'Full-Stack Software Engineer',
    educationDegree: 'B.Tech Computer Science Engineering',
    tagline: 'Building scalable web applications & seamless user experiences.',
    bio: 'Full-Stack Developer and B.Tech CSE student passionate about building modern, scalable, high-performance web applications with beautiful user experiences.'
  });
  const [infoLoading, setInfoLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (isOpen) {
      if (initialTab) setActiveTab(initialTab);
      if (profile) {
        setPhotoPreview(profile.profileImage || '');
        setResumeUrl(profile.resumeUrl || '');
        setResumeFileName(profile.resumeFileName || '');
        setInfoData({
          name: profile.name || 'Ujjwal Singh',
          title: profile.title || 'Full-Stack Software Engineer',
          educationDegree: profile.educationDegree || 'B.Tech Computer Science Engineering',
          tagline: profile.tagline || 'Building scalable web applications & seamless user experiences.',
          bio: profile.bio || 'Full-Stack Developer and B.Tech CSE student passionate about building modern, scalable, high-performance web applications with beautiful user experiences.'
        });
      }
    }
  }, [profile, isOpen, initialTab]);

  if (!isOpen) return null;

  // --- 1. PHOTO HANDLERS ---
  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setPhotoMessage({ type: 'error', text: 'Invalid file format. Please upload JPG, JPEG, PNG, or WEBP image.' });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setPhotoMessage({ type: 'error', text: 'File size exceeds maximum 10MB limit.' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Photo = reader.result;
      setPhotoPreview(base64Photo);
      setPhotoMessage({ type: '', text: '' });

      try {
        setPhotoLoading(true);
        const res = await uploadProfilePhoto(base64Photo);
        if (res.success) {
          setPhotoMessage({ type: 'success', text: 'Profile photo updated successfully!' });
          onProfileUpdated();
        } else {
          setPhotoMessage({ type: 'error', text: res.message || 'Failed to upload photo.' });
        }
      } catch (err) {
        setPhotoMessage({ type: 'error', text: err.message || 'Upload failed.' });
      } finally {
        setPhotoLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePhoto = async () => {
    if (window.confirm("Are you sure you want to delete your profile photo?")) {
      try {
        setPhotoLoading(true);
        setPhotoMessage({ type: '', text: '' });
        await deleteProfilePhoto();
        setPhotoPreview('');
        setPhotoMessage({ type: 'success', text: 'Profile photo deleted. Placeholder image restored.' });
        onProfileUpdated();
      } catch (err) {
        setPhotoMessage({ type: 'error', text: err.message || 'Delete failed.' });
      } finally {
        setPhotoLoading(false);
      }
    }
  };

  // --- 2. RESUME HANDLERS ---
  const handleResumeSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setResumeMessage({ type: 'error', text: 'Invalid file format. Please upload a PDF file only.' });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setResumeMessage({ type: 'error', text: 'Resume PDF exceeds maximum 10MB limit.' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const pdfDataUrl = reader.result;
      setResumeMessage({ type: '', text: '' });

      try {
        setResumeLoading(true);
        const res = await uploadResume(pdfDataUrl, file.name);
        if (res.success) {
          setResumeUrl(pdfDataUrl);
          setResumeFileName(file.name);
          setResumeMessage({ type: 'success', text: 'Resume PDF uploaded successfully!' });
          onProfileUpdated();
        } else {
          setResumeMessage({ type: 'error', text: res.message || 'Upload failed.' });
        }
      } catch (err) {
        setResumeMessage({ type: 'error', text: err.message || 'Upload failed.' });
      } finally {
        setResumeLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteResume = async () => {
    if (window.confirm("Are you sure you want to delete your resume?")) {
      try {
        setResumeLoading(true);
        setResumeMessage({ type: '', text: '' });
        await deleteResume();
        setResumeUrl('');
        setResumeFileName('');
        setResumeMessage({ type: 'success', text: 'Resume deleted successfully.' });
        onProfileUpdated();
      } catch (err) {
        setResumeMessage({ type: 'error', text: err.message || 'Delete failed.' });
      } finally {
        setResumeLoading(false);
      }
    }
  };

  // --- 3. PERSONAL INFO HANDLER ---
  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      setInfoLoading(true);
      setInfoMessage({ type: '', text: '' });
      const res = await updateProfile(infoData);
      if (res.success) {
        setInfoMessage({ type: 'success', text: 'Personal information updated successfully!' });
        onProfileUpdated();
      } else {
        setInfoMessage({ type: 'error', text: res.message || 'Update failed.' });
      }
    } catch (err) {
      setInfoMessage({ type: 'error', text: err.message || 'Update failed.' });
    } finally {
      setInfoLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
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
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-secondary)',
          position: 'relative',
          padding: '2rem'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(99, 102, 241, 0.12)', color: 'var(--accent-primary)' }}>
              <UserCheck size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Portfolio Management</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Manage profile photo, resume PDF, and personal credentials</span>
            </div>
          </div>

          <button onClick={onClose} aria-label="Close settings" style={{ color: 'var(--text-secondary)' }}>
            <X size={24} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <button
            onClick={() => setActiveTab('photo')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.875rem',
              fontWeight: '600',
              backgroundColor: activeTab === 'photo' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'photo' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            <Camera size={16} /> Profile Photo
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.875rem',
              fontWeight: '600',
              backgroundColor: activeTab === 'resume' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'resume' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            <FileText size={16} /> Resume PDF
          </button>

          <button
            onClick={() => setActiveTab('info')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.875rem',
              fontWeight: '600',
              backgroundColor: activeTab === 'info' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'info' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            <UserCheck size={16} /> Personal Info
          </button>
        </div>

        {/* TAB 1: PROFILE PHOTO MANAGEMENT */}
        {activeTab === 'photo' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {photoMessage.text && (
              <div style={{ padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', backgroundColor: photoMessage.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', border: `1px solid ${photoMessage.type === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`, color: photoMessage.type === 'error' ? 'var(--status-error)' : 'var(--status-success)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {photoMessage.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                <span>{photoMessage.text}</span>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1.5rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              
              {/* Photo Preview Box */}
              <div style={{ position: 'relative', width: '160px', height: '160px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '3px solid var(--accent-primary)', boxShadow: 'var(--shadow-accent)' }}>
                <img
                  src={photoPreview || defaultAvatarPlaceholder}
                  alt="Profile Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {photoPreview ? 'Custom uploaded profile photo active' : 'Default placeholder photo active'}
              </span>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', width: '100%', marginTop: '0.5rem' }}>
                
                <label className="btn-primary" style={{ cursor: 'pointer', fontSize: '0.85rem' }}>
                  {photoLoading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={16} />}
                  {photoPreview ? 'Change Profile Photo' : 'Upload Profile Photo'}
                  <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoSelect} style={{ display: 'none' }} />
                </label>

                {photoPreview && (
                  <button
                    onClick={handleDeletePhoto}
                    disabled={photoLoading}
                    className="btn-secondary"
                    style={{ color: 'var(--status-error)', borderColor: 'rgba(239, 68, 68, 0.3)', fontSize: '0.85rem' }}
                  >
                    <Trash2 size={16} /> Delete Photo
                  </button>
                )}

              </div>

            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              • Allowed Formats: JPG, JPEG, PNG, WEBP<br />
              • Maximum File Size: 10MB<br />
              • Uploaded photo automatically syncs to your website Hero section.
            </div>

          </div>
        )}

        {/* TAB 2: RESUME MANAGEMENT */}
        {activeTab === 'resume' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {resumeMessage.text && (
              <div style={{ padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', backgroundColor: resumeMessage.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', border: `1px solid ${resumeMessage.type === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`, color: resumeMessage.type === 'error' ? 'var(--status-error)' : 'var(--status-success)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {resumeMessage.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                <span>{resumeMessage.text}</span>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.5rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: 'var(--status-warning)' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>Active Resume PDF</h4>
                  <span style={{ fontSize: '0.85rem', color: resumeUrl ? 'var(--status-success)' : 'var(--text-muted)' }}>
                    {resumeUrl ? `Uploaded: ${resumeFileName || 'Ujjwal_Singh_Resume.pdf'}` : 'No resume uploaded yet'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
                
                <label className="btn-primary" style={{ cursor: 'pointer', fontSize: '0.85rem' }}>
                  {resumeLoading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={16} />}
                  {resumeUrl ? 'Replace Resume (PDF)' : 'Upload Resume (PDF)'}
                  <input type="file" accept="application/pdf,.pdf" onChange={handleResumeSelect} style={{ display: 'none' }} />
                </label>

                {resumeUrl && (
                  <>
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ fontSize: '0.85rem' }}
                    >
                      <Eye size={16} /> View Resume
                    </a>

                    <a
                      href={resumeUrl}
                      download={resumeFileName || 'Ujjwal_Singh_Resume.pdf'}
                      className="btn-secondary"
                      style={{ fontSize: '0.85rem' }}
                    >
                      <Download size={16} /> Download
                    </a>

                    <button
                      onClick={handleDeleteResume}
                      disabled={resumeLoading}
                      className="btn-secondary"
                      style={{ color: 'var(--status-error)', borderColor: 'rgba(239, 68, 68, 0.3)', fontSize: '0.85rem' }}
                    >
                      <Trash2 size={16} /> Delete Resume
                    </button>
                  </>
                )}

              </div>

            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              • Allowed File Type: PDF files only (.pdf)<br />
              • Maximum File Size: 10MB<br />
              • Uploaded resume automatically updates the Hero "Resume" button link.
            </div>

          </div>
        )}

        {/* TAB 3: PERSONAL INFORMATION */}
        {activeTab === 'info' && (
          <form onSubmit={handleInfoSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            
            {infoMessage.text && (
              <div style={{ padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', backgroundColor: infoMessage.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', border: `1px solid ${infoMessage.type === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`, color: infoMessage.type === 'error' ? 'var(--status-error)' : 'var(--status-success)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {infoMessage.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                <span>{infoMessage.text}</span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Full Name *</label>
                <input
                  type="text"
                  value={infoData.name}
                  onChange={(e) => setInfoData({ ...infoData, name: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Professional Title *</label>
                <input
                  type="text"
                  value={infoData.title}
                  onChange={(e) => setInfoData({ ...infoData, title: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Education / Degree *</label>
              <input
                type="text"
                value={infoData.educationDegree}
                onChange={(e) => setInfoData({ ...infoData, educationDegree: e.target.value })}
                placeholder="B.Tech Computer Science Engineering"
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Tagline</label>
              <input
                type="text"
                value={infoData.tagline}
                onChange={(e) => setInfoData({ ...infoData, tagline: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Bio / Hero Description</label>
              <textarea
                rows="3"
                value={infoData.bio}
                onChange={(e) => setInfoData({ ...infoData, bio: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
                Cancel
              </button>
              <button type="submit" disabled={infoLoading} className="btn-primary" style={{ flex: 2 }}>
                {infoLoading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</> : <><RefreshCw size={18} /> Update Personal Info</>}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default ProfileManagementModal;
