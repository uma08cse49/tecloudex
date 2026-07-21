import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom";
import "./About.css";
import Navbar from "../../components/Navbar/Navbar";
import { Footer } from '../../components/Sections/Sections';
import LinearBG from "../../components/LinearBG/LinearBG";
import AboutCinematicBackground from "../../components/AboutPageBackground/AboutCinematicBackground";

/* ─── UTILITY HOOKS ──────────────────────────────────────────────────────── */
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

/* ─── NAVBAR ─────────────────────────────────────────────────────────────── */
// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", fn);
//     return () => window.removeEventListener("scroll", fn);
//   }, []);
//   return (
//     <nav className={`ab-navbar${scrolled ? " ab-scrolled" : ""}`}>
//       <div className="ab-nav-logo">
//         <div className="ab-logo-icon">N</div>
//         <span className="ab-logo-text">
//           <span>TEC</span><span className="ab-logo-accent">CLOUDEX</span>
//         </span>
//       </div>
//       <ul className="ab-nav-links">
//         <li>Services</li><li>Work</li>
//         <li className="ab-nav-active">About</li>
//         <li>Digital Marketing</li><li>Contact</li>
//       </ul>
//       <div className="ab-nav-right">
//         <div className="ab-avail">
//           <span className="ab-green-dot" />
//           <span>Available now</span>
//         </div>
//         <button className="ab-btn-primary">Get Started →</button>
//       </div>
//     </nav>
//   );
// }

/* ─── HERO ───────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    // <LinearBG>
    <section className="ab-hero">

      <AboutCinematicBackground/>
      <div className="ab-hero-mesh">
        <div className="ab-mesh-glow ab-glow-1" />
        <div className="ab-mesh-glow ab-glow-2" />
        <div className="ab-mesh-glow ab-glow-3" />
      </div>
      <div className="ab-hero-inner">
        <div className="ab-badge-pill">
          <span className="ab-badge-icon">⊕</span>
          About TECLOUDEX · Our Story
        </div>
        <h1 className="ab-hero-h1">
          <span className="ab-hero-line1">We are not</span>
          <span className="ab-hero-line2">just an agency.</span>
          <span className="ab-hero-line3">
            We are your{" "}
            <span className="ab-hero-accent">growth engine.</span>
          </span>
        </h1>
        <p className="ab-hero-sub">
          TECLOUDEX was built on a single belief: that great marketing is a science,
          not a guess. We combine elite talent, proprietary data systems, and
          relentless execution to turn ambitious brands into category leaders.
        </p>
        <div className="ab-hero-btns">
          <a href="#team-section" className="ab-btn-primary ab-btn-lg">Meet the Team ↓</a>
          <button className="ab-btn-outline ab-btn-lg">See Our Work →</button>
        </div>
        <div className="ab-scroll-indicator">
          <span className="ab-scroll-arrow">↓</span>
        </div>
      </div>
    </section>
    // </LinearBG>
  );
}

/* ─── ORIGIN STORY ───────────────────────────────────────────────────────── */
function StatCountUp({ target, suffix = "", prefix = "", active }) {
  const count = useCountUp(target, 1800, active);
  const num = parseFloat(String(target).replace(/[^0-9.]/g, ""));
  return (
    <span>{prefix}{num % 1 !== 0 ? count.toFixed(1) : Math.floor(count)}{suffix}</span>
  );
}

