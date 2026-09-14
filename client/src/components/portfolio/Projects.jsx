import React, { useState, useEffect } from 'react';
import SectionHeader from '../common/SectionHeader';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import AddProjectModal from './AddProjectModal';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import { Search, RefreshCw, Plus } from 'lucide-react';
import { getProjects, deleteProject } from '../../services/api';

const categories = ['All', 'Full-Stack', 'Frontend', 'Backend'];

const Projects = () => {
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
              Featured Engineering Works
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: '800', tracking: '-0.025em' }}>
              Projects Showcase
            </h2>
          </div>

          {/* Upload / Add Project Action Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}
          >
            <Plus size={18} /> Upload Project
          </button>
        </div>

        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
          Explore full-stack software applications built with modern frontend frameworks, backend microservices, and databases.
        </p>

        {/* Search & Category Filter Control Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            
            {/* Search Input */}
            <div style={{ position: 'relative', flex: '1', minWidth: '260px', maxWidth: '420px' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search projects by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem 0.65rem 2.6rem',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--text-primary)',
                  fontSize: '0.925rem'
                }}
              />
            </div>

            {/* Category Filter Buttons */}
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
                      border: isActive ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                      backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--bg-card)',
                      color: isActive ? '#ffffff' : 'var(--text-secondary)',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

          </div>

        </div>

        {/* Content Render States */}
        {loading && <Loader message="Fetching projects from REST API..." />}
        {error && <ErrorMessage message={error} onRetry={fetchProjectsData} />}

        {!loading && !error && projects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '1.1rem' }}>No projects match your search query or filter criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              style={{ marginTop: '1rem', color: 'var(--accent-primary)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
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
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
        )}

      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onDelete={handleDeleteProject}
      />

      {/* Upload Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProjectAdded={fetchProjectsData}
      />
    </section>
  );
};

export default Projects;
