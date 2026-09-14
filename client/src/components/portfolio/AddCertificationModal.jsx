import React, { useState } from 'react';
import { X, Plus, Loader2, Award, ShieldCheck, Database, Server, Code, FileBadge, Cpu, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createCertification } from '../../services/api';

const iconOptions = [
  { label: 'Award Badge', value: 'Award', Icon: Award },
  { label: 'Verified Shield', value: 'ShieldCheck', Icon: ShieldCheck },
  { label: 'Database', value: 'Database', Icon: Database },
  { label: 'Server & Cloud', value: 'Server', Icon: Server },
  { label: 'Engineering Code', value: 'Code', Icon: Code },
  { label: 'Certificate File', value: 'FileBadge', Icon: FileBadge },
  { label: 'Hardware & AI', value: 'Cpu', Icon: Cpu },
];

const AddCertificationModal = ({ isOpen, onClose, onCertificationAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    date: new Date().getFullYear().toString(),
    certificateUrl: '',
    icon: 'Award'
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
      setError('Certification name is required');
      return;
    }
    if (!formData.organization.trim()) {
      setError('Issuing organization is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess(false);

      const res = await createCertification(formData);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          if (onCertificationAdded) onCertificationAdded();
          onClose();
          setFormData({
            name: '',
            organization: '',
            date: new Date().getFullYear().toString(),
            certificateUrl: '',
            icon: 'Award'
          });
          setSuccess(false);
        }, 1000);
      } else {
        setError(res.message || 'Failed to add certification.');
      }
    } catch (err) {
      setError(err.message || 'Failed to add certification. Please check backend connection.');
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
              <Award size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800' }}>Add Certification or Badge</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Add verified credentials to your portfolio</span>
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
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '0.5rem' }}>Certification Added!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>Your new credential has been saved to your profile.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            
            {error && (
              <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', color: 'var(--status-error)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* Certification Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Certification / Badge Title *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. AWS Certified Developer – Associate"
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Issuing Organization */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Issuing Organization *</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="e.g. Amazon Web Services, MongoDB Inc., Google"
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Issue Date / Year */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Issue Date / Year *</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="e.g. 2024 or Issued 2024"
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Credential Verification URL */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Credential Verification URL (Optional)</label>
              <input
                type="text"
                name="certificateUrl"
                value={formData.certificateUrl}
                onChange={handleChange}
                placeholder="https://credential-verification-link.com or #"
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Badge Icon Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Badge Icon</label>
              <select
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              >
                {iconOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
                Cancel
              </button>
              <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 2 }}>
                {loading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Adding...</> : <><Plus size={18} /> Add Certification</>}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default AddCertificationModal;