function OriginStory() {
  const [ref, visible] = useInView(0.15);
  const milestones = [
    {
      year: "2019",
      text: "TECLOUDEX was founded in Chennai, Tamil Nadu by a team of performance marketers frustrated by agencies that prioritised retainers over results. We started with one client, one spreadsheet, and one obsession: making every rupee work harder.",
    },
    {
      year: "2021",
      text: "After proving our model across 50+ clients, we expanded into SEO, web development, and brand design — building the full-stack capability that lets us architect connected growth systems, not isolated campaigns.",
    },
    {
      year: "2024",
      text: "We launched our proprietary AI & analytics practice, embedding machine learning directly into campaign management. Today, TECLOUDEX manages over ₹12Cr in monthly ad spend for 350+ brands across India, UAE, UK, and the US.",
    },
  ];
  const stats = [
    { val: "2019", label: "FOUNDED", prefix: "", suffix: "" },
    { val: "350", label: "BRANDS SERVED", prefix: "", suffix: "+" },
    { val: "180", label: "REVENUE GENERATED", prefix: "₹", suffix: "M+" },
    { val: "6", label: "DISCIPLINES MASTERED", prefix: "", suffix: "" },
  ];

  return (
    <section className="ab-section ab-origin" ref={ref}>
      <div className={`ab-origin-inner${visible ? " ab-visible" : ""}`}>
        <div className="ab-origin-left">
          <div className="ab-eyebrow">—— OUR STORY ——</div>
          <h2 className="ab-section-h2 ab-left">
            Built in Chennai.<br />
            <span className="ab-accent-italic">Built for the world.</span>
          </h2>
          <div className="ab-timeline">
            {milestones.map((m, i) => (
              <div
                className="ab-timeline-item"
                key={m.year}
                style={{ animationDelay: `${i * 0.18}s` }}
              >
                <div className="ab-year-pill">{m.year}</div>
                <p className="ab-timeline-text">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="ab-origin-right">
          <div className="ab-numbers-card">
            <div className="ab-numbers-title">TECLOUDEX BY THE NUMBERS</div>
            <div className="ab-numbers-grid">
              {stats.map(s => (
                <div className="ab-number-cell" key={s.label}>
                  <div className="ab-number-val">
                    <StatCountUp
                      target={s.val}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      active={visible}
                    />
                  </div>
                  <div className="ab-number-label">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="ab-progress-section">
              <div className="ab-progress-label">FROM Chennai TO GLOBAL</div>
              <div className="ab-progress-track">
                <div className={`ab-progress-fill${visible ? " ab-fill-animate" : ""}`} />
              </div>
              <div className="ab-progress-markets">
                India · UAE · UK · US · SG · AU
              </div>
            </div>
            <div className="ab-location-tag">📍 HQ: Chennai, IN 🇮🇳</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── MISSION VISION VALUES ──────────────────────────────────────────────── */
function MissionGauge({ visible }) {
  const metrics = ["ROAS", "Traffic", "Conv.", "LTV", "Brand", "Scale"];
  const r = 90;
  const cx = 120, cy = 120;
  return (
    <div className="ab-gauge-wrap">
      <svg viewBox="0 0 240 240" className="ab-gauge-svg">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(67,97,238,0.12)" strokeWidth="18" />
        <circle
          cx={cx} cy={cy} r={r} fill="none"
          stroke="url(#gaugeGrad)" strokeWidth="18"
          strokeLinecap="round"
          strokeDasharray={`${visible ? 2 * Math.PI * r * 0.78 : 0} ${2 * Math.PI * r}`}
          transform="rotate(-90 120 120)"
          className="ab-gauge-arc"
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4361ee" />
            <stop offset="100%" stopColor="#00d4ff" />
          </linearGradient>
        </defs>
        {metrics.map((m, i) => {
          const angle = (i / metrics.length) * 2 * Math.PI - Math.PI / 2;
          const lx = cx + (r + 26) * Math.cos(angle);
          const ly = cy + (r + 26) * Math.sin(angle);
          return (
            <text key={m} x={lx} y={ly} textAnchor="middle"
              dominantBaseline="middle" className="ab-gauge-label">{m}</text>
          );
        })}
        <text x={cx} y={cy - 10} textAnchor="middle" className="ab-gauge-big">14×</text>
        <text x={cx} y={cy + 16} textAnchor="middle" className="ab-gauge-sub">AVG ROAS</text>
      </svg>
    </div>
  );
}

function WorldMapCard() {
  const pins = [
    { x: 62, y: 52, label: "India", sub: "HQ · 280+ Clients", color: "#4361ee" },
    { x: 56, y: 44, label: "UAE", sub: "40+ Clients", color: "#00d4ff" },
    { x: 48, y: 34, label: "UK", sub: "20+ Clients", color: "#00c9b1" },
    { x: 22, y: 36, label: "US", sub: "15+ Clients", color: "#8b5cf6" },
    { x: 76, y: 57, label: "SG", sub: "12+ Clients", color: "#2dc653" },
    { x: 80, y: 68, label: "AU", sub: "8+ Clients", color: "#f4a23a" },
  ];
  return (
    <div className="ab-map-card">
      <div className="ab-mac-bar">
        <span className="ab-dot red" /><span className="ab-dot yellow" /><span className="ab-dot green" />
        <span className="ab-mac-title">TECLOUDEX · GLOBAL PRESENCE</span>
      </div>
      <div className="ab-map-body">
        <div className="ab-map-field">
          {/* Simplified continent blobs */}
          <div className="ab-continent" style={{ left: "8%", top: "25%", width: "28%", height: "42%" }} />
          <div className="ab-continent" style={{ left: "40%", top: "18%", width: "22%", height: "38%" }} />
          <div className="ab-continent" style={{ left: "52%", top: "20%", width: "32%", height: "48%" }} />
          <div className="ab-continent" style={{ left: "70%", top: "55%", width: "18%", height: "28%" }} />
          <div className="ab-continent" style={{ left: "18%", top: "55%", width: "14%", height: "30%" }} />
          {pins.map(p => (
            <div
              key={p.label}
              className="ab-map-pin"
              style={{ left: `${p.x}%`, top: `${p.y}%`, "--pin-color": p.color }}
            >
              <div className="ab-pin-dot" />
              <div className="ab-pin-ring ab-ring1" />
              <div className="ab-pin-ring ab-ring2" />
              <div className="ab-pin-tooltip">
                <div className="ab-pin-label">{p.label}</div>
                <div className="ab-pin-sub">{p.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MissionVisionValues() {
  const [ref, visible] = useInView(0.08);
  const values = [
    { icon: "🔬", name: "Data Over Opinions", desc: "Every decision is backed by numbers, not gut feelings.", color: "#4361ee" },
    { icon: "⚡", name: "Speed With Precision", desc: "We move fast without cutting corners. Urgency and accuracy coexist.", color: "#00d4ff" },
    { icon: "🔗", name: "Connected Thinking", desc: "No channel is an island. Every tactic serves the overall strategy.", color: "#00c9b1" },
    { icon: "🏆", name: "Obsession With Results", desc: "We measure ourselves by your outcomes, not our outputs.", color: "#2dc653" },
    { icon: "🔭", name: "Long-Term Mindset", desc: "We build compounding systems, not short-term spikes.", color: "#f4a23a" },
    { icon: "🤝", name: "Partnership Over Vendor", desc: "We act like a co-founder of your marketing team, not a supplier.", color: "#d63af9" },
  ];
  return (
    <section className="ab-section ab-mvv" ref={ref}>
      <div className="ab-eyebrow">—— WHAT DRIVES US ——</div>
      <h2 className="ab-section-h2">
        The beliefs that <span className="ab-accent-italic">shape everything.</span>
      </h2>

      {/* MISSION */}
      <div className={`ab-mvv-row${visible ? " ab-visible" : ""}`}>
        <div className="ab-mvv-left">
          <div className="ab-mvv-label">01 · MISSION</div>
          <h3 className="ab-mvv-title">"Make every marketing rupee compound."</h3>
          <p className="ab-mvv-body">
            We exist to build marketing systems that get smarter over time — where data, creative,
            and technology compound returns instead of just spending budgets. Our mission is to be
            the agency that makes ambitious brands grow faster than they thought possible.
          </p>
        </div>
        <div className="ab-mvv-right">
          <MissionGauge visible={visible} />
        </div>
      </div>

      {/* VISION */}
      <div className={`ab-mvv-row ab-mvv-row-rev${visible ? " ab-visible" : ""}`} style={{ animationDelay: "0.15s" }}>
        <div className="ab-mvv-right">
          <WorldMapCard />
        </div>
        <div className="ab-mvv-left">
          <div className="ab-mvv-label">02 · VISION</div>
          <h3 className="ab-mvv-title">"The agency of the future, built today."</h3>
          <p className="ab-mvv-body">
            Our vision is a world where every growth-stage brand has access to the same calibre of
            marketing intelligence as the world's biggest companies. We're building the systems,
            tools, and talent network to make that happen — from Chennai to every market on earth.
          </p>
        </div>
      </div>

      {/* VALUES */}
      <div className={`ab-values-section${visible ? " ab-visible" : ""}`} style={{ animationDelay: "0.25s" }}>
        <div className="ab-mvv-label" style={{ textAlign: "center", marginBottom: 8 }}>03 · VALUES</div>
        <h3 className="ab-mvv-title" style={{ textAlign: "center", marginBottom: 40 }}>
          "The code we never compromise on."
        </h3>
        <div className="ab-values-grid">
          {values.map((v, i) => (
            <div
              className="ab-value-card"
              key={v.name}
              style={{ "--val-color": v.color, animationDelay: `${i * 0.08}s` }}
            >
              <div className="ab-value-border" />
              <div className="ab-value-icon">{v.icon}</div>
              <div className="ab-value-name">{v.name}</div>
              <div className="ab-value-desc">{v.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TEAM ───────────────────────────────────────────────────────────────── */
function Team() {
  const [ref, visible] = useInView(0.08);
  const members = [
    { name: "Arjun Mehta", role: "FOUNDER & CEO", color: "#4361ee", tags: ["Strategy", "Vision", "Performance"], bio: "Ex-Google, obsessed with compounding returns and systems thinking." },
    { name: "Priya Sharma", role: "HEAD OF PERFORMANCE", color: "#00d4ff", tags: ["Paid Media", "ROAS", "Attribution"], bio: "Managed ₹100Cr+ in ad spend across Google, Meta, and programmatic." },
    { name: "Rahul Verma", role: "HEAD OF SEO & CONTENT", color: "#2dc653", tags: ["SEO", "Content", "Authority"], bio: "Built search moats for 80+ brands. Took 12 to position #1." },
    { name: "Sneha Kapoor", role: "HEAD OF WEB & TECH", color: "#00c9b1", tags: ["Next.js", "React", "CRO"], bio: "Every site she builds scores 99 on Lighthouse. No exceptions." },
    { name: "Vikram Nair", role: "HEAD OF BRAND", color: "#d63af9", tags: ["Identity", "Design", "Motion"], bio: "Former design lead at a Big 4 consultancy. Now building challenger brands." },
    { name: "Divya Krishnan", role: "HEAD OF AI & DATA", color: "#8b5cf6", tags: ["ML", "Analytics", "Automation"], bio: "PhD in machine learning. Turns raw data into unfair competitive advantages." },
    { name: "Karthik Rajan", role: "SENIOR STRATEGIST", color: "#f4a23a", tags: ["Strategy", "B2B", "SaaS"], bio: "10+ years building GTM strategies for SaaS companies across Asia." },
    { name: "Meera Patel", role: "CLIENT SUCCESS LEAD", color: "#4361ee", tags: ["Growth", "Retention", "CX"], bio: "98% client retention rate. Not a coincidence — it's her system." },
  ];

  const initials = name => name.split(" ").map(w => w[0]).join("");

  return (
    <section id="team-section" className="ab-section ab-team" ref={ref}>
      <div className={`ab-section-inner${visible ? " ab-visible" : ""}`}>
        <div className="ab-eyebrow">—— THE PEOPLE ——</div>
        <h2 className="ab-section-h2">
          Built by specialists.<br />
          <span className="ab-accent-italic">Led by obsessives.</span>
        </h2>
        <p className="ab-section-sub">
          Every person at TECLOUDEX was hired for one reason: they are genuinely world-class at what they do.
        </p>
        <div className="ab-team-grid">
          {members.map((m, i) => (
            <div
              className="ab-team-card"
              key={m.name}
              style={{ "--member-color": m.color, animationDelay: `${i * 0.07}s` }}
            >
              <div className="ab-avatar-ring">
                <div className="ab-avatar" style={{ background: `linear-gradient(135deg, ${m.color}88, ${m.color})` }}>
                  {initials(m.name)}
                </div>
              </div>
              <div className="ab-member-name">{m.name}</div>
              <div className="ab-member-role" style={{ color: m.color }}>{m.role}</div>
              <div className="ab-member-tags">
                {m.tags.map(t => <span key={t} className="ab-tag">{t}</span>)}
              </div>
              <p className="ab-member-bio">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CULTURE ────────────────────────────────────────────────────────────── */
function Culture() {
  const [ref, visible] = useInView(0.1);
  const cultureCards = [
    { icon: "🌍", title: "REMOTE-FIRST", desc: "Work from anywhere. Deliver everywhere." },
    { icon: "🚀", title: "OUTCOME-DRIVEN", desc: "Impact over hours. Always." },
    { icon: "🧠", title: "LEARNING CULTURE", desc: "Every team member has a ₹50K/year L&D budget." },
  ];
  const timeline = [
    { time: "09:00", event: "Weekly Strategy Sync", detail: "All hands · 30 min", color: "#4361ee" },
    { time: "10:00", event: "Campaign Optimisation", detail: "Live account reviews", color: "#00d4ff" },
    { time: "12:30", event: "Creative Review", detail: "New ad concepts · split-test ideas", color: "#00c9b1" },
    { time: "14:00", event: "Client Report Delivery", detail: "Automated + personalised", color: "#2dc653" },
    { time: "15:30", event: "Data Deep-Dive", detail: "Attribution modelling · insights", color: "#f4a23a" },
    { time: "17:00", event: "L&D Block", detail: "Reading · courses · experiments", color: "#8b5cf6" },
  ];
  return (
    <section className="ab-section ab-culture" ref={ref}>
      <div className={`ab-culture-inner${visible ? " ab-visible" : ""}`}>
        <div className="ab-culture-left">
          <div className="ab-eyebrow" style={{ textAlign: "left" }}>—— LIFE AT TECLOUDEX ——</div>
          <h2 className="ab-section-h2 ab-left">
            Where great work <span className="ab-accent-italic">gets done.</span>
          </h2>
          <p className="ab-culture-body">
            We're a remote-first team headquartered in Chennai, with team members across India,
            UAE, and the UK. We don't measure hours — we measure outcomes. We don't do meetings for
            the sake of meetings. We build systems that work while we sleep.
          </p>
          <div className="ab-culture-cards">
            {cultureCards.map(c => (
              <div className="ab-culture-card" key={c.title}>
                <div className="ab-culture-icon">{c.icon}</div>
                <div className="ab-culture-card-title">{c.title}</div>
                <div className="ab-culture-card-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="ab-culture-right">
          <div className="ab-day-card">
            <div className="ab-mac-bar">
              <span className="ab-dot red" /><span className="ab-dot yellow" /><span className="ab-dot green" />
              <span className="ab-mac-title">TECLOUDEX · TEAM DASHBOARD</span>
            </div>
            <div className="ab-day-body">
              <div className="ab-day-timeline">
                {timeline.map((t, i) => (
                  <div className="ab-day-item" key={t.time} style={{ "--tl-color": t.color, animationDelay: `${i * 0.1}s` }}>
                    <div className="ab-day-line-wrap">
                      <div className="ab-day-dot" />
                      {i < timeline.length - 1 && <div className={`ab-day-line${visible ? " ab-line-draw" : ""}`} style={{ transitionDelay: `${0.4 + i * 0.1}s` }} />}
                    </div>
                    <div className="ab-day-content">
                      <div className="ab-day-time">{t.time}</div>
                      <div className="ab-day-event">{t.event}</div>
                      <div className="ab-day-detail">{t.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ab-day-footer">📍 HQ: Chennai, IN · 🌐 Remote: India · UAE · UK</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── MILESTONES ─────────────────────────────────────────────────────────── */
function Milestones() {
  const [ref, visible] = useInView(0.1);
  const milestones = [
    { year: "2019", icon: "🚀", title: "Founded", desc: "Started with 1 client, ₹2L budget, and a Notion doc for strategy.", color: "#4361ee" },
    { year: "2020", icon: "📈", title: "First ₹1Cr Month", desc: "Crossed ₹1Cr in managed ad spend in month 14. All referrals, no pitch decks.", color: "#00d4ff" },
    { year: "2021", icon: "🌐", title: "Went Full-Stack", desc: "Launched SEO, Web Dev, and Brand practices. Became a one-agency solution.", color: "#00c9b1" },
    { year: "2022", icon: "🏆", title: "Agency of the Year", desc: "Recognised by the Digital Marketing Association of India.", color: "#f4a23a" },
    { year: "2022", icon: "🌍", title: "Went International", desc: "First clients in UAE and UK. Expanded team to 25 people.", color: "#2dc653" },
    { year: "2023", icon: "🤖", title: "Launched AI Practice", desc: "Embedded ML models into campaign management. 94% task accuracy.", color: "#8b5cf6" },
    { year: "2024", icon: "💰", title: "₹180M+ Revenue", desc: "Crossed ₹180M in cumulative client revenue generated.", color: "#d63af9" },
    { year: "2026", icon: "🎯", title: "350+ Brands Served", desc: "350+ growth-stage brands. Zero lock-in contracts.", color: "#4361ee" },
  ];
  return (
    <section className="ab-section ab-milestones" ref={ref}>
      <div className={`ab-section-inner${visible ? " ab-visible" : ""}`}>
        <div className="ab-eyebrow">—— OUR JOURNEY ——</div>
        <h2 className="ab-section-h2">
          7 years. <span className="ab-accent-italic">One direction.</span>
        </h2>
        <div className="ab-milestone-scroll">
          {milestones.map((m, i) => (
            <div
              className="ab-milestone-card"
              key={`${m.year}-${m.title}`}
              style={{ "--ms-color": m.color, animationDelay: `${i * 0.08}s` }}
            >
              <div className="ab-ms-accent-line" />
              <div className="ab-ms-icon">{m.icon}</div>
              <div className="ab-ms-year">{m.year}</div>
              <div className="ab-ms-title">{m.title}</div>
              <p className="ab-ms-desc">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── AWARDS ─────────────────────────────────────────────────────────────── */
function Awards() {
  const [ref, visible] = useInView(0.1);
  const awards = [
    { icon: "🏆", name: "Agency of the Year 2022", body: "Digital Marketing Association of India", year: "2022" },
    { icon: "🥇", name: "Best Performance Marketing Agency", body: "India Digital Awards", year: "2023" },
    { icon: "🎖️", name: "Top 50 Digital Agencies in India", body: "Marketing Week India", year: "2023" },
    { icon: "⭐", name: "Google Premier Partner", body: "Google India", year: "2024" },
    { icon: "🏅", name: "Best Use of AI in Marketing", body: "AdTech India Summit", year: "2024" },
    { icon: "💡", name: "Most Innovative Agency", body: "StartupIndia Marketing Awards", year: "2025" },
  ];
  return (
    <section className="ab-section ab-awards" ref={ref}>
      <div className={`ab-section-inner${visible ? " ab-visible" : ""}`}>
        <div className="ab-eyebrow">—— RECOGNITION ——</div>
        <h2 className="ab-section-h2">
          The industry <span className="ab-accent-italic">agrees.</span>
        </h2>
        <div className="ab-awards-grid">
          {awards.map((a, i) => (
            <div className="ab-award-card" key={a.name} style={{ animationDelay: `${i * 0.09}s` }}>
              <div className="ab-award-icon">{a.icon}</div>
              <div className="ab-award-name">{a.name}</div>
              <div className="ab-award-body">{a.body}</div>
              <div className="ab-award-year">{a.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CAREERS ────────────────────────────────────────────────────────────── */
function Careers() {
  const [ref, visible] = useInView(0.1);
  const perks = [
    { icon: "💰", title: "Competitive Pay", desc: "Top 10% of market rates for every role." },
    { icon: "🌍", title: "Remote-First", desc: "Work from anywhere in India or globally." },
    { icon: "📚", title: "L&D Budget", desc: "₹50K/year per person. Learn anything." },
    { icon: "🚀", title: "Fast Growth", desc: "Promotion cycles are quarterly, not annual." },
  ];
  const roles = [
    { title: "Senior Performance Marketing Manager", dept: "PAID MEDIA", level: "SENIOR", levelColor: "#00d4ff" },
    { title: "SEO & Content Strategist", dept: "SEO", level: "MID-LEVEL", levelColor: "#2dc653" },
    { title: "Full-Stack Developer (Next.js)", dept: "ENGINEERING", level: "SENIOR", levelColor: "#00d4ff" },
    { title: "AI/ML Engineer", dept: "AI & DATA", level: "LEAD", levelColor: "#d63af9" },
  ];
  return (
    <section className="ab-section ab-careers" ref={ref}>
      <div className={`ab-careers-inner${visible ? " ab-visible" : ""}`}>
        <div className="ab-careers-left">
          <div className="ab-eyebrow" style={{ textAlign: "left" }}>—— JOIN THE TEAM ——</div>
          <h2 className="ab-section-h2 ab-left">
            We're always looking for{" "}
            <span className="ab-accent-italic">exceptional people.</span>
          </h2>
          <p className="ab-careers-body">
            If you're the best at what you do and you want to work with brands that are genuinely
            trying to grow — we want to talk. We don't care where you're based. We care about the
            quality of your thinking.
          </p>
          <div className="ab-perks-grid">
            {perks.map(p => (
              <div className="ab-perk-card" key={p.title}>
                <div className="ab-perk-icon">{p.icon}</div>
                <div className="ab-perk-title">{p.title}</div>
                <div className="ab-perk-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="ab-careers-right">
          <div className="ab-roles-list">
            {roles.map(r => (
              <div className="ab-role-card" key={r.title}>
                <div className="ab-role-top">
                  <div className="ab-role-title">{r.title}</div>
                  <span
                    className="ab-role-level"
                    style={{ color: r.levelColor, borderColor: r.levelColor + "44" }}
                  >
                    {r.level}
                  </span>
                </div>
                <div className="ab-role-meta">
                  <span className="ab-role-dept">{r.dept}</span>
                  <span className="ab-role-loc">Remote · India</span>
                </div>
                <a href="#" className="ab-role-link">Apply Now →</a>
              </div>
            ))}
          </div>
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
      name: "Arjun Mehta", role: "CMO, GrowthScale", company: "E-COMMERCE", color: "#4361ee",
      text: "Before TECLOUDEX, we were burning ₹40L/month on Meta with a 3× ROAS and no real understanding of why. They rebuilt our entire funnel architecture in 6 weeks — audience strategy, creative framework, attribution model — and we hit 14× in month 4. I've never seen a team move that fast with that level of precision.",
      result: "ROAS 14×", resultColor: "#4361ee",
    },
    {
      name: "Priya Sharma", role: "Founder, BrandBridge", company: "B2B SAAS", color: "#00c9b1",
      text: "What sets TECLOUDEX apart is how they think. It's never just 'run the ads' — it's always about the system. They connected our LinkedIn campaigns to our HubSpot flows to our content calendar, and the result was a 68% SQL-to-demo rate that our sales team still can't believe. They're not an agency, they're a growth partner.",
      result: "+340 SQLs/mo", resultColor: "#00c9b1",
    },
    {
      name: "Rahul Verma", role: "CEO, NovaDTC", company: "D2C BRAND", color: "#f4a23a",
      text: "In 90 days, TECLOUDEX took us from launch to ₹4.2Cr in revenue. That's not hyperbole — that's the invoice total. The paid-organic flywheel they built compounds every month. Six months in, our CAC is down 42% and LTV is up 3×. I wish I'd found them earlier.",
      result: "₹4.2Cr · 90 days", resultColor: "#f4a23a",
    },
  ];
  return (
    <section className="ab-section ab-testimonials" ref={ref}>
      <div className={`ab-section-inner${visible ? " ab-visible" : ""}`}>
        <div className="ab-eyebrow">—— WHAT THEY SAY ——</div>
        <h2 className="ab-section-h2">
          350+ brands. <span className="ab-accent-italic">One common story.</span>
        </h2>
        <div className="ab-testi-grid">
          {reviews.map((r, i) => (
            <div
              className="ab-testi-card"
              key={r.name}
              style={{ "--testi-color": r.color, animationDelay: `${i * 0.14}s` }}
            >
              <div className="ab-testi-company">{r.company}</div>
              <div className="ab-testi-stars">★★★★★</div>
              <p className="ab-testi-text">"{r.text}"</p>
              <div className="ab-testi-result" style={{ borderColor: r.resultColor + "55", color: r.resultColor }}>
                {r.result}
              </div>
              <div className="ab-testi-author">
                <div
                  className="ab-testi-avatar"
                  style={{ background: `linear-gradient(135deg, ${r.color}88, ${r.color})` }}
                >
                  {r.name[0]}
                </div>
                <div>
                  <div className="ab-testi-name">{r.name}</div>
                  <div className="ab-testi-role">{r.role}</div>
                </div>
              </div>
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
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 8 + 5,
    delay: Math.random() * 6,
  }));
  return (
    <section className="ab-cta" ref={ref}>
      <div className="ab-cta-glow" />
      <div className="ab-particles">
        {particles.map(p => (
          <div
            key={p.id}
            className="ab-particle"
            style={{
              left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
      <div className={`ab-cta-inner${visible ? " ab-visible" : ""}`}>
        <div className="ab-badge-pill">⊕ Ready to grow?</div>
        <h2 className="ab-cta-h2">
          Let's build something<br />
          <span className="ab-hero-accent">your competitors fear.</span>
        </h2>
        <p className="ab-cta-sub">
          Whether you need one service or the full stack — we start with your goals and build
          backwards. No lock-in. No fluff. Just results.
        </p>
        <div className="ab-cta-btns">
          <button className="ab-btn-primary ab-btn-xl">Start the Conversation →</button>
          {/* <button className="ab-btn-outline ab-btn-xl">See Our Services</button> */}
           <Link to="/services" className="btn-outline">
            See Our Services
          </Link>
        </div>
        <div className="ab-trust-line">
          <span>✓ 48-hr onboarding</span>
          <span>✓ No long-term contracts</span>
          <span>✓ Results or we fix it</span>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────────────── */
// function Footer() {
//   return (
//     <footer className="ab-footer">
//       <div className="ab-footer-grid">
//         <div className="ab-footer-brand">
//           <div className="ab-footer-logo">
//             <div className="ab-logo-icon">N</div>
//             <span className="ab-logo-text">
//               <span>TEC</span><span className="ab-logo-accent">LOUDEX</span>
//             </span>
//           </div>
//           <p className="ab-footer-tagline">
//             A digital transformation partner for growth-stage companies ready to dominate their
//             category online.
//           </p>
//         </div>
//         {[
//           { title: "SERVICES", links: ["Performance Marketing", "SEO & Content", "Web Development", "Brand Identity", "AI & Automation", "Analytics"] },
//           { title: "COMPANY", links: ["About Us", "Case Studies", "Blog", "Careers"] },
//           { title: "CONTACT", links: ["hello@tecloudex.com", "+91950052027", "Chennai, IN", "Book a Call"] },
//         ].map(col => (
//           <div className="ab-footer-col" key={col.title}>
//             <div className="ab-footer-col-title">{col.title}</div>
//             {col.links.map(l => <div key={l} className="ab-footer-link">{l}</div>)}
//           </div>
//         ))}
//       </div>
//       <div className="ab-footer-bottom">
//         <span>© 2026 Tecloudex Digital. All rights reserved.</span>
//         <div className="ab-socials">
//           {["X", "in", "ig", "yt"].map(s => (
//             <div key={s} className="ab-social-icon">{s}</div>
//           ))}
//         </div>
//       </div>
//     </footer>
//   );
// }

/* ─── ROOT ───────────────────────────────────────────────────────────────── */
export default function About() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("ab-visible");
      }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".ab-reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    // <div className="ab-app">
    <>
      <Navbar />
      <Hero />
      <OriginStory />
      <MissionVisionValues />
      <Team />
      <Culture />
      <Milestones />
      <Awards />
      <Careers />
      <Testimonials />
      <CTA />
      <Footer />
    {/* </div> */}
    </>
  );
}
