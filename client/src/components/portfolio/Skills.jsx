import React, { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import AddSkillModal from './AddSkillModal';
import { Code, Server, Database, Wrench, Layers, Plus, Trash2, Loader2 } from 'lucide-react';
import { deleteSkill } from '../../services/api';

const categoryIcons = {
  Frontend: Code,
  Backend: Server,
  Database: Database,
  Tools: Wrench,
  All: Layers,
};

const Skills = ({ skills, loading, error, onRetry }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];

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
              Technical Expertise
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: '800', tracking: '-0.025em' }}>
              Skills & Technologies
            </h2>
          </div>

          {/* Add Skill Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}
          >
            <Plus size={18} /> Add Skill
          </button>
        </div>

        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
          Explore the technologies and tools I leverage to build scalable full-stack products.
        </p>

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
              const isDeletingThis = deletingId === skill._id;
              return (
                <div
                  key={skill._id || index}
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)' }}>
                      <CategoryIcon size={20} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-muted)' }}>
                        {skill.proficiency || 'Advanced'}
                      </span>

                      {/* Delete Skill Button */}
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
                        {isDeletingThis ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={16} />}
                      </button>
                    </div>
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
