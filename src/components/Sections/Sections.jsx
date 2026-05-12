import React, { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import './Sections.css';


/* ── Scroll animation hook ── */
const useScrollReveal = (ref) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    const els = ref.current?.querySelectorAll('.fade-in');
    els?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
};

/* ── Case Studies ── */
const CASES = [
  {
    tag: 'E-Commerce',
    title: 'How we scaled a DTC brand to $4.2M in 90 days',
    desc: 'Full-funnel performance strategy combining Meta Ads, Google Shopping, and email automation rebuilt from the ground up.',
    metrics: [{ val: '12×', label: 'ROAS' }, { val: '$4.2M', label: 'Revenue' }, { val: '38%', label: 'CVR Lift' }],
    bg: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
  },
  {
    tag: 'SaaS',
    title: 'B2B SaaS: 0 to 50K organic users in 8 months',
    desc: 'Technical SEO overhaul and content moat strategy.',
    metrics: [{ val: '50K', label: 'Organic Users' }, { val: '+340%', label: 'Traffic' }],
    bg: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
  },
  {
    tag: 'Fintech',
    title: 'Fintech rebrand: 2× app downloads in 60 days',
    desc: 'Brand identity refresh + ASO + paid UA strategy.',
    metrics: [{ val: '2×', label: 'Downloads' }, { val: '4.8★', label: 'App Rating' }],
    bg: 'linear-gradient(135deg, #1c1917 0%, #44403c 100%)',
  },
];

export const CaseStudies = () => {
  const ref = useRef(null);
  useScrollReveal(ref);

  return (
    <section className="case-studies" id="work" ref={ref}>
      <div className="case-studies-header">
        <div className="fade-in">
          <div className="section-label">Our Work</div>
          <h2 className="section-title">
            Results that <span>speak loudly</span>
          </h2>
        </div>
        <Link to="/CaseStudies" className="btn-ghost fade-in">
          All case studies
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        {/* </a> */}
        </Link>
      </div>

      <div className="cases-grid">
        {CASES.map((c, i) => (
          <div
            className="case-card fade-in"
            key={i}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="case-visual">
              <div className="case-bg" style={{ background: c.bg }} />
              <div className="case-overlay" />
              <span className="case-tag">{c.tag}</span>
            </div>
            <div className="case-body">
              <div className="case-title">{c.title}</div>
              <p className="case-desc">{c.desc}</p>
              <div className="case-metrics">
                {c.metrics.map((m, j) => (
                  <div className="case-metric" key={j}>
                    <span className="cm-val">{m.val}</span>
                    <span className="cm-label">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ── Numbers ── */
const NUMBERS = [
  { val: '$180M+', label: 'Revenue generated for clients' },
  { val: '350+', label: 'Successful projects delivered' },
  { val: '14×', label: 'Average return on ad spend' },
  { val: '98%', label: 'Client satisfaction & retention' },
];

export const NumbersSection = () => {
  const ref = useRef(null);
  useScrollReveal(ref);

  return (
    <div className="numbers-section" ref={ref}>
      {NUMBERS.map((n, i) => (
        <div
          className="number-block fade-in"
          key={i}
          style={{ transitionDelay: `${i * 0.1}s` }}
        >
          <div className="nb-val">{n.val}</div>
          <div className="nb-label">{n.label}</div>
        </div>
      ))}
    </div>
  );
};

/* ── CTA ── */
export const CTASection = () => {
  const ref = useRef(null);
  useScrollReveal(ref);

  return (
    <section className="cta-section" ref={ref}>
      <div className="cta-bg" />
      <div className="cta-grid" />
      <div className="cta-inner">
        <div className="section-label fade-in">Start Today</div>
        <h2 className="cta-title fade-in">
          Ready to <span>transform</span><br />your digital future?
        </h2>
        <p className="cta-sub fade-in">
          Book a free 45-minute strategy session. We'll audit your current
          digital presence and map out a clear path to measurable growth.
        </p>
        <div className="cta-actions fade-in">
          <Link to="/contact" className="btn-primary">
            <span>Book Free Strategy Call</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          {/* </a> */}
          </Link>
          <a href="#work" className="btn-ghost">See our results</a>
        </div>
      </div>
    </section>
  );
};

/* ── Footer ── */
// export const Footer = () => (
//   <footer className="footer">
//     <div className="footer-top">
//       <div className="footer-brand">
//         <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//           <div style={{
//             width: 36, height: 36, borderRadius: 8,
//             background: 'linear-gradient(135deg, #2563EB, #F59E0B)',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             fontFamily: 'Syne, sans-serif', fontWeight: 800, color: 'white', fontSize: '1rem'
//           }}>T</div>
//           <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
//             Tecloudex
//           </span>
//         </div>
//         <p>
//           A digital transformation partner for growth-stage companies
//           ready to dominate their category online.
//         </p>
//       </div>

//       {[
//         { title: 'Services', 
//             links: [
//                 'Performance Marketing', 'SEO & Content', 'Web Development', 'Brand Identity', 'AI & Automation', 'Analytics'] },
//         { title: 'Company', links: ['About Us', 'Case Studies', 'Blog & Insights', 'Careers', 'Press'] },
//         { title: 'Contact', links: ['hello@tecloudex.com', '+91 98765 43210', 'Chennai, IN', 'Book a Call'] },
//       ].map(col => (
//         <div className="footer-col" key={col.title}>
//           <h4>{col.title}</h4>
//           <ul>
//             {col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}
//           </ul>
//         </div>
//       ))}
//     </div>

//     <div className="footer-bottom">
//       <p>© 2026 Tecloudex Digital. All rights reserved.</p>
//       <div className="footer-socials">
//         {['𝕏', 'in', 'ig', 'yt'].map(s => (
//           <a key={s} href="#" className="social-link">{s}</a>
//         ))}
//       </div>
//     </div>
//   </footer>
// );

export const Footer = () => {

  const footerData = [
    {
      title: 'Services',
      links: [
        { name: 'Performance Marketing', path: '/services' },
        { name: 'SEO & Content', path: '/services' },
        { name: 'Web Development', path: '/services' },
        { name: 'Brand Identity', path: '/services' },
        { name: 'AI & Automation', path: '/services' },
        { name: 'Analytics', path: '/services' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Case Studies', path: '/CaseStudies' },
        { name: 'Blog & Insights' },
        { name: 'Careers'},
        { name: 'Press'},
      ]
    },
    {
      title: 'Contact',
      links: [
        { name: 'hello@tecloudex.com', path: '#' },
        { name: '+91 98765 43210', path: '#' },
        { name: 'Chennai, IN', path: '#' },
        { name: 'Book a Call', path: '/contact' },
      ]
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-brand">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #2563EB, #F59E0B)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              color: 'white',
              fontSize: '1rem'
            }}>
              T
            </div>

            <span style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: '1.1rem',
              color: 'var(--text-primary)'
            }}>
              Tecloudex
            </span>
          </div>

          <p>
            A digital transformation partner for growth-stage companies
            ready to dominate their category online.
          </p>
        </div>

        {footerData.map(col => (
          <div className="footer-col" key={col.title}>

            <h4>{col.title}</h4>

            <ul>
              {col.links.map(link => (
                <li key={link.name}>
                  <Link to={link.path}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

          </div>
        ))}

      </div>

      <div className="footer-bottom">

        <p>© 2026 Tecloudex Digital. All rights reserved.</p>

        <div className="footer-socials">
          {['𝕏', 'in', 'ig', 'yt'].map(s => (
            <a key={s} href="#" className="social-link">
              {s}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};