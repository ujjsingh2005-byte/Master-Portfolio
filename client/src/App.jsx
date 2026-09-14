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

function AppContent() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState('photo');
  
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [skillsError, setSkillsError] = useState(null);

  const handleOpenSettings = (tab = 'photo') => {
    setSettingsTab(tab);
    setIsSettingsOpen(true);
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
  }, []);

  return (
    <div className="app-container">
      <Navbar onOpenSettings={handleOpenSettings} />
      <main>
        <Hero profile={profile} onOpenSettings={handleOpenSettings} />
        <About profile={profile} />
        <Skills skills={skills} loading={skillsLoading} error={skillsError} onRetry={loadSkills} />
        <Projects />
        <Education profile={profile} />
        <Experience profile={profile} />
        <Certifications profile={profile} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />

      <ProfileManagementModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profile={profile}
        onProfileUpdated={loadProfile}
        initialTab={settingsTab}
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
