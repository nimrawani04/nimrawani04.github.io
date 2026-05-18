import { useState, useEffect } from "react";
import {
  ChefHat,
  Trophy,
  ScrollText,
  BookOpen,
  User,
  Globe,
  Mail,
  ArrowLeft,
  Music2,
  VolumeX,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  sfxClick,
  toggleBgMusic,
  isBgPlaying,
} from "../utils/kitchenSounds";
import "../css/CookingGame.css";

interface CookingGameCoverProps {
  onBegin: () => void;
  onBack: () => void;
  onNavigate: (section: string) => void;
}

export default function CookingGameCover({
  onBegin,
  onBack,
  onNavigate,
}: CookingGameCoverProps) {
  const [musicOn, setMusicOn] = useState(isBgPlaying());
  const [steamItems, setSteamItems] = useState<{ id: number; left: number; delay: number }[]>([]);

  // Generate steam items dynamically
  useEffect(() => {
    const items = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: 30 + Math.random() * 40,
      delay: Math.random() * 4,
    }));
    setSteamItems(items);
  }, []);

  const handleToggleMusic = () => {
    const on = toggleBgMusic();
    setMusicOn(on);
  };

  const handleButtonClick = (action: () => void) => {
    sfxClick();
    action();
  };

  const menuItems = [
    { label: "Projects", section: "projects", icon: <BookOpen size={16} /> },
    { label: "Achievements", section: "awards", icon: <Trophy size={16} /> },
    { label: "Certificates", section: "certifications", icon: <ScrollText size={16} /> },
    { label: "About Me", section: "about", icon: <User size={16} /> },
  ];

  return (
    <div className="cgc-viewport">
      {/* Absolute Cozy Kitchen Background Layer */}
      <div className="cgc-kitchen-scene">
        {/* Background Wood Panels */}
        <div className="cgc-kitchen-walls" />
        
        {/* Left Window */}
        <div className="cgc-window-frame">
          <div className="cgc-window-glass">
            <div className="cgc-sun" />
            <div className="cgc-cloud-1" />
            <div className="cgc-cloud-2" />
            <div className="cgc-hills" />
          </div>
          <div className="cgc-curtain left" />
          <div className="cgc-curtain right" />
          {/* Smiling Plant on Sill */}
          <div className="cgc-window-plant">
            <div className="cgc-plant-pot">
              <div className="cgc-pot-face">
                <span className="eye" />
                <span className="mouth" />
                <span className="eye" />
              </div>
            </div>
            <div className="cgc-plant-leaves">
              <span className="leaf-1" />
              <span className="leaf-2" />
              <span className="leaf-3" />
            </div>
          </div>
        </div>

        {/* Top Shelves with Spice Jars & Hanging Utensils */}
        <div className="cgc-top-shelf">
          <div className="cgc-shelf-wood" />
          <div className="cgc-jars-container">
            {/* HTML Spice Jar */}
            <div className="cgc-spice-jar jar-html">
              <span className="cap" />
              <span className="label">HTML</span>
            </div>
            {/* CSS Spice Jar */}
            <div className="cgc-spice-jar jar-css">
              <span className="cap" />
              <span className="label">CSS</span>
            </div>
            {/* JS Spice Jar */}
            <div className="cgc-spice-jar jar-js">
              <span className="cap" />
              <span className="label">JS</span>
            </div>
          </div>
          {/* Hanging items */}
          <div className="cgc-hanging-utensils">
            <span className="utensil ladle" />
            <span className="utensil whisk" />
            <span className="utensil mitt" />
          </div>
        </div>

        <div className="cgc-refrigerator" aria-hidden="true">
          <div className="cgc-fridge-door">
            <span className="cgc-fridge-handle" />
            <div className="cgc-sticky-note">
              <p>Dream</p>
              <p>Code</p>
              <p>Achieve</p>
              <span className="heart-dot">♥</span>
            </div>
            <span className="cgc-magnet star-magnet" />
            <span className="cgc-magnet heart-magnet" />
          </div>
        </div>

      </div>

      {/* Floating particles/sparkles */}
      <div className="cgc-sparkles-layer">
        <span className="cgc-sparkle c1">★</span>
        <span className="cgc-sparkle c2">✦</span>
        <span className="cgc-sparkle c3">★</span>
        <span className="cgc-sparkle c4">✦</span>
      </div>

      {/* Top Bar Navigation */}
      <div className="cgc-top-navigation">
        <button
          className="cgc-nav-button cgc-back-portfolio"
          onClick={() => handleButtonClick(onBack)}
          title="Back to Portfolio"
        >
          <ArrowLeft size={16} />
          <span>Portfolio</span>
        </button>

        <div className="cgc-chef-badge">
          <div className="cgc-hat-icon">
            <ChefHat size={22} />
          </div>
          <div className="cgc-chef-name">
            <strong>Chef Nimra</strong>
            <small>Portfolio Kitchen</small>
          </div>
        </div>

        <button
          className="cgc-nav-button cgc-music-button"
          onClick={handleToggleMusic}
          title={musicOn ? "Mute music" : "Play music"}
        >
          {musicOn ? <Music2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>

      {/* Main Content Layout */}
      <div className="cgc-main-content">
        
        {/* Left Side: Hanging Welcome Blackboard */}
        <div className="cgc-left-blackboard">
          <div className="cgc-rope left" />
          <div className="cgc-rope right" />
          <div className="cgc-blackboard-inner">
            <h3>Welcome to my portfolio kitchen!</h3>
            <p>Explore my projects and skills by cooking recipes!</p>
            <span className="heart-chalk">♥</span>
          </div>
        </div>

        {/* Center Top: Hanging Main Sign Board */}
        <header className="cgc-hanging-woodsign">
          <div className="cgc-chain left" />
          <div className="cgc-chain right" />
          <div className="cgc-chefhat-logo">
            <ChefHat size={34} />
            <span className="logo-heart">♥</span>
          </div>
          <h1>NIMRA'S KITCHEN</h1>
          <div className="cgc-ribbon-sub">
            <span className="ribbon-tail left" />
            <span className="ribbon-text">Cook • Create • Innovate</span>
            <span className="ribbon-tail right" />
          </div>
        </header>

        {/* Center: Chalkboard Banner Quote */}
        <div className="cgc-quote-banner">
          <span className="heart">♥</span>
          <p>A dash of code, a pinch of creativity, and a whole lot of passion!</p>
          <span className="heart">♥</span>
        </div>

        {/* Bottom Counter Area: Recipe Book, Pot, Blackboard, Mascot */}
        <div className="cgc-counter-table">
          <div className="cgc-wood-grain-overlay" />

          <div className="cgc-counter-grid">
            {/* 1. Recipe Book / Menu (Left) */}
            <div className="cgc-menu-book-stand">
              <div className="cgc-menu-book">
                {/* Left Page */}
                <div className="cgc-book-page left-page">
                  <div className="cgc-page-title">
                    <h4>Today's</h4>
                    <h4>Special</h4>
                  </div>
                  <div className="cgc-heart-divider">♥</div>
                  <div className="cgc-doodle-pot">
                    <span className="steam" />
                    <div className="pot-body" />
                  </div>
                </div>
                {/* Book Spine Rings */}
                <div className="cgc-book-spine">
                  <span className="ring" />
                  <span className="ring" />
                  <span className="ring" />
                  <span className="ring" />
                </div>
                {/* Right Page (Portfolio sections) */}
                <div className="cgc-book-page right-page">
                  <nav className="cgc-menu-nav">
                    {menuItems.map((item) => (
                      <button
                        key={item.section}
                        className="cgc-menu-nav-item"
                        onClick={() => handleButtonClick(() => onNavigate(item.section))}
                      >
                        <span className="icon">{item.icon}</span>
                        <span className="text">{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* 2. Middle Bubbling Pink Pot */}
            <div className="cgc-pink-pot-stage">
              {/* Plaid Checkered Kitchen Towel */}
              <div className="cgc-plaid-towel" />
              
              {/* Animated Steam */}
              <div className="cgc-steam-container">
                {steamItems.map((steam) => (
                  <span
                    key={steam.id}
                    className="cgc-steam-wave"
                    style={{
                      left: `${steam.left}%`,
                      animationDelay: `${steam.delay}s`,
                    }}
                  />
                ))}
              </div>

              {/* Pot Body */}
              <div className="cgc-pot-body">
                {/* Pot Handles */}
                <span className="handle left" />
                <span className="handle right" />
                {/* Heart outline in center */}
                <div className="cgc-pot-heart">♥</div>
                {/* Bubbling soup on top */}
                <div className="cgc-pot-soup">
                  <span className="bubble b1" />
                  <span className="bubble b2" />
                  <span className="bubble b3" />
                  <span className="soup-veggie v1">AI</span>
                  <span className="soup-veggie v2">JS</span>
                  <span className="soup-veggie v3">♥</span>
                </div>
              </div>
            </div>

            {/* 3. Easel Board (Right) & Chef Hat Mascot (Rightmost) */}
            <div className="cgc-easel-and-mascot">
              <div className="cgc-easel-board">
                <div className="cgc-easel-legs">
                  <span className="leg left" />
                  <span className="leg center" />
                  <span className="leg right" />
                </div>
                <div className="cgc-blackboard">
                  <h4>Ready to cook</h4>
                  <h4>something</h4>
                  <h4>amazing?</h4>
                  <button
                    className="cgc-begin-btn"
                    onClick={() => handleButtonClick(onBegin)}
                  >
                    <span>LET'S BEGIN!</span>
                  </button>
                </div>
              </div>

              {/* Chef Hat Mascot */}
              <div className="cgc-cute-mascot">
                <div className="cgc-mascot-hat">
                  <ChefHat size={36} />
                  <div className="cgc-mascot-face">
                    <span className="eye" />
                    <span className="smile" />
                    <span className="eye" />
                  </div>
                </div>
                {/* Wooden base */}
                <div className="cgc-mascot-base" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Bottom Connect Bar */}
      <footer className="cgc-connect-bar">
        <span className="cgc-connect-label">Let's connect!</span>
        <div className="cgc-connect-links">
          <a
            href="https://nimrawani04.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="cgc-connect-link"
            onClick={sfxClick}
          >
            <Globe size={15} />
            <span>Website</span>
          </a>
          <a
            href="https://github.com/nimrawani04"
            target="_blank"
            rel="noopener noreferrer"
            className="cgc-connect-link"
            onClick={sfxClick}
          >
            <FaGithub size={15} />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/nimra-wani-b32438359"
            target="_blank"
            rel="noopener noreferrer"
            className="cgc-connect-link"
            onClick={sfxClick}
          >
            <FaLinkedin size={15} />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:nimrawani04@gmail.com"
            className="cgc-connect-link"
            onClick={sfxClick}
          >
            <Mail size={15} />
            <span>nimrawani04@gmail.com</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
