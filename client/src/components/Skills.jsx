import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { Code, Server, Database, Wrench, Layers } from 'lucide-react';

const categoryIcons = {
  Frontend: Code,
  Backend: Server,
  Database: Database,
  Tools: Wrench,
  All: Layers,
};

const Skills = ({ skills, loading, error, onRetry }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader
          badge="Technical Expertise"
          title="Skills & Technologies"
          subtitle="Explore the technologies and tools I leverage to build scalable full-stack products."
        />

        {/* Category Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {categories.map((cat) => {
            const Icon = categoryIcons[cat] || Layers;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  border: isActive ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--bg-card)',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Icon size={16} />
                {cat}
              </button>
            );
          })}
        </div>

        {/* Content States */}
        {loading && <Loader message="Fetching skill dataset from API..." />}
        {error && <ErrorMessage message={error} onRetry={onRetry} />}

        {!loading && !error && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {filteredSkills.map((skill, index) => {
              const CategoryIcon = categoryIcons[skill.category] || Code;
              return (
                <div
                  key={skill._id || index}
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)' }}>
                      <CategoryIcon size={20} />
                    </div>
                    <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-muted)' }}>
                      {skill.proficiency || 'Advanced'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                    {skill.name}
                  </h3>

                  <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    {skill.category}
                  </span>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default Skills;
