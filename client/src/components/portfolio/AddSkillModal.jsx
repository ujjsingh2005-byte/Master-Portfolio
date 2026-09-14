import React, { useState } from 'react';
import { X, Plus, Loader2, Code, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createSkill } from '../../services/api';

const AddSkillModal = ({ isOpen, onClose, onSkillAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    proficiency: 'Advanced'
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
    if (!formData.name.trim()) {
      setError('Skill name is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess(false);

      const res = await createSkill(formData);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          onSkillAdded();
          onClose();
          setFormData({
            name: '',
            category: 'Frontend',
            proficiency: 'Advanced'
          });
          setSuccess(false);
        }, 1000);
      } else {
        setError(res.message || 'Failed to add skill.');
      }
    } catch (err) {
      setError(err.message || 'Failed to add skill. Please check connection.');
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
          maxWidth: '520px',
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
              <Code size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800' }}>Add Technical Skill</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Add new technology to your skill set</span>
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
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '0.5rem' }}>Skill Added!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>New skill has been saved to your portfolio database.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            
            {error && (
              <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', color: 'var(--status-error)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* Skill Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Skill / Technology Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. TypeScript, GraphQL, Docker"
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Category */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="Tools">Tools</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Proficiency Level */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Proficiency Level</label>
              <select
                name="proficiency"
                value={formData.proficiency}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              >
                <option value="Expert">Expert</option>
                <option value="Advanced">Advanced</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Beginner">Beginner</option>
              </select>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
                Cancel
              </button>
              <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 2 }}>
                {loading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Adding...</> : <><Plus size={18} /> Add Skill</>}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default AddSkillModal;
