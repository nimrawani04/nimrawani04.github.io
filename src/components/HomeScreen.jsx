import React from 'react';

export default function HomeScreen({ onStart, onAbout, character, onCharacterChange }) {
  const characters = [
    { id: 'nimra', path: '/nimra-character.png', label: 'Classic' },
    { id: 'chr1', path: '/chr1.png', label: 'Knight' },
    { id: 'chr2', path: '/chr2.png', label: 'Adventurer' },
  ];

  return (
    <div className="home-screen">
      <div className="home-top">
        {/* MASSIVE CHARACTER ON LEFT */}
        <div className="character-area">
          <div className="character-main-wrapper">
            <img src={character} alt="Selected Character" className="character-img" />
            <div className="character-select-overlay">
              <div className="char-nav-title">SWITCH CHARACTER</div>
              <div className="char-options">
                {characters.map(char => (
                  <button 
                    key={char.id} 
                    className={`char-option-btn ${character === char.path ? 'active' : ''}`}
                    onClick={() => onCharacterChange(char.path)}
                    title={char.label}
                  >
                    <img src={char.path} alt={char.label} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DIALOGUE BOX ABOVE CARDS */}
        <div className="dialogue-container">
          <div className="dialogue-box">
            <h2>Hi, I am <span>Nimra..</span></h2>
            <p>Welcome to my digital world! Explore, connect, and let's build something amazing together.</p>
            <div className="dialogue-arrow" />
          </div>
        </div>

        {/* 3 CORE BUTTONS (Game Menu Style) */}
        <div className="home-cards-container">
          {/* Card 1: ABOUT ME */}
          <div className="menu-card card-about">
            <div className="card-header">
              <span className="icon">👤</span>
              <h3>ABOUT ME</h3>
            </div>
            <p>I'm a web developer with a passion for creating dynamic, responsive, and visually engaging digital experiences.</p>
            <p>I love turning ideas into interactive web applications through clean code, intuitive design, and technical precision.</p>
            <button className="about-btn" onClick={onAbout}>MORE ABOUT ME ▶</button>
          </div>

          {/* Card 2: MANUAL */}
          <div className="menu-card card-manual">
            <div className="card-header">
              <span className="icon">📘</span>
              <h3>MANUAL</h3>
            </div>
            <div className="manual-icon-area">
              <div className="manual-pdf-icon" />
            </div>
            <p style={{ textAlign: 'center' }}>Download my resume (PDF)</p>
            <a href="/resume.pdf" download className="download-btn">DOWNLOAD ⬇</a>
          </div>

          {/* Card 3: GET HELP */}
          <div className="menu-card card-help">
            <div className="card-header">
              <span className="icon">💬</span>
              <h3>GET HELP</h3>
            </div>
            <p>Let's connect! Feel free to reach out through any of these:</p>
            <div className="contact-links">
              <a href="mailto:nimrawani04@gmail.com" className="contact-link">
                <span>📧</span> GMAIL <span className="arrow">▶</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact-link">
                <span>🔗</span> LINKEDIN <span className="arrow">▶</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="contact-link">
                <span>🐙</span> GITHUB <span className="arrow">▶</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTION BAR */}
      <div className="home-bottom">
        <div className="bottom-main">
          <div className="hp-container">
            <div className="hp-bar-full">
              <span className="hp-icon">❤️</span>
              <div className="hp-track-full"><div className="hp-fill-full" /></div>
              <span className="hp-text">100/100</span>
            </div>
            <div className="hp-subtext">Let's begin the journey!</div>
          </div>

          <button className="start-game-btn" onClick={onStart}>
            ⚔️ START GAME
          </button>

          <div className="adventure-info">
            <span className="adventure-icon">⭐</span>
            <div className="adventure-text">
              Your adventure<br />starts here.
            </div>
          </div>
        </div>
        <div className="press-enter">PRESS ENTER TO BEGIN</div>
      </div>
    </div>
  );
}
