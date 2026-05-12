import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Footer } from '../../components/Sections/Sections';
import "./CaseStudies.css";

/* ─── HOOKS ──────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCountUp(target, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const num = parseFloat(String(target).replace(/[^0-9.]/g, ""));
    if (!num) return;
    const start = performance.now();
    const tick = now => {
      const t = Math.min((now - start) / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setCount(+(ease * num).toFixed(num % 1 !== 0 ? 1 : 0));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return count;
}

/* ─── SHARED ─────────────────────────────────────────────────────────────── */
function MacWindow({ title, children, className = "" }) {
  return (
    <div className={`cs-mac ${className}`}>
      <div className="cs-mac-bar">
        <span className="cs-dot cs-red" /><span className="cs-dot cs-yellow" /><span className="cs-dot cs-green" />
        <span className="cs-mac-title">{title}</span>
      </div>
      <div className="cs-mac-body">{children}</div>
    </div>
  );
}

function Pills({ list, color }) {
  return (
    <div className="cs-pills">
      {list.map(p => <span key={p} className="cs-pill" style={color ? { borderColor: color + "55", color } : {}}>{p}</span>)}
    </div>
  );
}

/* ─── NAVBAR ─────────────────────────────────────────────────────────────── */
// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", fn);
//     return () => window.removeEventListener("scroll", fn);
//   }, []);
//   return (
//     <nav className={`cs-navbar${scrolled ? " cs-scrolled" : ""}`}>
//       <div className="cs-nav-logo">
//         <div className="cs-logo-icon">N</div>
//         <span className="cs-logo-text"><span>NEX</span><span className="cs-logo-accent">VORA</span></span>
//       </div>
//       <ul className="cs-nav-links">
//         <li>Services</li><li>Work</li><li>About</li>
//         <li className="cs-nav-active">Case Studies</li><li>Contact</li>
//       </ul>
//       <div className="cs-nav-right">
//         <div className="cs-avail"><span className="cs-green-dot" /><span>Available now</span></div>
//         <button className="cs-btn-primary">Get Started →</button>
//       </div>
//     </nav>
//   );
// }

/* ─── HERO ───────────────────────────────────────────────────────────────── */
function HeroChart({ visible }) {
  const industries = [
    { name: "E-Commerce", roas: 14, color: "#4361ee" },
    { name: "D2C Brand",  roas: 12, color: "#d63af9" },
    { name: "FinTech",    roas: 11, color: "#8b5cf6" },
    { name: "B2B SaaS",   roas: 8,  color: "#00d4ff" },
    { name: "EdTech",     roas: 9,  color: "#2dc653" },
    { name: "Real Estate",roas: 7,  color: "#f4a23a" },
  ];
  const max = 16;
  return (
    <MacWindow title="TECLOUDEX · RESULTS OVERVIEW">
      <div className="cs-hero-chart">
        {industries.map((ind, i) => (
          <div className="cs-bar-row" key={ind.name}>
            <span className="cs-bar-label">{ind.name}</span>
            <div className="cs-bar-track">
              <div
                className="cs-bar-fill"
                style={{
                  width: visible ? `${(ind.roas / max) * 100}%` : "0%",
                  background: ind.color,
                  transitionDelay: `${i * 0.12}s`,
                  boxShadow: `0 0 10px ${ind.color}66`,
                }}
              />
            </div>
            <span className="cs-bar-val" style={{ color: ind.color }}>{ind.roas}×</span>
          </div>
        ))}
      </div>
      <div className="cs-hero-stats-grid">
        {[
          { v: "98%", l: "Client Retention" },
          { v: "48hr", l: "Avg Onboarding" },
          { v: "350+", l: "Brands Served" },
          { v: "7 yrs", l: "Operating" },
        ].map(s => (
          <div className="cs-hero-stat" key={s.l}>
            <div className="cs-hero-stat-val">{s.v}</div>
            <div className="cs-hero-stat-label">{s.l}</div>
          </div>
        ))}
      </div>
    </MacWindow>
  );
}

