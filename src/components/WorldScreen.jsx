import React, { useState, useRef, useEffect } from 'react';
import { projects, achievements, certificates, experience, education } from '../data';
import { playClick, playStep, playQuestOpen, playSelect } from '../utils/audio';

// Zone positions matched to actual buildings in the map image
const ZONES = [
  { key:'projects', name:'PROJECTS CITY', icon:'🏰', x:18, y:18, color:'#6366f1', glowSize:120 },
  { key:'achievements', name:'ACHIEVEMENT ARENA', icon:'🏆', x:78, y:16, color:'#f59e0b', glowSize:110 },
  { key:'certificates', name:'CERTIFICATES TOWER', icon:'🔮', x:42, y:42, color:'#a855f7', glowSize:130 },
  { key:'experience', name:'EXPERIENCE VALLEY', icon:'🏘️', x:22, y:75, color:'#4ade80', glowSize:100 },
  { key:'education', name:'EDUCATION KEEP', icon:'🏯', x:78, y:68, color:'#3b82f6', glowSize:120 },
];

const CHARACTERS = [
  { path:'/nimra-character.png', label:'Classic' },
  { path:'/chr1.png', label:'Knight' },
  { path:'/chr2.png', label:'Adventurer' },
];

const TECH_MAP = {
  'HTML':'html','CSS':'css','JavaScript':'js','React':'react','TypeScript':'ts',
  'Supabase':'supabase','PostgreSQL':'postgres','Vercel':'vercel','Web3Forms':'js',
  'PWA':'nextjs','Arduino':'arduino','C++':'cpp','Infrared Sensors':'arduino','Ultrasonic Sensors':'arduino','Dataflow':'js'
};

