import React, { useState } from 'react';
import { X, Plus, Loader2, GraduationCap, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createEducation } from '../../services/api';

const AddEducationModal = ({ isOpen, onClose, onEducationAdded }) => {
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    duration: '',
    achievements: ''
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
    if (!formData.institution.trim()) {
      setError('Institution name is required');
      return;
    }
    if (!formData.degree.trim()) {
      setError('Degree title is required');
      return;
    }
    if (!formData.fieldOfStudy.trim()) {
      setError('Field of Study is required');
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
        achievements: formData.achievements
          ? formData.achievements.split('\n').map(a => a.trim()).filter(Boolean)
          : []
      };

      const res = await createEducation(payload);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          if (onEducationAdded) onEducationAdded();
          onClose();
          setFormData({
            institution: '',
            degree: '',
            fieldOfStudy: '',
            duration: '',
            achievements: ''
          });
          setSuccess(false);
        }, 1000);
      } else {
        setError(res.message || 'Failed to add education record.');
      }
    } catch (err) {
      setError(err.message || 'Failed to add education. Please check connection.');
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
            <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(99, 102, 241, 0.12)', color: 'var(--accent-primary)' }}>
              <GraduationCap size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800' }}>Add Education Qualification</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Add degrees & academic achievements</span>
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
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '0.5rem' }}>Education Record Added!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>Your new degree / qualification has been saved.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            
            {error && (
              <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', color: 'var(--status-error)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* Degree */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Degree / Program Title *</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="e.g. B.Tech, B.S., Master of Science, Diploma"
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Field of Study */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Field of Study / Major *</label>
              <input
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                placeholder="e.g. Computer Science Engineering (CSE)"
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Institution */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>University / Institution *</label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="e.g. State University of Technology"
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Duration */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Duration / Years *</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 2022 - 2026 or 2024"
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Achievements */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Key Accomplishments (One per line)</label>
              <textarea
                name="achievements"
                rows={3}
                value={formData.achievements}
                onChange={handleChange}
                placeholder="Specialized in Full-Stack Web Development & Data Structures&#10;Lead Developer for Annual Tech Symposium&#10;Ranked Top 5% in Algorithm Design"
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontFamily: 'inherit', resize: 'vertical' }}
              />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
                Cancel
              </button>
              <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 2 }}>
                {loading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Adding...</> : <><Plus size={18} /> Add Education</>}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default AddEducationModal;
