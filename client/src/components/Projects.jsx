import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { getProjects } from '../services/api';

const categories = ['All', 'Full-Stack', 'Frontend', 'Backend'];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProjectsData();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <SectionHeader
          badge="Featured Engineering Works"
          title="Projects Showcase"
          subtitle="Explore full-stack software applications built with modern frontend frameworks, backend microservices, and databases."
        />

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
              />
            ))}
          </div>
        )}

      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
