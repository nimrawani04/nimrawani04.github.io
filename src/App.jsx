import React, { useState, useEffect, useCallback } from 'react';
import HomeScreen from './components/HomeScreen';
import WorldScreen from './components/WorldScreen';
import ProjectScreen from './components/ProjectScreen';
import { projects } from './data';
import { playExplore, playAchievement, startMusic, stopMusic } from './utils/audio';

function App() {
  const [screen, setScreen] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [xp, setXp] = useState(0);
  const [coins, setCoins] = useState(120);
  const [visited, setVisited] = useState(new Set());
  const [viewedProjects, setViewedProjects] = useState(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState(new Set());
  const [character, setCharacter] = useState(localStorage.getItem('selectedCharacter') || '/nimra-character.png');
  const [notifications, setNotifications] = useState([]);
  const [sfxEnabled, setSfxEnabled] = useState(() => localStorage.getItem('sfx') !== 'false');
  const [musicEnabled, setMusicEnabled] = useState(() => localStorage.getItem('music') !== 'false');

  const level = Math.floor(xp / 100) + 1;
  const currentXp = xp % 100;

  // Music control
  useEffect(() => {
    if (musicEnabled && screen === 'world') startMusic();
    else stopMusic();
    return () => stopMusic();
  }, [musicEnabled, screen]);

  const toggleMusic = useCallback(() => {
    setMusicEnabled(prev => {
      const next = !prev;
      localStorage.setItem('music', String(next));
      return next;
    });
  }, []);

  const toggleSfx = useCallback(() => {
    setSfxEnabled(prev => {
      const next = !prev;
      localStorage.setItem('sfx', String(next));
      return next;
    });
  }, []);

  const addNotification = useCallback((text, type = 'xp') => {
    const id = Date.now() + Math.random();
    setNotifications(prev => [...prev, { id, text, type }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  }, []);

  const updateCharacter = useCallback((newChar) => {
    setCharacter(newChar);
    localStorage.setItem('selectedCharacter', newChar);
    addNotification('CHARACTER UPDATED!', 'achievement');
  }, [addNotification]);

  const unlockAchievement = useCallback((id, text) => {
    setUnlockedAchievements(prev => {
      if (prev.has(id)) return prev;
      const next = new Set([...prev, id]);
      setXp(p => p + 100);
      setCoins(p => p + 50);
      addNotification(text, 'achievement');
      if (sfxEnabled) playAchievement();
      return next;
    });
  }, [addNotification, sfxEnabled]);

  const handleExplore = useCallback((zone) => {
    setVisited(prev => {
      if (prev.has(zone)) return prev;
      const next = new Set([...prev, zone]);
      setXp(p => p + 20);
      setCoins(p => p + 10);
      addNotification(`EXPLORED ${zone.toUpperCase()}! +20 XP`, 'xp');
      if (sfxEnabled) playExplore();
      if (zone === 'experience') unlockAchievement('checked_experience', '🏅 ACHIEVEMENT: Checked Experience');
      if (next.size >= 5) unlockAchievement('master_explorer', '🌟 ACHIEVEMENT: Master Explorer');
      return next;
    });
  }, [unlockAchievement, addNotification, sfxEnabled]);

  const goHome = useCallback(() => setScreen('home'), []);
  const goWorld = useCallback(() => setScreen('world'), []);

  const goProject = useCallback((project) => {
    setSelectedProject(project);
    setScreen('project');
    setViewedProjects(prev => {
      if (prev.has(project.name)) return prev;
      const next = new Set([...prev, project.name]);
      setXp(p => p + 50);
      setCoins(p => p + 20);
      addNotification(`PROJECT VIEWED: ${project.name}! +50 XP`, 'xp');
      if (next.size >= projects.length) unlockAchievement('viewed_all_projects', '🎓 ACHIEVEMENT: Viewed All Projects');
      return next;
    });
    setVisited(prev => new Set([...prev, 'projects']));
  }, [unlockAchievement, addNotification]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Enter' && screen === 'home') goWorld();
      if (e.key === 'Escape' && screen === 'project') goWorld();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [screen, goWorld, goHome]);

  return (
    <>
      <div className="notifications-container">
        {notifications.map(n => (
          <div key={n.id} className={`notification ${n.type}`}>
            {n.type === 'xp' ? '✨' : '🏆'} {n.text}
          </div>
        ))}
      </div>

      <div className={`screen ${screen === 'home' ? 'active' : ''}`}>
        <HomeScreen
          onStart={goWorld}
          onAbout={() => setShowAbout(true)}
          character={character}
          onCharacterChange={updateCharacter}
        />
      </div>

      <div className={`screen ${screen === 'world' ? 'active' : ''}`}>
        <WorldScreen
          onReturn={goHome}
          onProject={goProject}
          onExplore={handleExplore}
          xp={currentXp}
          level={level}
          coins={coins}
          visited={visited}
          viewedProjects={viewedProjects}
          character={character}
          onCharacterChange={updateCharacter}
          sfxEnabled={sfxEnabled}
          musicEnabled={musicEnabled}
          onToggleSfx={toggleSfx}
          onToggleMusic={toggleMusic}
          unlockedAchievements={unlockedAchievements}
        />
      </div>

      <div className={`screen ${screen === 'project' ? 'active' : ''}`}>
        <ProjectScreen
          project={selectedProject}
          onBack={goWorld}
          onWorld={goWorld}
          xp={currentXp}
          level={level}
          coins={coins}
          character={character}
        />
      </div>

      {showAbout && (
        <div className="about-modal" onClick={e => { if (e.target === e.currentTarget) setShowAbout(false); }}>
          <div className="about-content">
            <h2>👤 About Nimra Wani</h2>
            <p>I'm a web developer with a passion for creating dynamic, responsive, and visually engaging digital experiences.</p>
            <p>Beyond web development, I'm deeply interested in AI and Machine Learning, studying algorithms, neural networks, and data-driven models.</p>
            <p>At the foundation of my work is a strong enthusiasm for mathematical innovation, combining web development, AI, and mathematics to build intelligent technologies.</p>
            <button className="about-close" onClick={() => setShowAbout(false)}>CLOSE ✕</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
