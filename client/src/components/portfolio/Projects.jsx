import React, { useState, useEffect } from 'react';
import SectionHeader from '../common/SectionHeader';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import AddProjectModal from './AddProjectModal';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import { Search, RefreshCw, Plus, FolderGit2 } from 'lucide-react';
import { getProjects, deleteProject } from '../../services/api';

const categories = ['All', 'Full-Stack', 'AI & Web', 'Frontend', 'Backend'];

const Projects = ({ isAdmin }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchProjectsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProjects({ category: selectedCategory, search: searchQuery });
      setProjects(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      await fetchProjectsData();
    } catch (err) {
      alert(err.message || 'Failed to delete project.');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProjectsData();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        
        {/* Header Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem' }}>
          <div>
            <span className="badge-pill" style={{ marginBottom: '0.75rem' }}>
              <FolderGit2 size={14} /> Production Showcase
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>
              Featured Projects
            </h2>
          </div>

          {/* Upload / Add Project Action Button (Admin Only) */}
          {isAdmin && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Plus size={18} /> Upload Project
            </button>
          )}
        </div>

        <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Production-grade full-stack applications, intelligent AI platforms, and secure web microservices deployed live.
        </p>

        {/* Filter & Search Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
          
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1', minWidth: '260px', maxWidth: '420px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by title, tech stack or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 1rem 0.65rem 2.6rem',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem'
              }}
            />
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.5rem 1.1rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    border: isActive ? '1px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                    backgroundColor: isActive ? 'var(--accent-emerald)' : 'var(--bg-card)',
                    color: isActive ? '#0D0F0E' : 'var(--text-secondary)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Content Render States */}
        {loading && <Loader message="Fetching live project showcase..." />}
        {error && <ErrorMessage message={error} onRetry={fetchProjectsData} />}

        {!loading && !error && projects.length === 0 && (
          <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>No projects match your search query or filter criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="btn-secondary"
            >
              <RefreshCw size={16} /> Reset Filters
            </button>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2rem'
            }}
          >
            {projects.map((proj) => (
              <ProjectCard
                key={proj._id || proj.title}
                project={proj}
                onSelect={(selected) => setSelectedProject(selected)}
                onDelete={isAdmin ? handleDeleteProject : undefined}
              />
            ))}
          </div>
        )}

      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onDelete={isAdmin ? handleDeleteProject : undefined}
      />

      {/* Upload Project Modal */}
      {isAdmin && (
        <AddProjectModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onProjectAdded={fetchProjectsData}
        />
      )}
    </section>
  );
};

export default Projects;

