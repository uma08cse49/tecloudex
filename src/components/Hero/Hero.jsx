import React, { useState, useEffect } from 'react';
import './Hero.css';
import FallingLetters from '../FallingLetters/FallingLetters';

const WORDS = ['Growth.', 'Revenue.', 'Impact.', 'Results.'];
const BAR_HEIGHTS = [35, 52, 45, 68, 55, 80, 60];

const Hero = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[wordIdx];
    let timeout;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 90);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 55);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((wordIdx + 1) % WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx]);

  return (
    <section className="hero" id="home">
      <FallingLetters />
      <div className="hero-grid" />
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />
      <div className="hero-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <div className="badge-dot">✦</div>
          <span>Digital Transformation Agency · Est. 2018</span>
        </div>

        <h1 className="hero-heading">
          We Engineer<br />
          <span className="line-2">
            Digital{' '}
            <span className="typewriter">{displayed}</span>
          </span>
        </h1>

        <p className="hero-sub">
          Strategy-led digital transformation and performance marketing that
          turns ambitious brands into category leaders — across every channel that matters.
        </p>

        <div className="hero-actions">
          <a href="#services" className="btn-primary">
            <span>Explore Services</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <button className="play-btn">
            <div className="play-circle">
              <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
                <path d="M1 1l10 6-10 6V1z"/>
              </svg>
            </div>
            Watch our story
          </button>
        </div>

        <div className="hero-stats">
          {[
            { val: '350', suffix: '+', label: 'Projects Delivered' },
            null,
            { val: '12×', suffix: '', label: 'Avg. ROI Generated' },
            null,
            { val: '98', suffix: '%', label: 'Client Retention' },
            null,
            { val: '6', suffix: ' yrs', label: 'Industry Experience' },
          ].map((item, i) =>
            item === null ? (
              <div key={i} className="stat-divider" />
            ) : (
              <div key={i} className="stat-item">
                <div className="stat-value">
                  {item.val}<span>{item.suffix}</span>
                </div>
                <div className="stat-label">{item.label}</div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Dashboard Visual */}
      <div className="hero-visual">
        <div className="dashboard-card">
          <div className="card-header">
            <span className="card-title">Campaign Performance</span>
            <span className="card-badge">Live</span>
          </div>
          <div className="metric-big">$2.4M</div>
          <div className="metric-change">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 1l4 5H2l4-5z"/>
            </svg>
            +38.2% vs last quarter
          </div>
          <div className="mini-chart">
            {BAR_HEIGHTS.map((h, i) => (
              <div
                key={i}
                className={`bar ${i === 6 ? 'active' : ''}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="card-footer-metrics">
            <div className="mini-metric">
              <div className="mini-metric-label">ROAS</div>
              <div className="mini-metric-val">8.4×</div>
            </div>
            <div className="mini-metric">
              <div className="mini-metric-label">Conv. Rate</div>
              <div className="mini-metric-val">6.7%</div>
            </div>
            <div className="mini-metric">
              <div className="mini-metric-label">CPA</div>
              <div className="mini-metric-val">$18</div>
            </div>
          </div>

          <div className="float-card float-card-1">
            <div className="float-icon">🚀</div>
            <div>
              <div className="float-label">Organic Traffic</div>
              <div className="float-val">+214%</div>
            </div>
          </div>

          <div className="float-card float-card-2">
            <div className="float-label">New leads today</div>
            <div className="float-val">↑ 47 leads</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
