import React, { useState } from 'react';
import { X, Plus, Loader2, Briefcase, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createExperience } from '../../services/api';

const AddExperienceModal = ({ isOpen, onClose, onExperienceAdded }) => {
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    duration: '',
    location: 'Remote',
    responsibilities: '',
    technologies: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role.trim()) {
      setError('Job role / title is required');
      return;
    }
    if (!formData.company.trim()) {
      setError('Company / organization is required');
      return;
    }
    if (!formData.duration.trim()) {
      setError('Duration / Years is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess(false);

      const payload = {
        ...formData,
        responsibilities: formData.responsibilities
          ? formData.responsibilities.split('\n').map(r => r.trim()).filter(Boolean)
          : [],
        technologies: formData.technologies
          ? formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
          : []
      };

      const res = await createExperience(payload);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          if (onExperienceAdded) onExperienceAdded();
          onClose();
          setFormData({
            role: '',
            company: '',
            duration: '',
            location: 'Remote',
            responsibilities: '',
            technologies: ''
          });
          setSuccess(false);
        }, 1000);
      } else {
        setError(res.message || 'Failed to add work experience.');
      }
    } catch (err) {
      setError(err.message || 'Failed to add work experience. Please check connection.');
    } finally {
      setLoading(false);
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
          maxWidth: '540px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-secondary)',
          position: 'relative',
          padding: '2rem',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(6, 182, 212, 0.12)', color: 'var(--accent-secondary)' }}>
              <Briefcase size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800' }}>Add Professional Experience</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Add software engineering roles & achievements</span>
            </div>
          </div>

          <button onClick={onClose} aria-label="Close modal" style={{ color: 'var(--text-secondary)' }}>
            <X size={22} />
          </button>
        </div>

        {/* Form Body */}
        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle2 size={48} color="var(--status-success)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '0.5rem' }}>Experience Record Added!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>Your work history has been updated.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            
            {error && (
              <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', color: 'var(--status-error)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* Role */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Role / Job Title *</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Full-Stack Developer, Frontend Engineer Intern"
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Company */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Company / Organization *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Apex Tech Innovations, CloudScale Labs"
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Duration */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Duration / Dates *</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 2024 - Present, Jan 2023 - Dec 2023"
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Location */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Remote, San Francisco CA, India"
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Responsibilities */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Key Responsibilities & Achievements (One per line)</label>
              <textarea
                name="responsibilities"
                rows={3}
                value={formData.responsibilities}
                onChange={handleChange}
                placeholder="Engineered responsive React micro-frontends&#10;Designed and implemented RESTful microservices using Node.js & Express&#10;Improved API performance by 35%"
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontFamily: 'inherit', resize: 'vertical' }}
              />
            </div>

            {/* Technologies */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Technologies Used (Comma separated)</label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, Express, MongoDB, Tailwind CSS, Git"
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
                Cancel
              </button>
              <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 2 }}>
                {loading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Adding...</> : <><Plus size={18} /> Add Experience</>}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default AddExperienceModal;
