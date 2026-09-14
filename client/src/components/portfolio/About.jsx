import React from 'react';
import SectionHeader from '../common/SectionHeader';
import { Target, Compass, Zap, Code2 } from 'lucide-react';

const About = ({ profile }) => {
  const bio = profile?.bio || "Passionate Full-Stack Developer with expertise in React, Node.js, Express, and MongoDB.";
  const journey = profile?.journey || "Started coding during computer science studies and fell in love with creating end-to-end software solutions.";
  const careerGoals = profile?.careerGoals || "Aiming to lead high-impact engineering projects, contribute to open-source software, and push web tech limits.";
  const strengths = profile?.strengths || ["System Architecture", "REST API Design", "Responsive UI/UX", "Performance Tuning"];
  const techInterest = profile?.technologiesOfInterest || ["TypeScript", "GraphQL", "Docker", "Serverless"];

  return (
    <section id="about" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <SectionHeader
          badge="Background & Vision"
          title="About Me"
          subtitle="Get to know my engineering journey, technical mindset, and core goals."
        />

        {/* 2 Grid Cards: Journey & Goals */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)' }}>
                <Compass size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Developer Journey</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {journey}
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-secondary)' }}>
                <Target size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Career Goals</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {careerGoals}
            </p>
          </div>
        </div>

        {/* Strengths & Tech Focus */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Strengths */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--status-success)' }}>
                <Zap size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Personal Strengths</h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {strengths.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies of Interest */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: 'var(--status-warning)' }}>
                <Code2 size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Emerging Tech Focus</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {techInterest.map((tech, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: 'var(--text-primary)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          #about div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
