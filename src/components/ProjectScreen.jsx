import React, { useState, useEffect } from 'react';
import { projects } from '../data';

const TECH_MAP = {
  'HTML':'html','CSS':'css','JavaScript':'js','React':'react','TypeScript':'ts',
  'Supabase':'supabase','PostgreSQL':'postgres','Vercel':'vercel','Web3Forms':'js',
  'PWA':'nextjs','Arduino':'arduino','C++':'cpp','Infrared Sensors':'arduino','Ultrasonic Sensors':'arduino','Dataflow':'js'
};

export default function ProjectScreen({ project, onBack, onWorld, xp, level, coins, character }) {
  const [activeTab, setActiveTab] = useState('preview');
  const [xpAnimated, setXpAnimated] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  useEffect(() => {
    setActiveTab('preview');
    setXpAnimated(false);
    setShowSkills(false);
    const t1 = setTimeout(() => setXpAnimated(true), 500);
    const t2 = setTimeout(() => setShowSkills(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [project]);

  if (!project) return null;

  const pIdx = projects.findIndex(p => p.id === project.id);
  const nextProject = pIdx < projects.length - 1 ? projects[pIdx + 1] : null;

  return (
    <div className="ps-screen">
      {/* === LEFT PANEL (Story Mode) === */}
      <div className="ps-left">
        <div className="ps-char-block">
          <div className="ps-char-avatar"><img src={character} alt="avatar" /></div>
          <div className="ps-char-info">
            <span className="ps-char-name">NIMRA</span>
            <span className="ps-char-role">Lv.{level} Developer</span>
            <span className="ps-char-title">Full Stack Explorer</span>
          </div>
        </div>

        <div className="ps-quest-story">
          <h4>🟣 QUEST STORY</h4>
          <p className="ps-story-text">
            {project.id === 'araaz' 
              ? "This was my first real-world e-commerce system. I built a complete flow from UI to deployment."
              : (project.story || project.desc)}
          </p>
          
          <div className="ps-story-sub">
            <h5>⚔️ Challenges</h5>
            <ul className="ps-story-list">
              {project.id === 'araaz' 
                ? <><li>Making layout responsive across devices</li><li>Handling contact automation without backend</li></>
                : (project.challenges || []).map((c,i) => <li key={i}>{c}</li>)}
            </ul>
          </div>

          <div className="ps-story-sub">
            <h5>🧠 What I Learned</h5>
            <ul className="ps-story-list learned">
              {project.id === 'araaz'
                ? <><li>Production-ready UI design</li><li>Deployment workflows (Vercel)</li></>
                : (project.learned || []).map((l,i) => <li key={l}>{l}</li>)}
            </ul>
          </div>
        </div>

        <div className="ps-tech-section">
          <h4>🧰 TECH STACK</h4>
          <div className="ps-tech-grid">
            {project.tech.map((t,i) => (
              <div key={i} className="ps-tech-chip-v2" title={t}>
                <img 
                  src={`https://skillicons.dev/icons?i=${TECH_MAP[t] || 'js'}`} 
                  alt={t} 
                  className="ps-tech-img" 
                />
                <div className="ps-tech-glow" style={{background: project.color}} />
              </div>
            ))}
          </div>
        </div>

        <div className="ps-controls">
          <h4>🎮 CONTROLS</h4>
          <div className="ps-control-row"><span className="key-cap">ESC</span> Back</div>
          <div className="ps-control-row"><span className="key-cap">M</span> Open Map</div>
        </div>
      </div>

      {/* === CENTER PANEL === */}
      <div className="ps-center">
        {/* Header */}
        <div className="ps-header">
          <div className="ps-header-left">
            <img className="ps-header-avatar" src={character} alt="a" />
            <div className="ps-header-stats">
              <span className="ps-hname">NIMRA <span className="ps-hlvl">LVL {level}</span></span>
              <div className="ps-hbars">
                <span className="ps-hheart">❤️</span>
                <div className="ps-htrack"><div className="ps-hfill hp" style={{width:'100%'}} /></div>
                <span className="ps-xplbl">XP</span>
                <div className="ps-htrack"><div className="ps-hfill xp" style={{width:`${xp}%`}} /></div>
              </div>
            </div>
          </div>
          <div className="ps-header-title">
            <h1>{project.name.toUpperCase()}</h1>
            <p>{project.subtitle}</p>
          </div>
          <div className="ps-header-right">
            <button className="ps-hbtn" onClick={onWorld}>🗺️ WORLD</button>
            <div className="ps-coins">🪙 {coins}</div>
          </div>
        </div>

        {/* Mission Briefing */}
        <div className="ps-mission-card">
          <div className="ps-mission-icon" style={{background:project.color}}>{project.name[0]}</div>
          <div className="ps-mission-info">
            <h3>MISSION BRIEFING</h3>
            <p>{project.desc}</p>
            {project.missionObj && (
              <div className="ps-mission-obj">
                {project.missionObj.map((o,i) => <span key={i} className="ps-obj-check">✔ {o}</span>)}
              </div>
            )}
          </div>
        </div>

        {/* Tab System */}
        <div className="ps-tabs">
          {[['preview','🛍 Preview'],['howItWorks','⚙ How it Works'],['approach','🧠 My Approach']].map(([key,label]) => (
            <button key={key} className={`ps-tab ${activeTab===key?'active':''}`} onClick={()=>setActiveTab(key)}>{label}</button>
          ))}
        </div>

        <div className="ps-tab-content">
          {/* TAB 1: Preview */}
          {activeTab === 'preview' && (
            <div className="ps-preview-panel">
              <div className="ps-preview-bar">
                <span>🔴 LIVE VIEW</span>
                <div className="status-dot pulsing" />
              </div>
              {project.live ? (
                <div className="ps-preview-wrap">
                  <div className="ps-preview-shimmer" />
                  <iframe className="ps-preview-iframe" src={project.live} title={project.name} />
                </div>
              ) : (
                <div className="ps-preview-placeholder">
                  <p>🔧 Hardware / Local Project</p>
                  <small>Live preview unavailable for this mission.</small>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: How it Works */}
          {activeTab === 'howItWorks' && (
            <div className="ps-hiw-panel">
              <h3>SYSTEM FLOW</h3>
              <div className="ps-flow-diagram">
                {(project.systemFlow || '').split('→').map((step,i,arr) => (
                  <React.Fragment key={i}>
                    <div className="ps-flow-box">{step.trim()}</div>
                    {i < arr.length - 1 && <div className="ps-flow-arrow">→</div>}
                  </React.Fragment>
                ))}
              </div>
              <h3 style={{marginTop:20}}>KEY FEATURES</h3>
              <div className="ps-features-grid">
                {project.features.map((f,i) => (
                  <div key={i} className="ps-feature-chip"><span className="check">✓</span> {f}</div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: My Approach */}
          {activeTab === 'approach' && (
            <div className="ps-approach-panel">
              <h3>WHY THIS STACK?</h3>
              <ul className="ps-approach-list">
                {(project.approach || []).map((a,i) => <li key={i}><span className="ps-a-bullet">▸</span>{a}</li>)}
              </ul>
              <h3 style={{marginTop:20}}>OPTIMIZATIONS</h3>
              <div className="ps-opt-grid">
                {(project.optimizations || []).map((o,i) => (
                  <div key={i} className="ps-opt-chip">✔ {o}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* === RIGHT PANEL === */}
      <div className="ps-right">
        <div className="ps-features-compact">
          <h4>✅ KEY FEATURES</h4>
          <ul>{project.features.slice(0,4).map((f,i) => <li key={i}><span className="check">✓</span>{f}</li>)}</ul>
        </div>

        <div className="ps-rewards-card">
          <h4>🎁 QUEST REWARDS</h4>
          <div className="ps-reward-row"><span>XP GAINED</span><span className="ps-reward-val">+50 XP</span></div>
          <div className="ps-xp-bar-wrap">
            <div className={`ps-xp-bar-fill ${xpAnimated ? 'animate' : ''}`} />
          </div>
          <div className="ps-reward-row"><span>COINS</span><span className="ps-reward-val">🪙 +20</span></div>
          <div className="ps-reward-status">✅ COMPLETED</div>
          {xpAnimated && <div className="ps-xp-float">+50 XP</div>}
        </div>

        <div className="ps-skills-card">
          <h4>🧠 SKILLS GAINED</h4>
          <div className="ps-skills-list">
            {(project.skillsGained || []).map((s,i) => (
              <div key={i} className={`ps-skill-item ${showSkills ? 'show' : ''}`} style={{transitionDelay:`${i*0.2}s`}}>
                <span className="ps-skill-plus">+</span> {s}
              </div>
            ))}
          </div>
        </div>

        <div className="ps-actions-card">
          <h4>🔗 PROJECT ASSETS</h4>
          <div className="ps-action-vertical">
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="ps-action-btn visit">🌐 Visit Live Site</a>
            )}
            <a href={project.github} target="_blank" rel="noreferrer" className="ps-action-btn github">💻 GitHub Repo</a>
          </div>
        </div>

        {nextProject && (
          <div className="ps-next-quest">
            <h4>🔒 NEXT QUEST</h4>
            <div className="ps-next-name">{nextProject.name}</div>
            <div className="ps-next-lock">Unlock at Level {level + 1}</div>
          </div>
        )}
      </div>

      {/* === BOTTOM ACTION BAR === */}
      <div className="ps-bottom-bar">
        <button className="ps-action-btn back" onClick={onBack}>← Back to World</button>
        <div className="ps-action-center">
          <span className="ps-location-tip">📍 Currently Exploring: {project.name}</span>
        </div>
        <div className="ps-action-coins">🪙 {coins}</div>
      </div>

    </div>
  );
}
