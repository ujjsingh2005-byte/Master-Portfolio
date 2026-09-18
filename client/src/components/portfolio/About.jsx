import React from 'react';
import SectionHeader from '../common/SectionHeader';
import { Target, Compass, Zap, GraduationCap, Laptop, Rocket, Award, MapPin, Crosshair } from 'lucide-react';

const quickFacts = [
  { icon: GraduationCap, title: 'Education', desc: 'B.Tech CSE (AKTU, Lucknow)' },
  { icon: Laptop, title: 'Development', desc: 'Full-Stack Web & AI Systems' },
  { icon: Rocket, title: 'Featured Work', desc: '4 Deployed Production Projects' },
  { icon: Award, title: 'Achievements', desc: 'CatalystHack GFG & IBM SkillsBuild' },
  { icon: MapPin, title: 'Location', desc: 'Lucknow, Uttar Pradesh, India' },
  { icon: Crosshair, title: 'Career Focus', desc: 'Scalable Microservices & AI' },
];

const About = ({ profile }) => {
  const journey = profile?.journey || "Started coding during Computer Science Engineering studies and fell in love with creating end-to-end software solutions. Spent the last 3+ years engineering user-centric web applications and REST microservices.";
  const careerGoals = profile?.careerGoals || "Aiming to lead high-impact engineering projects, contribute to open-source software, and push the boundaries of modern full-stack web technologies.";
  const strengths = profile?.strengths || [
    "Data Structures and Algorithms",
    "Digital Electronics",
    "Algorithms Analysis",
    "Database Management",
    "Artificial Intelligence",
    "Discrete Mathematics",
    "Systems Programming",
    "Computer Organisation and Architecture"
  ];

  return (
    <section id="about" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <SectionHeader
          badge="Background & Mindset"
          title="About Me"
          subtitle="Discover my engineering journey, technical foundation, and core professional goals."
        />

        {/* 2 Column Layout */}
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3rem', alignItems: 'start' }}>
          
          {/* Left Column: Narrative & Goals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '2rem', borderTop: '2px solid var(--accent-emerald)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(53, 208, 127, 0.12)', color: 'var(--accent-emerald)' }}>
                  <Compass size={22} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>Developer Journey</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>
                {journey}
              </p>
            </div>

            <div className="glass-card" style={{ padding: '2rem', borderTop: '2px solid var(--accent-champagne)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(232, 201, 139, 0.12)', color: 'var(--accent-champagne)' }}>
                  <Target size={22} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>Career Vision</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>
                {careerGoals}
              </p>
            </div>

            {/* Coursework & Strengths */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(53, 208, 127, 0.12)', color: 'var(--accent-emerald)' }}>
                  <Zap size={22} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>Relevant Coursework & Strengths</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {strengths.map((item, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '0.4rem 0.85rem',
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Quick Facts Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Quick Overview
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {quickFacts.map((fact, idx) => {
                const IconComponent = fact.icon;
                return (
                  <div
                    key={idx}
                    className="glass-card"
                    style={{
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ padding: '0.55rem', width: 'fit-content', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(53, 208, 127, 0.12)', color: 'var(--accent-emerald)' }}>
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.2rem', color: 'var(--text-primary)' }}>{fact.title}</h4>
                      <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>{fact.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;

