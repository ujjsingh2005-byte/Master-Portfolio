import React, { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import AddSkillModal from './AddSkillModal';
import { Code, Server, Database, Wrench, Layers, Cpu, Terminal, Plus, Trash2, Loader2, Sparkles } from 'lucide-react';
import { deleteSkill } from '../../services/api';

const categoryIcons = {
  All: Layers,
  Programming: Code,
  Frontend: Terminal,
  Backend: Server,
  Database: Database,
  'AI & ML': Cpu,
  'Tools & Cloud': Wrench,
};

const categories = ['All', 'Programming', 'Frontend', 'Backend', 'Database', 'AI & ML', 'Tools & Cloud'];

const Skills = ({ skills, loading, error, onRetry, isAdmin }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  const handleDeleteSkill = async (skill) => {
    if (window.confirm(`Are you sure you want to delete "${skill.name}"?`)) {
      try {
        setDeletingId(skill._id);
        await deleteSkill(skill._id);
        onRetry();
      } catch (err) {
        alert(err.message || 'Failed to delete skill.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        
        {/* Section Header with Add Skill Action */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge-pill" style={{ marginBottom: '0.75rem' }}>
              <Sparkles size={14} /> Technology Stack
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.025em' }}>
              Skills & Expertise
            </h2>
          </div>

          {/* Add Skill Button (Admin Only) */}
          {isAdmin && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}
            >
              <Plus size={18} /> Add Skill
            </button>
          )}
        </div>

        <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
          A comprehensive ecosystem of programming languages, full-stack frameworks, database systems, AI tools, and deployment environments.
        </p>

        {/* Category Tabs Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.5rem' }}>
          {categories.map((cat) => {
            const IconComponent = categoryIcons[cat] || Layers;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1.15rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  border: isActive ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--bg-card)',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <IconComponent size={15} />
                {cat}
              </button>
            );
          })}
        </div>

        {/* Content States */}
        {loading && <Loader message="Loading technical skills dataset..." />}
        {error && <ErrorMessage message={error} onRetry={onRetry} />}

        {!loading && !error && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {filteredSkills.map((skill, index) => {
              const CategoryIcon = categoryIcons[skill.category] || Code;
              const isDeletingThis = deletingId === skill._id;
              
              // Recruiter Badge Color (Core, Experienced, Familiar)
              const prof = skill.proficiency || 'Core';
              let badgeBg = 'rgba(99, 102, 241, 0.12)';
              let badgeColor = 'var(--accent-primary)';
              if (prof === 'Experienced') {
                badgeBg = 'rgba(6, 182, 212, 0.12)';
                badgeColor = 'var(--accent-secondary)';
              } else if (prof === 'Familiar') {
                badgeBg = 'rgba(148, 163, 184, 0.12)';
                badgeColor = 'var(--text-secondary)';
              }

              return (
                <div
                  key={skill._id || index}
                  className="glass-card"
                  style={{
                    padding: '1.35rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(99, 102, 241, 0.12)', color: 'var(--accent-primary)' }}>
                      <CategoryIcon size={18} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          padding: '0.2rem 0.6rem',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: badgeBg,
                          color: badgeColor
                        }}
                      >
                        {prof}
                      </span>

                      {/* Delete Action (Admin Only) */}
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteSkill(skill)}
                          disabled={isDeletingThis}
                          aria-label={`Delete ${skill.name}`}
                          title={`Delete ${skill.name}`}
                          style={{
                            color: 'var(--status-error)',
                            padding: '0.2rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            opacity: isDeletingThis ? 0.4 : 0.75,
                            transition: 'opacity var(--transition-fast)'
                          }}
                        >
                          {isDeletingThis ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={15} />}
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.2rem' }}>
                      {skill.name}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {skill.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Add Skill Modal */}
      <AddSkillModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSkillAdded={onRetry}
      />
    </section>
  );
};

export default Skills;
