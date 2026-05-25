import React, { useEffect, useRef } from 'react';
import './Services.css';

const SERVICES = [
  {
    icon: '📈',
    bg: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)',
    name: 'Performance Marketing',
    desc: 'Data-driven paid campaigns across Google, Meta, and programmatic channels engineered for measurable ROI.',
    tags: ['Google Ads', 'Meta Ads', 'Programmatic', 'Attribution'],
  },
  {
    icon: '🔍',
    bg: 'linear-gradient(135deg, #064e3b, #059669)',
    name: 'SEO & Content Strategy',
    desc: 'Technical SEO, authority building, and content ecosystems that dominate search and compound over time.',
    tags: ['Technical SEO', 'Link Building', 'Content', 'Analytics'],
  },
  {
    icon: '⚡',
    bg: 'linear-gradient(135deg, #78350f, #d97706)',
    name: 'Web Development',
    desc: 'Conversion-optimised websites and digital platforms built with performance and scalability at the core.',
    tags: ['React', 'Next.js', 'CRO', 'Web3'],
  },
  {
    icon: '🎨',
    bg: 'linear-gradient(135deg, #4a044e, #a21caf)',
    name: 'Brand Identity & Design',
    desc: 'Visual identities that command attention — from logo and brand system to motion design and campaigns.',
    tags: ['Brand System', 'UI/UX', 'Motion', 'Print'],
  },
  {
    icon: '🤖',
    bg: 'linear-gradient(135deg, #0c4a6e, #0284c7)',
    name: 'AI & Automation',
    desc: 'Custom AI solutions, marketing automation flows, and intelligent chatbots that scale your operations.',
    tags: ['ChatGPT', 'n8n', 'Zapier', 'LLM Apps'],
  },
  {
    icon: '📊',
    bg: 'linear-gradient(135deg, #1c1917, #44403c)',
    name: 'Analytics & Insights',
    desc: "Full-funnel data infrastructure and dashboards giving you clarity on what's working and where to scale.",
    tags: ['GA4', 'Looker', 'BigQuery', 'Attribution'],
  },
];

const useScrollAnimation = (ref) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = ref.current?.querySelectorAll('.fade-in');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
};

const Services = () => {
  const sectionRef = useRef(null);
  useScrollAnimation(sectionRef);

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="services-header">
        <div className="services-header-left fade-in">
          <div className="section-label">What We Do</div>
          <h2 className="section-title">
            Full-spectrum<br />
            <span>digital mastery</span>
          </h2>
        </div>
        <div className="services-header-right fade-in">
          <p>
            From brand strategy to technical execution — we cover every dimension
            of your digital presence with precision and intent.
          </p>
        </div>
      </div>

      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <div
            className="service-card fade-in"
            key={i}
            style={{ transitionDelay: `${i * 0.07}s` }}
          >
            <div className="service-number">0{i + 1}</div>
            <div className="service-icon-wrap" style={{ background: s.bg }}>
              {s.icon}
            </div>
            <div className="service-name">{s.name}</div>
            <p className="service-desc">{s.desc}</p>
            <div className="service-tags">
              {s.tags.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
            <div className="service-arrow">
              Learn more
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="services-footer fade-in">
        <a href="#work" className="btn-ghost">
          View all case studies
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Services;

