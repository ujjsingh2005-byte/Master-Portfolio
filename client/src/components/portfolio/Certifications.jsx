import React, { useState } from 'react';
import { ExternalLink, ShieldCheck, Plus, Trash2, Loader2, Award, Database, Server, Code, FileBadge, Cpu, X, Eye } from 'lucide-react';
import AddCertificationModal from './AddCertificationModal';
import { deleteCertification } from '../../services/api';

const iconMap = {
  Award: Award,
  ShieldCheck: ShieldCheck,
  Database: Database,
  Server: Server,
  Code: Code,
  FileBadge: FileBadge,
  Cpu: Cpu
};

const defaultCertImages = {
  "AI Tools & Claude Workshop": "/certificates/be10x_ai_tools_certificate.jpg",
  "IBM SkillsBuild AI Automation & Intelligent Solutions Internship": "/certificates/ibm_skillsbuild_certificate.jpg",
  "HackIndia 2026 - Web3 & AI Hackathon": "/certificates/hackindia_2026_certificate.jpg"
};

const Certifications = ({ profile, onProfileUpdated, isAdmin }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [previewCert, setPreviewCert] = useState(null);

  const certifications = profile?.certifications || [];

  const handleDeleteCert = async (cert) => {
    const identifier = cert._id || cert.name;
    if (window.confirm(`Are you sure you want to delete "${cert.name}"?`)) {
      try {
        setDeletingId(identifier);
        await deleteCertification(identifier);
        if (onProfileUpdated) onProfileUpdated();
      } catch (err) {
        alert(err.message || 'Failed to delete certification.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleVerifyClick = (e, cert) => {
    const imgUrl = cert.certificateUrl && cert.certificateUrl !== '#'
      ? cert.certificateUrl
      : defaultCertImages[cert.name];

    if (imgUrl && imgUrl !== '#') {
      if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) {
        window.open(imgUrl, '_blank', 'noopener,noreferrer');
      } else {
        e.preventDefault();
        setPreviewCert({ ...cert, imageUrl: imgUrl });
      }
    } else {
      e.preventDefault();
      const fallbackImg = defaultCertImages[cert.name];
      if (fallbackImg) {
        setPreviewCert({ ...cert, imageUrl: fallbackImg });
      } else {
        alert(`Verification details for "${cert.name}" (${cert.organization}) are on record.`);
      }
    }
  };

  return (
    <section id="certifications" className="section">
      <div className="container">
        
        {/* Section Header with Add Action */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <span
              style={{
                display: 'inline-block',
                padding: '0.35rem 1rem',
                marginBottom: '0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--accent-primary)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid var(--border-active)',
                borderRadius: 'var(--radius-full)'
              }}
            >
              Verified Credentials
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: '800', tracking: '-0.025em' }}>
              Certifications & Badges
            </h2>
          </div>

          {isAdmin && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}
            >
              <Plus size={18} /> Add Certification
            </button>
          )}
        </div>

        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
          Industry qualifications and specialized technical certifications.
        </p>

        {certifications.length === 0 ? (
          <div className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Award size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>No Certifications Added Yet</h3>
            {isAdmin ? (
              <>
                <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>Click "Add Certification" above to display your verified badges and credentials.</p>
                <button onClick={() => setIsAddModalOpen(true)} className="btn-primary">
                  <Plus size={16} /> Add First Certification
                </button>
              </>
            ) : (
              <p style={{ fontSize: '0.9rem' }}>Check back soon for updated credentials and certifications.</p>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {certifications.map((cert, idx) => {
              const CertIcon = iconMap[cert.icon] || ShieldCheck;
              const identifier = cert._id || cert.name || idx;
              const isDeletingThis = deletingId === identifier;

              return (
                <div key={identifier} className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: 'var(--status-success)' }}>
                        <CertIcon size={22} />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                          Issued {cert.date}
                        </span>

                        {/* Delete Certification Button */}
                        {isAdmin && (
                          <button
                            onClick={() => handleDeleteCert(cert)}
                            disabled={isDeletingThis}
                            aria-label={`Delete ${cert.name}`}
                            title={`Delete ${cert.name}`}
                            style={{
                              color: 'var(--status-error)',
                              padding: '0.25rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              opacity: isDeletingThis ? 0.4 : 0.75,
                              transition: 'opacity var(--transition-fast)',
                              cursor: 'pointer'
                            }}
                          >
                            {isDeletingThis ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={17} />}
                          </button>
                        )}
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                      {cert.name}
                    </h3>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                      {cert.organization}
                    </p>
                  </div>

                  <button
                    onClick={(e) => handleVerifyClick(e, cert)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: 'var(--accent-primary)',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid var(--border-color)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    Verify Credential <ExternalLink size={15} />
                  </button>

                </div>
              );
            })}
          </div>
        )}

        {/* Certificate Image Lightbox Modal */}
        {previewCert && (
          <div
            onClick={() => setPreviewCert(null)}
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
                maxHeight: '90vh',
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
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{previewCert.name}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Issued by {previewCert.organization} • {previewCert.date}</span>
                </div>

                <button
                  onClick={() => setPreviewCert(null)}
                  style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', textAlign: 'center', backgroundColor: '#0f172a', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={previewCert.imageUrl}
                  alt={previewCert.name}
                  style={{ maxWidth: '100%', maxHeight: '65vh', objectFit: 'contain', borderRadius: 'var(--radius-sm)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                <a
                  href={previewCert.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}
                >
                  <Eye size={16} /> Open Full Size Image
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Add Certification Modal */}
        <AddCertificationModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onCertificationAdded={onProfileUpdated}
        />

      </div>
    </section>
  );
};

export default Certifications;
