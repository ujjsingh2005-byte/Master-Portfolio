import React, { useState } from 'react';
import { X, Upload, Loader2, Plus, AlertCircle, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { createProject } from '../../services/api';

const samplePresetImages = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1556742049-0a67daf4005a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800'
];

const AddProjectModal = ({ isOpen, onClose, onProjectAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: samplePresetImages[0],
    category: 'Full-Stack',
    technologies: '',
    features: '',
    githubUrl: '',
    liveUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Local File Upload from User's Computer
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Selected file size is too large (maximum 10MB allowed).');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess(false);

      const res = await createProject(formData);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          onProjectAdded();
          onClose();
          setFormData({
            title: '',
            description: '',
            image: samplePresetImages[0],
            category: 'Full-Stack',
            technologies: '',
            features: '',
            githubUrl: '',
            liveUrl: ''
          });
          setSuccess(false);
        }, 1200);
      } else {
        setError(res.message || 'Failed to upload project.');
      }
    } catch (err) {
      setError(err.message || 'Failed to upload project. Please check backend connection.');
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
              <Upload size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Upload New Project</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Upload image file or project details directly to portfolio</span>
            </div>
          </div>

          <button onClick={onClose} aria-label="Close modal" style={{ color: 'var(--text-secondary)' }}>
            <X size={24} />
          </button>
        </div>

        {/* Content Render */}
        {success ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <CheckCircle2 size={54} color="var(--status-success)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Project Uploaded Successfully!</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Your new project has been saved to the database and published on your portfolio.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            
            {error && (
              <div style={{ padding: '0.8rem 1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', color: 'var(--status-error)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* Title & Category */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Project Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. AI Financial Analytics Dashboard"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                >
                  <option value="Full-Stack">Full-Stack</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Description *</label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Explain the purpose, problem solved, and architecture of your project..."
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', resize: 'vertical' }}
              />
            </div>

            {/* Image Upload File Selector & Preview */}
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Project Image / Screenshot
              </label>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                
                {/* File Upload Button */}
                <label
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 1.25rem',
                    backgroundColor: 'var(--accent-primary)',
                    color: '#ffffff',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  <ImageIcon size={18} /> Choose Image File from Device
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </label>

                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>OR enter image URL:</span>
              </div>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
                style={{ width: '100%', marginTop: '0.75rem', padding: '0.55rem 0.85rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
              />

              {/* Image Preview Box */}
              {formData.image && (
                <div style={{ marginTop: '0.75rem', position: 'relative', width: '100%', height: '140px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <img
                    src={formData.image}
                    alt="Uploaded Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{ position: 'absolute', bottom: '6px', left: '8px', padding: '2px 8px', backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.7rem', borderRadius: '4px' }}>
                    Live Preview
                  </span>
                </div>
              )}
            </div>

            {/* Technologies */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Technologies Used (Comma Separated)</label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, Express, MongoDB, Tailwind CSS"
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Features List */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Key Features (One feature per line)</label>
              <textarea
                name="features"
                rows="3"
                value={formData.features}
                onChange={handleChange}
                placeholder="JWT Authentication & Authorization&#10;Real-time dashboard analytics&#10;Stripe payment gateway integration"
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', resize: 'vertical' }}
              />
            </div>

            {/* Links */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>GitHub Repository URL</label>
                <input
                  type="text"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/username/project"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Live Demo URL</label>
                <input
                  type="text"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  placeholder="https://yourproject.example.com"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
                Cancel
              </button>
              <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 2 }}>
                {loading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Uploading Project...</> : <><Plus size={18} /> Save & Publish Project</>}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default AddProjectModal;