export default function WorldScreen({
  onReturn, onProject, onExplore, xp, level, coins, visited, viewedProjects,
  character, onCharacterChange, sfxEnabled, musicEnabled, onToggleSfx, onToggleMusic,
  unlockedAchievements
}) {
  const [modal, setModal] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [minimapOpen, setMinimapOpen] = useState(false);
  const [sidebarTab, setSidebarTab] = useState('quests');
  const [playerPos, setPlayerPos] = useState({ x:42, y:58 });
  const [hoverZone, setHoverZone] = useState(null);
  const [questFilter, setQuestFilter] = useState('ALL');
  const mapRef = useRef(null);
  const keysPressed = useRef(new Set());

  const totalZones = 5;
  const visitedCount = visited ? visited.size : 0;
  const progress = Math.round((visitedCount / totalZones) * 100);
  const unexplored = ZONES.filter(z => !visited.has(z.key));

  // WASD + Arrow key movement
  useEffect(() => {
    const SPEED = 0.5;
    function onDown(e) {
      const k = e.key.toLowerCase();
      if (['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright'].includes(k)) {
        e.preventDefault(); keysPressed.current.add(k);
      }
    }
    function onUp(e) { keysPressed.current.delete(e.key.toLowerCase()); }
    function loop() {
      const keys = keysPressed.current;
      if (keys.size === 0) return;
      setPlayerPos(prev => {
        let {x,y} = prev;
        if (keys.has('w')||keys.has('arrowup')) y = Math.max(3, y-SPEED);
        if (keys.has('s')||keys.has('arrowdown')) y = Math.min(97, y+SPEED);
        if (keys.has('a')||keys.has('arrowleft')) x = Math.max(3, x-SPEED);
        if (keys.has('d')||keys.has('arrowright')) x = Math.min(97, x+SPEED);
        if (x!==prev.x||y!==prev.y) { if (sfxEnabled) playStep(); return {x,y}; }
        return prev;
      });
    }
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    const iv = setInterval(loop, 40);
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); clearInterval(iv); };
  }, [sfxEnabled]);

  function handleZoneClick(key, e) {
    e.stopPropagation();
    if (sfxEnabled) playQuestOpen();
    setModal(key);
    if (onExplore) onExplore(key);
  }

  function handleMapClick(e) {
    if (!mapRef.current) return;
    const r = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX-r.left)/r.width)*100, y = ((e.clientY-r.top)/r.height)*100;
    setPlayerPos({ x:Math.max(3,Math.min(97,x)), y:Math.max(3,Math.min(97,y)) });
    if (sfxEnabled) playClick();
  }

  function handleProjectExplore(p) {
    if (sfxEnabled) playSelect();
    setModal(null);
    onProject(p);
  }

  const filteredProjects = projects.filter(p => {
    if (questFilter === 'ALL') return true;
    if (questFilter === 'WEB') return !['bis-ai','rasta-ai','smart-house'].includes(p.id);
    if (questFilter === 'AI') return ['bis-ai','rasta-ai'].includes(p.id);
    if (questFilter === 'IOT') return p.id === 'smart-house';
    return true;
  });

  return (
    <div className="world-screen">
      {/* ===== SIDEBAR ===== */}
      <div className="world-sidebar">
        <div className="sidebar-avatar-box">
          <div className="sidebar-avatar-img"><img src={character} alt="avatar" /></div>
          <div className="sidebar-player-info">
            <span className="sidebar-name">NIMRA</span>
            <span className="sidebar-lvl">LVL {level} • 🪙 {coins}</span>
          </div>
        </div>
        <div className="sidebar-tabs">
          {[['quests','⚔️'],['projects','🏙️'],['stats','📊'],['legend','🗺️']].map(([t,ic]) => (
            <button key={t} className={sidebarTab===t?'active':''} onClick={()=>setSidebarTab(t)}>{ic}</button>
          ))}
        </div>
        <div className="sidebar-scroll">
          {sidebarTab==='quests' && (
            <div className="sidebar-tab-content">
              <h4>⚔️ ACTIVE QUESTS</h4>
              {unexplored.length===0 ? <div className="quest-complete-msg">🌟 All explored!</div> :
                unexplored.map(z => (
                  <div key={z.key} className="quest-row" onClick={(e)=>handleZoneClick(z.key,e)}>
                    <span className="quest-icon">{z.icon}</span>
                    <div className="quest-info"><span className="quest-name">Explore {z.name}</span><span className="quest-reward">+20 XP • +10 🪙</span></div>
                  </div>
                ))
              }
              <h4 style={{marginTop:12}}>✅ COMPLETED</h4>
              {ZONES.filter(z=>visited.has(z.key)).map(z => (
                <div key={z.key} className="quest-row completed">
                  <span className="quest-icon">{z.icon}</span><span className="quest-name done">{z.name}</span><span className="quest-check">✓</span>
                </div>
              ))}
            </div>
          )}
          {sidebarTab==='projects' && (
            <div className="sidebar-tab-content">
              <h4>🏙️ PROJECTS ({viewedProjects.size}/{projects.length})</h4>
              {projects.map((p,i) => (
                <div key={i} className={`project-row ${viewedProjects.has(p.name)?'viewed':''}`} onClick={()=>onProject(p)}>
                  <div className="project-dot" style={{background:p.color}} /><span className="project-name">{p.name}</span>
                  {viewedProjects.has(p.name) && <span className="project-check">✓</span>}
                </div>
              ))}
            </div>
          )}
          {sidebarTab==='stats' && (
            <div className="sidebar-tab-content">
              <h4>📊 STATS</h4>
              <div className="stats-grid">
                {[['LEVEL',level],['XP',`${xp}/100`],['COINS',`🪙 ${coins}`],['EXPLORED',`${visitedCount}/${totalZones}`],['PROJECTS',`${viewedProjects.size}/${projects.length}`],['BADGES',unlockedAchievements.size]].map(([l,v])=>(
                  <div key={l} className="stat-card"><span className="stat-label">{l}</span><span className="stat-val">{v}</span></div>
                ))}
              </div>
              <h4 style={{marginTop:12}}>🏆 ACHIEVEMENTS</h4>
              {unlockedAchievements.size===0 ? <p className="sidebar-hint">Keep exploring!</p> :
                [...unlockedAchievements].map(a => <div key={a} className="achievement-row">🏅 {a.replace(/_/g,' ').toUpperCase()}</div>)
              }
            </div>
          )}
          {sidebarTab==='legend' && (
            <div className="sidebar-tab-content">
              <h4>🗺️ LEGEND</h4>
              {ZONES.map(z => (
                <div key={z.key} className="legend-row">
                  <div className="legend-dot" style={{background:z.color}} />
                  <div className="legend-info"><span>{z.name}</span><small>{z.icon}</small></div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="sidebar-return" onClick={onReturn}><span>◀</span> HOME HUB</button>
      </div>

      {/* ===== WORLD MAIN ===== */}
      <div className="world-main">
        {/* Header Stats */}
        <div className="world-header">
          <div className="header-user">
            <img className="header-avatar" src={character} alt="avatar" />
            <div className="header-stats">
              <div className="user-name-line"><span className="name">NIMRA</span><span className="lvl">LVL {level}</span></div>
              <div className="stat-bars">
                <div className="bar-group">
                  <span className="heart">❤️</span>
                  <div className="track hp-track"><div className="fill hp-fill" style={{width:'100%'}} /></div>
                  <span className="val">100/100</span>
                </div>
                <div className="bar-group">
                  <span className="xp-label">XP</span>
                  <div className="track xp-track"><div className="fill xp-fill" style={{width:`${xp}%`}} /></div>
                  <span className="val">{xp}/100</span>
                </div>
              </div>
            </div>
          </div>
          <div className="header-title"><h2>MY JOURNEY WORLD</h2><p>WASD / Arrow Keys to move • Click zones to explore</p></div>
          <div className="header-actions">
            <button className="header-btn" onClick={() => setMinimapOpen(true)}><span className="icon">🗺️</span> MAP</button>
            <div className="coin-box"><span className="coin-icon">🪙</span><span className="coin-val">{coins}</span></div>
            <button className="header-btn settings" onClick={() => setSettingsOpen(true)}><span className="icon">⚙️</span></button>
          </div>
        </div>

        {/* Animated Map Area */}
        <div className="world-content" ref={mapRef} onClick={handleMapClick}>
          <div className="world-map-bg" />
          
          {/* Visual Overlays */}
          <div className="map-water-shimmer" style={{top:'15%', left:'45%', width:'20%', height:'40%'}} />
          <div className="map-water-shimmer" style={{top:'65%', left:'35%', width:'30%', height:'25%'}} />
          
          <div className="map-cloud cloud-1" />
          <div className="map-cloud cloud-2" />
          <div className="map-cloud cloud-3" />
          {/* Ambient particles */}
          {[...Array(12)].map((_,i) => <div key={i} className="map-sparkle" style={{
            left:`${10+Math.random()*80}%`, top:`${10+Math.random()*80}%`,
            animationDelay:`${Math.random()*4}s`, animationDuration:`${2+Math.random()*3}s`
          }} />)}

          {/* Zone Buildings with Glow */}
          {ZONES.map(z => (
            <div
              key={z.key}
              className={`zone-building ${visited.has(z.key)?'visited':'unvisited'} ${hoverZone===z.key?'hovered':''}`}
              style={{ 
                top:`${z.y}%`, 
                left:`${z.x}%`, 
                '--zone-color':z.color, 
                '--glow-size':`${z.glowSize}px`,
                width: '120px',
                height: '120px'
              }}
              onClick={(e) => handleZoneClick(z.key, e)}
              onMouseEnter={() => setHoverZone(z.key)}
              onMouseLeave={() => setHoverZone(null)}
            >
              <div className="building-glow" />
              <div className="building-glow-ring" />
              <div className="building-label">
                <span className="building-icon">{z.icon}</span>
                <span className="building-name">{z.name}</span>
              </div>
              {visited.has(z.key) && <div className="building-check">✓</div>}
            </div>
          ))}

          {/* Player */}
          <div className="player-marker" style={{top:`${playerPos.y}%`,left:`${playerPos.x}%`,transform:'translate(-50%,-50%)'}}>
            <img src={character} alt="player" className="marker-img" />
            <div className="marker-label">YOU</div>
          </div>
        </div>

        <div className="world-footer">
          <div className="footer-tip"><span className="star">⭐</span> {unexplored.length>0?`${unexplored.length} zones left!`:'All explored! 🎉'}</div>
          <div className="footer-progress"><span>PROGRESS</span><div className="progress-track"><div className="progress-fill" style={{width:`${progress}%`}} /></div><span className="percent">{progress}%</span></div>
        </div>
      </div>

      {/* ===== MODALS ===== */}
      {modal && modal !== 'projects' && (
        <div className="zone-modal" onClick={() => setModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modal.toUpperCase()}</h2>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              {modal==='achievements' && achievements.map((a,i) => <div key={i} className="modal-item achievement"><div className="modal-item-icon">🏅</div><div className="modal-item-info"><h3>{a.title}</h3><p className="modal-desc">{a.desc}</p></div></div>)}
              {modal==='certificates' && certificates.map((c,i) => (
                <div key={i} className="modal-item certificate"><div className="modal-item-icon">📜</div><div className="modal-item-info"><h3>{c.title}</h3><p>{c.org} • {c.date}</p><p className="modal-item-skills">Skills: {c.skills}</p>
                  {c.link && <a href={c.link} target="_blank" rel="noreferrer" className="modal-link-btn">VIEW CREDENTIAL ↗</a>}
                </div></div>
              ))}
              {modal==='experience' && experience.map((e,i) => <div key={i} className="modal-item experience"><div className="modal-item-icon">💼</div><div className="modal-item-info"><h3>{e.title}</h3><p>{e.org} • {e.period}</p><p className="modal-desc">{e.desc}</p></div></div>)}
              {modal==='education' && education.map((e,i) => <div key={i} className="modal-item education"><div className="modal-item-icon">🎓</div><div className="modal-item-info"><h3>{e.title}</h3><p className="modal-org">{e.org}</p><p className="modal-period">{e.period}</p></div></div>)}
            </div>

          </div>
        </div>
      )}

      {/* === QUEST BOARD MODAL (PROJECTS) === */}
      {modal === 'projects' && (
        <div className="zone-modal" onClick={() => setModal(null)}>
          <div className="modal-content horizontal-mode" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>QUEST BOARD — PROJECTS CITY</h2>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>

            <div className="modal-body horizontal-scroll">
              <div className="quest-carousel">
                {projects.map(p => (
                  <div 
                    key={p.id} 
                    className="quest-card compact"
                    onClick={() => handleProjectExplore(p)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Top Info */}
                    <div className="q-card-top">
                      <div className="q-card-info">
                        <div className="q-card-icon" style={{background: `linear-gradient(135deg, ${p.color}, #6366f1)`}}>
                          {p.name[0]}
                        </div>
                        <div className="q-card-titles">
                          <h3>{p.name}</h3>
                        </div>
                      </div>
                      <div className="q-xp-badge">+50 XP</div>
                    </div>

                    <p className="q-card-desc">{p.subtitle || p.desc.slice(0, 80) + '...'}</p>

                    <div className="q-tech-logos">
                      {p.tech.map(t => (
                        <img 
                          key={t} 
                          src={`https://skillicons.dev/icons?i=${TECH_MAP[t] || 'js'}`} 
                          title={t} 
                          alt={t} 
                          className="q-tech-icon-img"
                        />
                      ))}
                    </div>

                    <div className="q-card-divider" />

                    {/* Actions */}
                    <div className="q-card-actions">
                      <button 
                        className="q-btn explore" 
                        onClick={(e) => { e.stopPropagation(); handleProjectExplore(p); }}
                      >
                        EXPLORE MISSION
                      </button>
                    </div>

                    {/* Status Badge */}
                    <div className={`q-status-badge ${p.status?.toLowerCase() || 'available'}`}>
                      {p.status || 'AVAILABLE'}
                    </div>
                  </div>
                ))}

              </div>
            </div>
            
            <div className="carousel-hint">◀ SCROLL TO DISCOVER PROJECTS ▶</div>
          </div>
        </div>
      )}

      {/* ===== SETTINGS ===== */}
      {settingsOpen && (
        <div className="settings-overlay" onClick={() => setSettingsOpen(false)}>
          <div className="settings-panel" onClick={e => e.stopPropagation()}>
            <div className="settings-header"><h2>⚙️ SETTINGS</h2><button className="modal-close" onClick={() => setSettingsOpen(false)}>✕</button></div>
            <div className="settings-body">
              <div className="settings-section"><h4>CHARACTER</h4>
                <div className="settings-characters">
                  {CHARACTERS.map(c => (
                    <button key={c.path} className={`settings-char-btn ${character===c.path?'active':''}`} onClick={()=>onCharacterChange(c.path)}>
                      <img src={c.path} alt={c.label} /><span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="settings-section"><h4>AUDIO</h4>
                <div className="settings-toggles">
                  <div className="toggle-row" onClick={onToggleMusic}><span>🎵 Background Music</span><div className={`toggle-switch ${musicEnabled?'on':''}`}><div className="toggle-knob" /></div></div>
                  <div className="toggle-row" onClick={onToggleSfx}><span>🔊 Sound Effects</span><div className={`toggle-switch ${sfxEnabled?'on':''}`}><div className="toggle-knob" /></div></div>
                </div>
              </div>
              <div className="settings-section"><h4>STATS</h4>
                <div className="settings-stats">
                  {[['Level',level],['XP',`${xp}/100`],['Coins',`🪙 ${coins}`],['Explored',`${visitedCount}/${totalZones}`]].map(([l,v])=>(
                    <div key={l} className="s-stat"><span>{l}</span><span className="s-val">{v}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== MINIMAP ===== */}
      {minimapOpen && (
        <div className="minimap-overlay" onClick={() => setMinimapOpen(false)}>
          <div className="minimap-panel" onClick={e => e.stopPropagation()}>
            <div className="minimap-header"><h3>🗺️ WORLD MAP</h3><button className="modal-close" onClick={() => setMinimapOpen(false)}>✕</button></div>
            <div className="minimap-grid">
              <div className="minimap-gridlines" />
              {ZONES.map(z => (
                <div key={z.key} className={`minimap-zone ${visited.has(z.key)?'visited':''}`} style={{top:`${z.y}%`,left:`${z.x}%`}}>
                  <div className="minimap-zone-dot" style={{background:z.color}} /><span className="minimap-zone-label">{z.name}</span>
                </div>
              ))}
              <div className="minimap-player" style={{top:`${playerPos.y}%`,left:`${playerPos.x}%`}} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
