import React from 'react';
import SectionHeader from '../common/SectionHeader';
import { ExternalLink, ShieldCheck } from 'lucide-react';

const Certifications = ({ profile }) => {
  const certifications = profile?.certifications || [
    {
      name: "AWS Certified Developer – Associate",
      organization: "Amazon Web Services",
      date: "2024",
      certificateUrl: "#",
      icon: "Award"
    },
    {
      name: "MongoDB Certified Developer Associate",
      organization: "MongoDB Inc.",
      date: "2024",
      certificateUrl: "#",
      icon: "Database"
    },
    {
      name: "Meta Front-End Developer Specialization",
      organization: "Meta / Coursera",
      date: "2023",
      certificateUrl: "#",
      icon: "Code"
    }
  ];

  return (
    <section id="certifications" className="section">
      <div className="container">
        <SectionHeader
          badge="Verified Credentials"
          title="Certifications & Badges"
          subtitle="Industry qualifications and specialized technical certifications."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {certifications.map((cert, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: 'var(--status-success)' }}>
                    <ShieldCheck size={22} />
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                    Issued {cert.date}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                  {cert.name}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  {cert.organization}
                </p>
              </div>

              <a
                href={cert.certificateUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--accent-primary)',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-color)'
                }}
              >
                Verify Credential <ExternalLink size={15} />
              </a>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certifications;
