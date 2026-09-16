import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { getProfile, getSkills } from './services/api';
import Navbar from './components/layout/Navbar';
import Hero from './components/portfolio/Hero';
import About from './components/portfolio/About';
import Skills from './components/portfolio/Skills';
import Projects from './components/portfolio/Projects';
import Education from './components/portfolio/Education';
import Experience from './components/portfolio/Experience';
import Certifications from './components/portfolio/Certifications';
import Contact from './components/portfolio/Contact';
import Footer from './components/layout/Footer';
import ProfileManagementModal from './components/portfolio/ProfileManagementModal';
import AdminLoginModal from './components/admin/AdminLoginModal';
import { ShieldCheck, LogOut, Settings } from 'lucide-react';

function AppContent() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState('photo');
  
  // Admin State
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('isAdminAuthenticated') === 'true';
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  const [skillsLoading, setSkillsLoading] = useState(true);
  const [skillsError, setSkillsError] = useState(null);

  const handleOpenSettings = (tab = 'photo') => {
    if (!isAdmin) {
      setIsAdminLoginOpen(true);
      return;
    }
    setSettingsTab(tab);
    setIsSettingsOpen(true);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdmin(true);
    setIsAdminLoginOpen(false);
    // If URL path is /admin, clear path or hash cleanly
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      window.history.replaceState(null, '', '/');
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    setIsAdmin(false);
    setIsSettingsOpen(false);
  };

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (err) {
      console.error('Failed to load profile data:', err);
    }
  };

  const loadSkills = async () => {
    try {
      setSkillsLoading(true);
      setSkillsError(null);
      const data = await getSkills();
      setSkills(data);
    } catch (err) {
      setSkillsError(err.message || 'Failed to load skills');
    } finally {
      setSkillsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
    loadSkills();

    // Route detection for /admin or #admin
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || path === '/admin/' || hash === '#admin') {
        if (sessionStorage.getItem('isAdminAuthenticated') === 'true') {
          setIsAdmin(true);
        } else {
          setIsAdminLoginOpen(true);
        }
      }
    };

    checkAdminRoute();
    window.addEventListener('popstate', checkAdminRoute);
    return () => window.removeEventListener('popstate', checkAdminRoute);
  }, []);

  return (
    <div className="app-container">
      {/* Top Admin Mode Control Bar */}
      {isAdmin && (
        <div
          style={{
            backgroundColor: 'var(--accent-primary)',
            color: '#ffffff',
            padding: '0.45rem 1rem',
            fontSize: '0.85rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={18} />
            <span>Admin Management Mode Active</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => handleOpenSettings('photo')}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Settings size={14} /> Profile Settings
            </button>

            <button
              onClick={handleAdminLogout}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                color: '#ffffff',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <LogOut size={14} /> Exit Admin Mode
            </button>
          </div>
        </div>
      )}

      <Navbar onOpenSettings={handleOpenSettings} isAdmin={isAdmin} />
      
      <main>
        <Hero profile={profile} onOpenSettings={handleOpenSettings} isAdmin={isAdmin} />
        <About profile={profile} />
        <Skills skills={skills} loading={skillsLoading} error={skillsError} onRetry={loadSkills} isAdmin={isAdmin} />
        <Projects isAdmin={isAdmin} />
        <Education profile={profile} />
        <Experience profile={profile} />
        <Certifications profile={profile} onProfileUpdated={loadProfile} isAdmin={isAdmin} />
        <Contact profile={profile} />
      </main>

      <Footer profile={profile} onOpenAdminLogin={() => setIsAdminLoginOpen(true)} isAdmin={isAdmin} />

      {/* Admin Modals */}
      {isAdmin && (
        <ProfileManagementModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          profile={profile}
          onProfileUpdated={loadProfile}
          initialTab={settingsTab}
        />
      )}

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