function Hero() {
  const [ref, visible] = useInView(0.15);
  const tickers = [
    { val: "₹180M+", label: "REVENUE GENERATED" },
    { val: "14×",    label: "AVERAGE ROAS" },
    { val: "350+",   label: "BRANDS TRANSFORMED" },
  ];
  return (
    <section className="cs-hero" ref={ref}>
      <div className="cs-hero-bg-glow" />
      <div className="cs-hero-left">
        <div className="cs-badge-pill"><span className="cs-badge-icon">⊕</span>Case Studies · Proof Over Promises</div>
        <h1 className="cs-hero-h1">
          350+ brands.<br />
          <span className="cs-hero-accent">Proof in every number.</span>
        </h1>
        <p className="cs-hero-sub">
          We don't ask you to trust us — we show you the work. Every case study below is a real brand,
          real numbers, and a real growth system built by TECLOUDEX.
        </p>
        <div className="cs-hero-btns">
          <button className="cs-btn-primary cs-btn-lg">View All Results ↓</button>
          <button className="cs-btn-outline cs-btn-lg">Start Your Story →</button>
        </div>
        <div className="cs-tickers">
          {tickers.map(t => (
            <div className="cs-ticker-pill" key={t.label}>
              <div className="cs-ticker-val">{t.val}</div>
              <div className="cs-ticker-label">{t.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="cs-hero-right">
        <HeroChart visible={visible} />
      </div>
    </section>
  );
}

/* ─── FILTER BAR ─────────────────────────────────────────────────────────── */
const ALL_INDUSTRIES = ["All", "E-Commerce", "B2B SaaS", "D2C Brand", "EdTech", "FinTech", "Real Estate"];
const ALL_SERVICES = ["All Services", "Paid Media", "SEO", "Web Dev", "Brand", "AI & Auto", "Analytics"];

function FilterBar({ industry, setIndustry, service, setService, count }) {
  return (
    <div className="cs-filter-bar">
      <div className="cs-filter-inner">
        <div className="cs-filter-rows">
          <div className="cs-filter-row">
            <span className="cs-filter-label">Industry:</span>
            {ALL_INDUSTRIES.map(i => (
              <button
                key={i}
                className={`cs-filter-btn${industry === i ? " cs-filter-active" : ""}`}
                onClick={() => setIndustry(i)}
              >{i}</button>
            ))}
          </div>
          <div className="cs-filter-row">
            <span className="cs-filter-label">Service:</span>
            {ALL_SERVICES.map(s => (
              <button
                key={s}
                className={`cs-filter-btn cs-filter-sm${service === s ? " cs-filter-active" : ""}`}
                onClick={() => setService(s)}
              >{s}</button>
            ))}
          </div>
        </div>
        <div className="cs-filter-count">Showing <strong>{count}</strong> results</div>
      </div>
    </div>
  );
}

/* ─── FEATURED CASE STUDY ────────────────────────────────────────────────── */
function FeaturedLineChart({ visible }) {
  const months = [3, 5, 7, 10, 12, 14];
  const W = 320, H = 120;
  const xs = months.map((_, i) => (i / (months.length - 1)) * (W - 20) + 10);
  const ys = months.map(v => H - (v / 16) * (H - 16) - 4);
  const path = xs.map((x, i) => `${i === 0 ? "M" : "L"} ${x} ${ys[i]}`).join(" ");
  return (
    <div className="cs-featured-chart">
      <div className="cs-featured-chart-label">MONTH-ON-MONTH ROAS GROWTH</div>
      <svg viewBox={`0 0 ${W} ${H + 20}`} className="cs-line-svg">
        <defs>
          <linearGradient id="featGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4361ee" /><stop offset="100%" stopColor="#00d4ff" />
          </linearGradient>
        </defs>
        {months.map((m, i) => (
          <text key={i} x={xs[i]} y={H + 16} textAnchor="middle" className="cs-chart-label">
            M{i + 1}
          </text>
        ))}
        {ys.map((y, i) => (
          <text key={i} x={4} y={y + 4} className="cs-chart-y-label">{months[i]}×</text>
        ))}
        <path d={path} fill="none" stroke="url(#featGrad)" strokeWidth="2.5"
          strokeLinecap="round" strokeDasharray="1000" strokeDashoffset={visible ? "0" : "1000"}
          className="cs-chart-path" />
        <circle cx={xs[5]} cy={ys[5]} r="6" fill="#00d4ff"
          style={{ filter: "drop-shadow(0 0 6px #00d4ff)", opacity: visible ? 1 : 0, transition: "opacity 0.3s 2s" }} />
      </svg>
    </div>
  );
}

function FeaturedCase({ onOpen }) {
  const [ref, visible] = useInView(0.1);
  const kpis = [
    { label: "ROAS", val: "14×", color: "var(--cs-blue)" },
    { label: "REVENUE", val: "₹2.4Cr", color: "var(--cs-yellow)" },
    { label: "CPA", val: "↓42%", color: "var(--cs-green)" },
    { label: "CTR", val: "6.8%", color: "var(--cs-cyan)" },
  ];
  const steps = [
    "Rebuilt the full Meta funnel architecture — TOF/MOF/BOF audiences, exclusions, and lookalikes from scratch.",
    "Deployed a 6-week creative testing sprint — 48 ad variations tested across 3 formats.",
    "Implemented cross-channel attribution using server-side events and a custom data layer.",
  ];
  return (
    <section className="cs-featured" ref={ref}>
      <div className="cs-featured-vertical-label">FEATURED · CASE STUDY</div>
      <div className={`cs-featured-inner${visible ? " cs-visible" : ""}`}>
        <div className="cs-featured-left">
          <div className="cs-ind-tag">E-COMMERCE</div>
          <h2 className="cs-featured-title">GrowthScale</h2>
          <p className="cs-featured-tagline">From 3× to 14× ROAS in 5 months.</p>
          <p className="cs-featured-body">
            GrowthScale was spending ₹40L/month on Meta with a stagnant 3× ROAS and no visibility
            into why conversions were dropping. Their creative was rotating weekly but nothing was
            working. Attribution was broken across channels.
          </p>
          <div className="cs-what-we-did">
            <div className="cs-wwd-label">WHAT TECLOUDEX DID</div>
            {steps.map((s, i) => (
              <div className="cs-wwd-step" key={i}>
                <span className="cs-wwd-num">0{i + 1}</span>
                <p>{s}</p>
              </div>
            ))}
          </div>
          <Pills list={["Meta Ads", "Google Shopping", "Email", "Attribution"]} />
          <button className="cs-btn-outline cs-featured-cta" onClick={() => onOpen("growthscale")}>
            Read Full Case Study →
          </button>
        </div>
        <div className="cs-featured-right">
          <MacWindow title="TECLOUDEX · GROWTHSCALE ANALYTICS">
            <div className="cs-kpi-grid">
              {kpis.map(k => (
                <div className="cs-kpi-card" key={k.label}>
                  <div className="cs-kpi-label">{k.label}</div>
                  <div className="cs-kpi-val" style={{ color: k.color }}>{k.val}</div>
                </div>
              ))}
            </div>
            <FeaturedLineChart visible={visible} />
          </MacWindow>
        </div>
      </div>
    </section>
  );
}

/* ─── CASE STUDY DATA ────────────────────────────────────────────────────── */
const CASES = [
  {
    id: "brandbridge",
    industry: "B2B SaaS", service: "Paid Media", serviceTag: "LinkedIn Ads",
    company: "BrandBridge", color: "#0a66c2",
    tagline: "From cold outreach to 340 SQLs/month.",
    challenge: "Generating qualified SQLs from LinkedIn with a CPL under ₹2,000 in a crowded B2B space.",
    results: [
      { val: "340", label: "SQLs/MO", color: "var(--cs-blue)" },
      { val: "₹1,800", label: "CPL", color: "var(--cs-green)" },
      { val: "68%", label: "SQL→DEMO", color: "var(--cs-cyan)" },
    ],
    pills: ["LinkedIn Ads", "Google Search", "HubSpot"],
    duration: "120 DAYS",
    quote: "I've worked with three other agencies before TECLOUDEX. None of them connected the dots the way these guys do.",
    author: "Priya Sharma", role: "Founder, BrandBridge",
    serviceFilter: "Paid Media",
  },
  {
    id: "novadtc",
    industry: "D2C Brand", service: "Full Funnel", serviceTag: "Meta + Google",
    company: "NovaDTC", color: "#d63af9",
    tagline: "₹4.2Cr revenue in 90 days, from zero.",
    challenge: "Launching a new D2C skincare brand with no existing audience or brand equity.",
    results: [
      { val: "₹4.2Cr", label: "REVENUE", color: "var(--cs-yellow)" },
      { val: "12×", label: "ROAS", color: "var(--cs-blue)" },
      { val: "-42%", label: "CAC", color: "var(--cs-cyan)" },
    ],
    pills: ["Meta Ads", "Google", "SEO", "Email"],
    duration: "90 DAYS",
    quote: "In 90 days we'd done ₹4.2Cr in revenue. That's not an agency result. That's a co-founder result.",
    author: "Rahul Verma", role: "CEO, NovaDTC",
    serviceFilter: "Paid Media",
  },
  {
    id: "edunova",
    industry: "EdTech", service: "SEO", serviceTag: "SEO + Content",
    company: "EduNova", color: "#2dc653",
    tagline: "+480% organic traffic in 6 months.",
    challenge: "Breaking into a crowded EdTech search market dominated by established national brands.",
    results: [
      { val: "+480%", label: "TRAFFIC", color: "var(--cs-teal)" },
      { val: "142", label: "TOP-3 KWS", color: "var(--cs-blue)" },
      { val: "₹18", label: "CPL", color: "var(--cs-green)" },
    ],
    pills: ["SEO", "Content", "GA4", "Google Ads"],
    duration: "180 DAYS",
    quote: "Our domain went from a DA of 18 to 72 in six months. TECLOUDEX's content team is genuinely world-class.",
    author: "Kiran Desai", role: "CMO, EduNova",
    serviceFilter: "SEO",
  },
  {
    id: "finflow",
    industry: "FinTech", service: "Web Dev", serviceTag: "Next.js + CRO",
    company: "FinFlow", color: "#8b5cf6",
    tagline: "99 Lighthouse. +68% conversion lift.",
    challenge: "Old website converting at 1.2% with 4.8s load time, losing leads to faster competitors.",
    results: [
      { val: "99", label: "LIGHTHOUSE", color: "var(--cs-yellow)" },
      { val: "+68%", label: "CVR LIFT", color: "var(--cs-cyan)" },
      { val: "<1.2s", label: "LOAD TIME", color: "var(--cs-blue)" },
    ],
    pills: ["Next.js", "Google Ads", "CRO", "Analytics"],
    duration: "60 DAYS",
    quote: "Every slide we now show to investors has our Lighthouse score on it. TECLOUDEX built something we're genuinely proud of.",
    author: "Ankit Joshi", role: "CTO, FinFlow",
    serviceFilter: "Web Dev",
  },
  {
    id: "propedge",
    industry: "Real Estate", service: "Brand", serviceTag: "Brand + Digital",
    company: "PropEdge", color: "#f4a23a",
    tagline: "Full rebrand. 3× lead quality overnight.",
    challenge: "Premium real estate brand perceived as mid-market. Losing high-value leads to competitors.",
    results: [
      { val: "3×", label: "LEAD QUALITY", color: "var(--cs-yellow)" },
      { val: "+180%", label: "BRAND RECALL", color: "var(--cs-pink)" },
      { val: "₹420", label: "CPL", color: "var(--cs-blue)" },
    ],
    pills: ["Brand Identity", "Meta Ads", "SEO", "Video"],
    duration: "120 DAYS",
    quote: "The rebrand changed how we walk into every meeting. Clients started coming to us instead of the other way around.",
    author: "Suresh Iyer", role: "MD, PropEdge",
    serviceFilter: "Brand",
  },
  {
    id: "scaleops",
    industry: "B2B SaaS", service: "AI & Auto", serviceTag: "AI + Analytics",
    company: "ScaleOps", color: "#00d4ff",
    tagline: "340 hours saved per month with AI.",
    challenge: "Manual reporting and campaign management consuming 340+ hours of team time monthly.",
    results: [
      { val: "340hrs", label: "SAVED/MO", color: "var(--cs-cyan)" },
      { val: "94%", label: "TASK ACCURACY", color: "var(--cs-green)" },
      { val: "₹28K", label: "COST SAVED", color: "var(--cs-yellow)" },
    ],
    pills: ["AI Automation", "n8n", "HubSpot", "Analytics"],
    duration: "90 DAYS",
    quote: "The AI automation alone saves us 340 hours a month. It's like having an extra team of 5 people.",
    author: "Meera Patel", role: "COO, ScaleOps",
    serviceFilter: "AI & Auto",
  },
];

/* ─── DRAWER ─────────────────────────────────────────────────────────────── */
function DrawerChart({ id }) {
  const pts = {
    growthscale: [3, 5, 7, 10, 12, 14],
    brandbridge: [40, 90, 160, 240, 310, 340],
    novadtc:     [20, 180, 420],
    edunova:     [100, 140, 200, 290, 380, 480],
    finflow:     [1.2, 2.1, 3.4, 5.8, 7.2, 8.6],
    scaleops:    [340, 280, 200, 120, 60, 20],
    propedge:    [1, 1.5, 2, 2.6, 3],
  };
  const colors = {
    growthscale: "#00d4ff", brandbridge: "#4361ee", novadtc: "#d63af9",
    edunova: "#2dc653", finflow: "#8b5cf6", fintech: "#8b5cf6",
    scaleops: "#00d4ff", propedge: "#f4a23a",
  };
  const data = pts[id] || [10, 30, 50, 70, 90, 100];
  const color = colors[id] || "#4361ee";
  const W = 280, H = 110;
  const max = Math.max(...data);
  const xs = data.map((_, i) => (i / (data.length - 1)) * (W - 20) + 10);
  const ys = data.map(v => H - (v / max) * (H - 10) - 4);
  const path = xs.map((x, i) => `${i === 0 ? "M" : "L"} ${x} ${ys[i]}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H + 18}`} className="cs-drawer-chart-svg">
      <defs>
        <linearGradient id={`dg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L ${xs[xs.length-1]} ${H} L ${xs[0]} ${H} Z`}
        fill={`url(#dg-${id})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5"
        strokeLinecap="round" className="cs-chart-path" />
      <circle cx={xs[xs.length-1]} cy={ys[ys.length-1]} r="5" fill={color}
        style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
      {data.map((_, i) => (
        <text key={i} x={xs[i]} y={H + 14} textAnchor="middle"
          className="cs-chart-label">{i + 1}</text>
      ))}
    </svg>
  );
}

function Drawer({ caseId, onClose }) {
  const cs = CASES.find(c => c.id === caseId) ||
    (caseId === "growthscale" ? {
      id: "growthscale", company: "GrowthScale", industry: "E-Commerce",
      color: "#4361ee", tagline: "From 3× to 14× ROAS in 5 months.",
      results: [
        { val: "14×", label: "ROAS", color: "var(--cs-blue)" },
        { val: "₹2.4Cr", label: "REVENUE", color: "var(--cs-yellow)" },
        { val: "↓42%", label: "CPA", color: "var(--cs-green)" },
      ],
      pills: ["Meta Ads", "Google Shopping", "Email", "Attribution"],
      duration: "150 DAYS",
      quote: "The numbers speak for themselves but what really impressed us was the depth of thinking behind every decision.",
      author: "Arjun Mehta", role: "CMO, GrowthScale",
    } : null);

  if (!cs) return null;

  const steps = [
    { title: "Deep Audit", desc: "Forensic analysis of existing accounts, pixels, attribution setup, and creative performance. Identified 6 major funnel leaks." },
    { title: "Strategy Build", desc: "Built a bespoke cross-channel media plan with tiered audience architecture, creative testing framework, and attribution model." },
    { title: "Launch & Test", desc: "48 ad variations across 3 formats. Weekly creative reviews. Eliminated non-performers within 14 days." },
    { title: "Scale", desc: "Doubled budget on winning audience-creative combinations. Expanded to Google Shopping. Implemented email retention flows." },
  ];

  return (
    <div className="cs-drawer-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="cs-drawer">
        <button className="cs-drawer-close" onClick={onClose}>✕</button>
        <div className="cs-drawer-inner">
          <div className="cs-drawer-left">
            <div className="cs-drawer-meta">
              <span className="cs-ind-tag">{cs.industry}</span>
              <span className="cs-duration-badge">{cs.duration || "90 DAYS"}</span>
            </div>
            <h2 className="cs-drawer-title" style={{ color: cs.color }}>{cs.company}</h2>
            <p className="cs-drawer-tagline">{cs.tagline}</p>

            <div className="cs-drawer-section-label">THE CHALLENGE</div>
            <p className="cs-drawer-text">{cs.challenge || "The client faced significant growth obstacles in their primary acquisition channels."}</p>

            <div className="cs-drawer-section-label">OUR APPROACH</div>
            {steps.map((s, i) => (
              <div className="cs-drawer-step" key={i}>
                <div className="cs-drawer-step-num" style={{ color: cs.color }}>0{i + 1}</div>
                <div>
                  <div className="cs-drawer-step-title">{s.title}</div>
                  <div className="cs-drawer-step-desc">{s.desc}</div>
                </div>
              </div>
            ))}

            <div className="cs-drawer-section-label">THE RESULTS</div>
            <div className="cs-drawer-results">
              {cs.results.map(r => (
                <div className="cs-drawer-result" key={r.label}>
                  <div className="cs-drawer-result-val" style={{ color: r.color }}>{r.val}</div>
                  <div className="cs-drawer-result-label">{r.label}</div>
                </div>
              ))}
            </div>

            <blockquote className="cs-drawer-quote">
              <span className="cs-quote-mark">❝</span>
              {cs.quote}
              <span className="cs-quote-mark">❞</span>
              <footer className="cs-quote-footer">— {cs.author}, {cs.role}</footer>
            </blockquote>

            <Pills list={cs.pills} color={cs.color} />
            <button className="cs-btn-outline cs-drawer-back" onClick={onClose}>← Back to Case Studies</button>
          </div>
          <div className="cs-drawer-right">
            <MacWindow title={`TECLOUDEX · ${cs.company.toUpperCase()} DASHBOARD`} className="cs-drawer-mac">
              <div className="cs-drawer-kpis">
                {cs.results.map(r => (
                  <div className="cs-kpi-card" key={r.label}>
                    <div className="cs-kpi-label">{r.label}</div>
                    <div className="cs-kpi-val" style={{ color: r.color }}>{r.val}</div>
                  </div>
                ))}
              </div>
              <div className="cs-drawer-chart-label">GROWTH TRAJECTORY</div>
              <DrawerChart id={cs.id} />
            </MacWindow>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CASE CARD ──────────────────────────────────────────────────────────── */
function CaseCard({ cs, onOpen, dimmed }) {
  return (
    <div
      className={`cs-card${dimmed ? " cs-card-dimmed" : ""}`}
      style={{ "--card-color": cs.color }}
    >
      <div className="cs-card-accent" />
      <div className="cs-card-header">
        <span className="cs-ind-tag">{cs.industry}</span>
        <span className="cs-service-tag" style={{ color: cs.color }}>
          <span className="cs-service-dot" style={{ background: cs.color }} />{cs.serviceTag}
        </span>
      </div>
      <h3 className="cs-card-company">{cs.company}</h3>
      <p className="cs-card-tagline">{cs.tagline}</p>
      <p className="cs-card-challenge">{cs.challenge}</p>
      <div className="cs-card-results">
        {cs.results.map(r => (
          <div className="cs-card-result" key={r.label}>
            <div className="cs-card-result-val" style={{ color: r.color }}>{r.val}</div>
            <div className="cs-card-result-label">{r.label}</div>
          </div>
        ))}
      </div>
      <div className="cs-card-footer">
        <Pills list={cs.pills} />
        <div className="cs-card-bottom">
          <span className="cs-duration-badge">{cs.duration}</span>
          <button className="cs-card-link" onClick={() => onOpen(cs.id)}>Read Case Study →</button>
        </div>
      </div>
    </div>
  );
}

/* ─── CASE GRID ──────────────────────────────────────────────────────────── */
function CaseGrid({ industryFilter, serviceFilter, onOpen }) {
  const [ref, visible] = useInView(0.05);
  const filtered = CASES.filter(c => {
    const indMatch = industryFilter === "All" || c.industry === industryFilter;
    const svcMatch = serviceFilter === "All Services" || c.serviceFilter === serviceFilter;
    return indMatch && svcMatch;
  });

  return (
    <section className="cs-grid-section" ref={ref}>
      <div className={`cs-grid${visible ? " cs-visible" : ""}`}>
        {CASES.map((cs, i) => {
          const show = (industryFilter === "All" || cs.industry === industryFilter) &&
            (serviceFilter === "All Services" || cs.serviceFilter === serviceFilter);
          return (
            <div key={cs.id} style={{ animationDelay: `${i * 0.07}s` }}>
              <CaseCard cs={cs} onOpen={onOpen} dimmed={!show} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─── STATS TICKER ───────────────────────────────────────────────────────── */
function StatsTicker() {
  const [ref, visible] = useInView(0.2);
  const stats = [
    { raw: "180", display: "₹180M+", prefix: "₹", suffix: "M+", label: "TOTAL REVENUE GENERATED" },
    { raw: "14",  display: "14×",    prefix: "", suffix: "×",  label: "AVERAGE ROAS" },
    { raw: "350", display: "350+",   prefix: "", suffix: "+",  label: "BRANDS SERVED" },
    { raw: "98",  display: "98%",    prefix: "", suffix: "%",  label: "CLIENT RETENTION" },
    { raw: "12",  display: "₹12Cr",  prefix: "₹", suffix: "Cr", label: "MONTHLY AD SPEND" },
    { raw: "47",  display: "47K+",   prefix: "", suffix: "K+", label: "MONTHLY CONVERSIONS" },
  ];
  return (
    <section className="cs-ticker-section" ref={ref}>
      <div className="cs-eyebrow">—— ACROSS ALL CLIENTS ——</div>
      <div className="cs-ticker-row">
        {stats.map((s, i) => {
          const count = useCountUp(s.raw, 1800, visible);
          return (
            <div className="cs-ticker-cell" key={s.label}>
              <div className="cs-ticker-glow" />
              <div className="cs-ticker-big">
                {s.prefix}{Math.floor(count)}{s.suffix}
              </div>
              <div className="cs-ticker-label">{s.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─── INDUSTRY BREAKDOWN ─────────────────────────────────────────────────── */
const INDUSTRY_DATA = [
  {
    tab: "🛒 E-Commerce", color: "#4361ee",
    title: "E-Commerce", tagline: "Turn ad spend into compounding revenue.",
    stats: [{ v: "14×", l: "AVG ROAS" }, { v: "-42%", l: "AVG CPA" }, { v: "+38%", l: "CVR LIFT" }],
    bullets: ["Full-funnel Meta + Google architecture", "Creative testing at scale (48+ variants/client)", "Server-side attribution + BigQuery reporting"],
    clients: ["GrowthScale", "NovaDTC", "StyleHub", "FreshCart"],
    cta: "See E-Commerce Results →",
    chartData: [3, 5, 7, 10, 12, 14], chartColor: "#4361ee",
  },
  {
    tab: "💼 B2B SaaS", color: "#00d4ff",
    title: "B2B SaaS", tagline: "Qualified pipeline, not just leads.",
    stats: [{ v: "₹1,800", l: "AVG CPL" }, { v: "68%", l: "SQL→DEMO" }, { v: "₹2.4Cr", l: "PIPELINE/MO" }],
    bullets: ["LinkedIn ABM campaigns mapped to ICP", "HubSpot/Salesforce integration & lead scoring", "Content-led SEO for high-intent B2B terms"],
    clients: ["BrandBridge", "ScaleOps", "CloudStack", "DataPilot"],
    cta: "See B2B Results →",
    chartData: [40, 90, 160, 240, 310, 340], chartColor: "#00d4ff",
  },
  {
    tab: "👗 D2C Brand", color: "#d63af9",
    title: "D2C Brand", tagline: "From launch to market leader.",
    stats: [{ v: "12×", l: "AVG ROAS" }, { v: "₹4.2Cr", l: "LAUNCH REV" }, { v: "-42%", l: "CAC DROP" }],
    bullets: ["Paid-organic flywheel from day one", "Email lifecycle automation (welcome → winback)", "Creative-first performance strategy with UGC"],
    clients: ["NovaDTC", "SkincareX", "UrbanFit", "GlowCo"],
    cta: "See D2C Results →",
    chartData: [20, 80, 200, 320, 380, 420], chartColor: "#d63af9",
  },
  {
    tab: "🎓 EdTech", color: "#2dc653",
    title: "EdTech", tagline: "Own the search. Own the market.",
    stats: [{ v: "+480%", l: "TRAFFIC" }, { v: "142", l: "TOP-3 KWS" }, { v: "₹18", l: "AVG CPL" }],
    bullets: ["Topical authority SEO content clusters", "YouTube + Google Ads funnel integration", "Landing page CRO for free trial signups"],
    clients: ["EduNova", "LearnFast", "SkillUp", "BrightPath"],
    cta: "See EdTech Results →",
    chartData: [100, 160, 230, 320, 400, 480], chartColor: "#2dc653",
  },
  {
    tab: "🏦 FinTech", color: "#8b5cf6",
    title: "FinTech", tagline: "Performance sites for regulated markets.",
    stats: [{ v: "99", l: "LIGHTHOUSE" }, { v: "+68%", l: "CVR LIFT" }, { v: "<1.2s", l: "LOAD TIME" }],
    bullets: ["Next.js + headless architecture for compliance-ready sites", "Google Ads + Meta conversion-optimised LPs", "Full analytics: GA4 + BigQuery + Looker"],
    clients: ["FinFlow", "PaySmart", "VaultX", "MoneyMap"],
    cta: "See FinTech Results →",
    chartData: [1.2, 2.2, 3.8, 5.5, 7.1, 8.6], chartColor: "#8b5cf6",
  },
  {
    tab: "🏠 Real Estate", color: "#f4a23a",
    title: "Real Estate", tagline: "Premium positioning. Premium leads.",
    stats: [{ v: "3×", l: "LEAD QUALITY" }, { v: "+180%", l: "BRAND RECALL" }, { v: "₹420", l: "AVG CPL" }],
    bullets: ["Full visual rebrand + digital identity system", "Meta lead gen campaigns with CRM integration", "Video production + YouTube awareness campaigns"],
    clients: ["PropEdge", "LuxNest", "UrbanHomes", "SkyLine"],
    cta: "See Real Estate Results →",
    chartData: [1, 1.4, 1.8, 2.3, 2.7, 3], chartColor: "#f4a23a",
  },
];

function IndustryMiniChart({ data, color, visible }) {
  const W = 280, H = 100;
  const max = Math.max(...data);
  const xs = data.map((_, i) => (i / (data.length - 1)) * (W - 16) + 8);
  const ys = data.map(v => H - (v / max) * (H - 12) - 4);
  const path = xs.map((x, i) => `${i === 0 ? "M" : "L"} ${x} ${ys[i]}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="cs-ind-chart-svg">
      <defs>
        <linearGradient id={`ig-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L ${xs[xs.length-1]} ${H} L ${xs[0]} ${H} Z`}
        fill={`url(#ig-${color.replace("#", "")})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray="800" strokeDashoffset={visible ? "0" : "800"}
        style={{ transition: "stroke-dashoffset 1.5s ease 0.2s" }} />
      <circle cx={xs[xs.length-1]} cy={ys[ys.length-1]} r="5" fill={color}
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s 1.7s" }} />
    </svg>
  );
}

function IndustryBreakdown() {
  const [active, setActive] = useState(0);
  const [ref, visible] = useInView(0.1);
  const [key, setKey] = useState(0);
  const ind = INDUSTRY_DATA[active];

  const handleTab = i => { setActive(i); setKey(k => k + 1); };

  return (
    <section className="cs-industry" ref={ref}>
      <div className="cs-eyebrow">—— BY INDUSTRY ——</div>
      <h2 className="cs-section-h2">Results across <span className="cs-accent-italic">every sector.</span></h2>
      <div className="cs-ind-tabs">
        {INDUSTRY_DATA.map((ind, i) => (
          <button
            key={ind.tab}
            className={`cs-ind-tab${active === i ? " cs-ind-active" : ""}`}
            style={{ "--ind-color": ind.color }}
            onClick={() => handleTab(i)}
          >{ind.tab}</button>
        ))}
      </div>
      <div className="cs-ind-content" key={key}>
        <div className="cs-ind-left">
          <h3 className="cs-ind-title" style={{ color: ind.color }}>{ind.title}</h3>
          <p className="cs-ind-tagline">{ind.tagline}</p>
          <div className="cs-stat-bar">
            {ind.stats.map(s => (
              <div className="cs-stat-cell" key={s.l}>
                <div className="cs-stat-val" style={{ color: ind.color }}>{s.v}</div>
                <div className="cs-stat-label">{s.l}</div>
              </div>
            ))}
          </div>
          <ul className="cs-ind-bullets">
            {ind.bullets.map(b => (
              <li key={b}><span className="cs-check" style={{ color: ind.color }}>✓</span>{b}</li>
            ))}
          </ul>
          <div className="cs-ind-clients">
            {ind.clients.map(c => <span key={c} className="cs-client-pill" style={{ borderColor: ind.color + "44" }}>{c}</span>)}
          </div>
          <button className="cs-btn-primary" style={{ background: `linear-gradient(135deg, ${ind.color}, ${ind.color}cc)`, boxShadow: `0 0 20px ${ind.color}44` }}>{ind.cta}</button>
        </div>
        <div className="cs-ind-right">
          <MacWindow title={`TECLOUDEX · ${ind.title.toUpperCase()} RESULTS`}>
            <div className="cs-ind-chart-label">PERFORMANCE TREND</div>
            <IndustryMiniChart data={ind.chartData} color={ind.chartColor} visible={true} />
            <div className="cs-ind-chart-note">Growth trajectory across active clients</div>
          </MacWindow>
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ───────────────────────────────────────────────────────── */
function Testimonials() {
  const [ref, visible] = useInView(0.1);
  const reviews = [
    {
      name: "Arjun Mehta", role: "CMO, GrowthScale", company: "E-COMMERCE",
      color: "#4361ee", result: "ROAS 14×",
      text: "The numbers speak for themselves but what really impressed us was the depth of thinking behind every decision. TECLOUDEX didn't just run ads — they rebuilt our entire acquisition architecture from first principles. When we hit 14× ROAS in month 4, our investors thought we'd made a mistake in the spreadsheet. We hadn't.",
    },
    {
      name: "Priya Sharma", role: "Founder, BrandBridge", company: "B2B SAAS",
      color: "#00c9b1", result: "340 SQLs/mo",
      text: "I've worked with three other agencies before TECLOUDEX. None of them connected the dots between paid, content, and CRM the way these guys do. The strategic thinking is genuinely different. We went from 40 SQLs a month to 340 in four months and our close rate is the highest it's ever been.",
    },
    {
      name: "Rahul Verma", role: "CEO, NovaDTC", company: "D2C BRAND",
      color: "#f4a23a", result: "₹4.2Cr · 90 days",
      text: "We launched with zero brand recognition and zero existing audience. TECLOUDEX built the entire growth engine from scratch — paid acquisition, email flows, SEO content, attribution. In 90 days we'd done ₹4.2Cr in revenue. That's not an agency result. That's a co-founder result.",
    },
  ];
  return (
    <section className="cs-section cs-testimonials" ref={ref}>
      <div className={`cs-section-inner${visible ? " cs-visible" : ""}`}>
        <div className="cs-eyebrow">—— STRAIGHT FROM CLIENTS ——</div>
        <h2 className="cs-section-h2">They tried other agencies.<br /><span className="cs-accent-italic">Then they found us.</span></h2>
        <div className="cs-testi-grid">
          {reviews.map((r, i) => (
            <div className="cs-testi-card" key={r.name}
              style={{ "--testi-color": r.color, animationDelay: `${i * 0.14}s` }}>
              <div className="cs-testi-company">{r.company}</div>
              <div className="cs-testi-stars">★★★★★</div>
              <p className="cs-testi-text">"{r.text}"</p>
              <div className="cs-testi-result" style={{ borderColor: r.color + "55", color: r.color }}>{r.result}</div>
              <div className="cs-testi-author">
                <div className="cs-testi-avatar" style={{ background: `linear-gradient(135deg, ${r.color}88, ${r.color})` }}>{r.name[0]}</div>
                <div>
                  <div className="cs-testi-name">{r.name}</div>
                  <div className="cs-testi-role">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESS ────────────────────────────────────────────────────────────── */
function Process() {
  const [ref, visible] = useInView(0.1);
  const steps = [
    { n: "01", title: "Deep Audit", desc: "Forensic analysis of your accounts, pixels, attribution, and creative. We map every leak in your funnel." },
    { n: "02", title: "Strategy Architecture", desc: "Bespoke cross-channel strategy with budget allocation, KPI framework, and a 90-day growth roadmap." },
    { n: "03", title: "Build & Launch", desc: "Creative production, campaign setup, tracking implementation, and go-live — within 48 hours of onboarding." },
    { n: "04", title: "Iterate Weekly", desc: "Weekly performance reviews, A/B tests, audience refinements. The system gets smarter every 7 days." },
    { n: "05", title: "Scale & Compound", desc: "Double down on winning signals. Expand channels, audiences, geographies. Results compound month over month." },
  ];
  return (
    <section className="cs-section cs-process" ref={ref}>
      <div className={`cs-section-inner${visible ? " cs-visible" : ""}`}>
        <div className="cs-eyebrow">—— HOW WE DO IT ——</div>
        <h2 className="cs-section-h2">Behind every result, <span className="cs-accent-italic">a system.</span></h2>
        <p className="cs-process-sub">Every case study above followed the same proven methodology. Not luck. Not guesswork. A repeatable growth system built around your specific market, audience, and goals.</p>
        <div className="cs-process-steps">
          {steps.map((s, i) => (
            <div className="cs-process-wrap" key={s.n}>
              <div className="cs-process-step">
                <div className="cs-process-num">{s.n}</div>
                <div className="cs-process-title">{s.title}</div>
                <div className="cs-process-desc">{s.desc}</div>
              </div>
              {i < steps.length - 1 && (
                <div className="cs-process-connector">
                  <svg viewBox="0 0 50 14" className="cs-connector-svg">
                    <line x1="0" y1="7" x2="50" y2="7"
                      stroke="rgba(67,97,238,0.45)" strokeWidth="1.5" strokeDasharray="5 3"
                      className={`cs-connector-line${visible ? " cs-line-draw" : ""}`}
                      style={{ transitionDelay: `${i * 0.2 + 0.5}s` }} />
                    <polygon points="44,3 50,7 44,11" fill="rgba(67,97,238,0.55)" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────────────────────── */
function CTA() {
  const [ref, visible] = useInView(0.15);
  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1, dur: Math.random() * 8 + 5, delay: Math.random() * 5,
  }));
  return (
    <section className="cs-cta" ref={ref}>
      <div className="cs-cta-glow" />
      <div className="cs-particles">
        {particles.map(p => (
          <div key={p.id} className="cs-particle"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }} />
        ))}
      </div>
      <div className={`cs-cta-inner${visible ? " cs-visible" : ""}`}>
        <div className="cs-badge-pill"><span className="cs-badge-icon">⊕</span>Your case study starts here</div>
        <h2 className="cs-cta-h2">
          Ready to become<br />
          <span className="cs-hero-accent">our next case study?</span>
        </h2>
        <p className="cs-cta-sub">Every result you've seen on this page started with one conversation. No pitch deck, no lock-in — just a free audit and an honest plan.</p>
        <div className="cs-cta-btns">
          <button className="cs-btn-primary cs-btn-xl">Book a Free Audit →</button>
          <button className="cs-btn-outline cs-btn-xl">See Our Services</button>
        </div>
        <div className="cs-trust-badges">
          <span>✓ Free 60-min strategy audit</span>
          <span>✓ Results in 30 days or we fix it</span>
          <span>✓ No lock-in contracts</span>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────────────── */
// function Footer() {
//   return (
//     <footer className="cs-footer">
//       <div className="cs-footer-grid">
//         <div className="cs-footer-brand">
//           <div className="cs-footer-logo">
//             <div className="cs-logo-icon">N</div>
//             <span className="cs-logo-text"><span>NEX</span><span className="cs-logo-accent">VORA</span></span>
//           </div>
//           <p className="cs-footer-tagline">A digital transformation partner for growth-stage companies ready to dominate their category online.</p>
//         </div>
//         {[
//           { title: "SERVICES", links: ["Performance Marketing", "SEO & Content", "Web Development", "Brand Identity", "AI & Automation", "Analytics"] },
//           { title: "COMPANY", links: ["About Us", "Case Studies", "Blog", "Careers"] },
//           { title: "CONTACT", links: ["hello@nexvora.com", "+91 98765 43210", "Chennai, IN", "Book a Call"] },
//         ].map(col => (
//           <div className="cs-footer-col" key={col.title}>
//             <div className="cs-footer-col-title">{col.title}</div>
//             {col.links.map(l => <div key={l} className="cs-footer-link">{l}</div>)}
//           </div>
//         ))}
//       </div>
//       <div className="cs-footer-bottom">
//         <span>© 2026 Nexvora Digital. All rights reserved.</span>
//         <div className="cs-socials">
//           {["X", "in", "ig", "yt"].map(s => <div key={s} className="cs-social-icon">{s}</div>)}
//         </div>
//       </div>
//     </footer>
//   );
// }

/* ─── ROOT ───────────────────────────────────────────────────────────────── */
export default function CaseStudies() {
  const [industry, setIndustry] = useState("All");
  const [service, setService] = useState("All Services");
  const [drawerOpen, setDrawerOpen] = useState(null);

  const filteredCount = CASES.filter(c => {
    const iMatch = industry === "All" || c.industry === industry;
    const sMatch = service === "All Services" || c.serviceFilter === service;
    return iMatch && sMatch;
  }).length;

  return (
    // <div className="cs-app">
    <>
      <Navbar />
      <Hero />
      <FilterBar
        industry={industry} setIndustry={setIndustry}
        service={service} setService={setService}
        count={filteredCount}
      />
      <FeaturedCase onOpen={setDrawerOpen} />
      <CaseGrid industryFilter={industry} serviceFilter={service} onOpen={setDrawerOpen} />
      <StatsTicker />
      <IndustryBreakdown />
      <Testimonials />
      <Process />
      <CTA />
      <Footer />
      {drawerOpen && <Drawer caseId={drawerOpen} onClose={() => setDrawerOpen(null)} />}
    {/* </div> */}
    </>
  );
}
