// import Navbar from "../components/Navbar/Navbar";
// import Hero from "../components/Servicepage/Hero/Hero";
// import ServiceSection from "../components/Servicepage/ServiceSection/ServiceSection";
// import Process from "../components/Servicepage/ProcessSection/Process";

// const ServicePage = () => {
//   return (
//     <>
//       <Navbar />
//       <Hero />
//       <ServiceSection />
//       <Process />
//     </>
//   );
// };

// export default ServicePage;


import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./ServicePage.css";
import Navbar from "../../components/Navbar/Navbar";
import { Footer } from '../../components/Sections/Sections';
import LinearBG from "../../components/LinearBG/LinearBG";
import  HeroCinematicBackground2 from "../../components/FallingLetters2/FallingLetters2";

// // ─── NAVBAR ───────────────────────────────────────────────────────────────────
// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
//       <div className="navbar-logo">
//         <div className="logo-icon">N</div>
//         <span className="logo-text"><span>TEC</span><span className="logo-accent">LOUDEX</span></span>
//       </div>
//       <ul className="navbar-links">
//         <li>Home</li>
//         <li>Work</li>
//         <li>About</li>
//         <li className="nav-active">Services</li>
//         <li>Contact</li>
//       </ul>
//       <div className="navbar-right">
//         <div className="available-badge">
//           <span className="green-dot"></span>
//           <span>Available now</span>
//         </div>
//         <button className="btn-get-started">Get Started →</button>
//       </div>
//     </nav>
//   );
// }


// ─── ORBITAL DIAGRAM ──────────────────────────────────────────────────────────
// function OrbitalDiagram() {
//   const nodes = [
//     { label: "PPC",   color: "#4361ee", x: 72, y: 22 },
//     { label: "SEO",   color: "#2dc653", x: 88, y: 48 },
//     { label: "WEB",   color: "#f4a23a", x: 80, y: 78 },
//     { label: "BRAND", color: "#d63af9", x: 50, y: 92 },
//     { label: "A.I.",  color: "#00d4ff", x: 20, y: 72 },
//     { label: "DATA",  color: "#8b5cf6", x: 16, y: 40 },
//   ];

//   return (
//     <div className="orbital-wrapper">
//       <div className="orbital-center">
//         <div className="center-ring">
//           <div className="center-text">
//             <span className="center-name">TECLOUDEX</span>
//             <span className="center-sub">CORE</span>
//           </div>
//         </div>
//       </div>
//       {nodes.map((n, i) => (
//         <div
//           key={n.label}
//           className="orbital-node"
//           style={{
//             left: `${n.x}%`,
//             top: `${n.y}%`,
//             "--node-color": n.color,
//             animationDelay: `${i * 0.4}s`,
//           }}
//         >
//           <div className="node-ring">
//             <span className="node-label">{n.label}</span>
//           </div>
//           <svg className="connector" viewBox="0 0 100 100" preserveAspectRatio="none">
//             <line x1="50" y1="50" x2="50" y2="50" className="connector-line" />
//           </svg>
//         </div>
//       ))}
//     </div>
//   );
// }

const nodes = [
  { label: "PPC",   color: "#4361ee" },
  { label: "SEO",   color: "#2dc653" },
  { label: "WEB",   color: "#f4a23a" },
  { label: "BRAND", color: "#d63af9" },
  { label: "A.I.",  color: "#00d4ff" },
  { label: "DATA",  color: "#8b5cf6" },
];

const CX = 260, CY = 260, RADIUS = 180;
const N  = nodes.length;
const NS = "http://www.w3.org/2000/svg";

function getPositions() {
  return nodes.map((_, i) => {
    const angle = (i * 2 * Math.PI) / N - Math.PI / 2;
    return {
      x: CX + RADIUS * Math.cos(angle),
      y: CY + RADIUS * Math.sin(angle),
    };
  });
}

function lerp(a, b, t)    { return a + (b - a) * t; }
function easeInOut(t)      { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

function OrbitalDiagram() {
  const svgRef = useRef(null);
  const rafRef = useRef(null);
  const positions = getPositions();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.innerHTML = "";

    // ── Defs: glow filters ──
    const defs = document.createElementNS(NS, "defs");
    nodes.forEach((n, i) => {
      const filter = document.createElementNS(NS, "filter");
      filter.setAttribute("id", `orbital-glow-${i}`);
      filter.setAttribute("x", "-100%"); filter.setAttribute("y", "-100%");
      filter.setAttribute("width", "300%"); filter.setAttribute("height", "300%");
      const blur = document.createElementNS(NS, "feGaussianBlur");
      blur.setAttribute("stdDeviation", "4");
      filter.appendChild(blur);
      defs.appendChild(filter);
    });
    svg.appendChild(defs);

    // ── Outer dashed orbit circle ──
    const outerCircle = document.createElementNS(NS, "circle");
    outerCircle.setAttribute("cx", CX);
    outerCircle.setAttribute("cy", CY);
    outerCircle.setAttribute("r", RADIUS);
    outerCircle.setAttribute("fill", "none");
    outerCircle.setAttribute("stroke", "rgba(255,255,255,0.04)");
    outerCircle.setAttribute("stroke-width", "1");
    outerCircle.setAttribute("stroke-dasharray", "3 8");
    svg.appendChild(outerCircle);

    // ── Hexagon outline connecting all nodes ──
    const hexPoly = document.createElementNS(NS, "polygon");
    hexPoly.setAttribute("points", positions.map(p => `${p.x},${p.y}`).join(" "));
    hexPoly.setAttribute("fill", "none");
    hexPoly.setAttribute("stroke", "rgba(255,255,255,0.07)");
    hexPoly.setAttribute("stroke-width", "1");
    hexPoly.setAttribute("stroke-dasharray", "4 6");
    svg.appendChild(hexPoly);

    // ── Spoke lines: center → each node ──
    positions.forEach((p) => {
      const line = document.createElementNS(NS, "line");
      line.setAttribute("x1", CX); line.setAttribute("y1", CY);
      line.setAttribute("x2", p.x); line.setAttribute("y2", p.y);
      line.setAttribute("stroke", "rgba(255,255,255,0.07)");
      line.setAttribute("stroke-width", "1");
      line.setAttribute("stroke-dasharray", "4 7");
      svg.appendChild(line);
    });

    // ── Spoke dots (one per node, ping-pong along spoke) ──
    const spokeDots = nodes.map((n, i) => {
      const g = document.createElementNS(NS, "g");

      const halo = document.createElementNS(NS, "circle");
      halo.setAttribute("r", "5");
      halo.setAttribute("fill", n.color);
      halo.setAttribute("opacity", "0.2");
      halo.setAttribute("filter", `url(#orbital-glow-${i})`);

      const dot = document.createElementNS(NS, "circle");
      dot.setAttribute("r", "2.8");
      dot.setAttribute("fill", n.color);
      dot.setAttribute("opacity", "0.9");

      g.appendChild(halo);
      g.appendChild(dot);
      svg.appendChild(g);
      return { g, dot, p: positions[i] };
    });

    // ── Hex perimeter traveller dot ──
    const hexG = document.createElementNS(NS, "g");
    const hexHalo = document.createElementNS(NS, "circle");
    hexHalo.setAttribute("r", "5");
    hexHalo.setAttribute("fill", "#fff");
    hexHalo.setAttribute("opacity", "0.12");
    const hexDot = document.createElementNS(NS, "circle");
    hexDot.setAttribute("r", "2.5");
    hexDot.setAttribute("fill", "#fff");
    hexDot.setAttribute("opacity", "0.45");
    hexG.appendChild(hexHalo);
    hexG.appendChild(hexDot);
    svg.appendChild(hexG);

    // ── Animation loop ──
    const SPOKE_PERIOD = 2200;
    const HEX_PERIOD   = 8000;
    const STAGGER      = 600;
    let start = null;

    function animate(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;

      // Spoke dots: ping-pong center ↔ node
      spokeDots.forEach(({ g, dot, p }, i) => {
        const offset = i * STAGGER;
        const t = ((elapsed + HEX_PERIOD - offset) % (SPOKE_PERIOD * 2)) / (SPOKE_PERIOD * 2);
        const progress = t < 0.5 ? easeInOut(t * 2) : easeInOut((1 - t) * 2);
        const x = lerp(CX, p.x, progress);
        const y = lerp(CY, p.y, progress);
        g.setAttribute("transform", `translate(${x},${y})`);
        const op = (0.55 + 0.45 * Math.sin(elapsed / 280 + i)).toFixed(2);
        dot.setAttribute("opacity", op);
      });

      // Hex perimeter dot: travels around hexagon edge
      const hexT  = (elapsed % HEX_PERIOD) / HEX_PERIOD;
      const edge  = hexT * N;
      const ei    = Math.floor(edge) % N;
      const ef    = edge - Math.floor(edge);
      const from  = positions[ei];
      const to    = positions[(ei + 1) % N];
      hexG.setAttribute(
        "transform",
        `translate(${lerp(from.x, to.x, ef)},${lerp(from.y, to.y, ef)})`
      );

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="orbital-wrapper">

      {/* SVG: connectors + animated dots */}
      <svg
        ref={svgRef}
        className="orbital-svg"
        viewBox="0 0 520 520"
      />

      {/* Center */}
      <div className="orbital-center">
        <div className="center-ring">
          <div className="center-text">
            <span className="center-name">TECLOUDEX</span>
            <span className="center-sub">CORE</span>
          </div>
        </div>
      </div>

      {/* Orbital nodes */}
      {nodes.map((n, i) => {
        const p = positions[i];
        return (
          <div
            key={n.label}
            className="orbital-node"
            style={{
              left: p.x,
              top:  p.y,
              "--node-color": n.color,
            }}
          >
            <div className="node-ring">
              <span className="node-label">{n.label}</span>
            </div>
          </div>
        );
      })}

    </div>
  );
}


// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="hero-section">
      <HeroCinematicBackground2 />
      <div className="hero-left">
        <div className="hero-badge">
          <span className="badge-icon">⊕</span>
          <span>6 Core Services · Full-Stack Digital</span>
        </div>
        <h1 className="hero-heading">
          Every Service.<br />
          <span className="hero-heading-accent">One Agency.</span>
        </h1>
        <p className="hero-sub">
          Six interconnected disciplines engineered to work together —<br />
          so your brand grows faster, smarter, and without gaps.
        </p>
        <div className="hero-buttons">
          <button
            type="button"
            className="btn-primary"
            onClick={() =>
              document.getElementById("service-01")?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
          >
            Start Exploring ↓
          </button>
          {/* <Link to="/" className="btn-outline">← Back to Home</Link> */}
          {/* <button className="btn-outline">← Back to Home</button> */}
          <Link to="/" className="btn-outline">
            ← Back to Home
          </Link>
        </div>
      </div>
      <div className="hero-right">
        <OrbitalDiagram />
      </div>
    </section>
  );
}

// ─── SERVICE TABS ─────────────────────────────────────────────────────────────
function ServiceTabs({ active, setActive }) {
  const tabs = [
    { label: "Performance", color: "#4361ee" },
    { label: "SEO",         color: "#2dc653" },
    { label: "Web Dev",     color: "#f4a23a" },
    { label: "Brand",       color: "#d63af9" },
    { label: "AI & Auto",   color: "#00d4ff" },
    { label: "Analytics",   color: "#8b5cf6" },
  ];
  return (
    <div className="service-tabs-bar">
      {tabs.map((t, i) => (
        <button
          key={t.label}
          className={`tab-btn${active === i ? " tab-active" : ""}`}
          onClick={() => {
            setActive(i);
            document
              .getElementById(`service-${String(i + 1).padStart(2, "0")}`)
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          style={{ "--tab-color": t.color }}
        >
          <span className="tab-dot" style={{ background: t.color }}></span>
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ─── ANIMATED LINE CHART ──────────────────────────────────────────────────────
function LineChart({ color = "#00d4ff", data, label }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.classList.add("animate");
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const pts = data || [10,30,20,50,40,70,60,90,80,100,95];
  const w = 400, h = 180;
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w);
  const ys = pts.map(v => h - (v / 100) * h);
  const path = xs.map((x, i) => `${i === 0 ? "M" : "L"} ${x} ${ys[i]}`).join(" ");
  const totalLen = 1000;

  return (
    <svg ref={ref} className="line-chart-svg" viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <linearGradient id={`lg-${label}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4361ee" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <path
        d={path}
        fill="none"
        stroke={`url(#lg-${label})`}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={totalLen}
        strokeDashoffset={totalLen}
        className="chart-path"
      />
      <circle cx={xs[xs.length-1]} cy={ys[ys.length-1]} r="6" fill={color} className="chart-dot" />
    </svg>
  );
}

// ─── STAT COUNTER ─────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        const start = performance.now();
        const num = parseFloat(target.replace(/[^0-9.]/g, ""));
        const tick = now => {
          const t = Math.min((now - start) / duration, 1);
          setCount(Math.floor(t * num));
          if (t < 1) requestAnimationFrame(tick);
          else setCount(num);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return [count, ref];
}

function StatCard({ value, label }) {
  const prefix = value.match(/^[^0-9]*/)?.[0] || "";
  const suffix = value.match(/[^0-9.]+$/)?.[0] || "";
  const [count, ref] = useCountUp(value);
  return (
    <div className="stat-card" ref={ref}>
      <div className="stat-value">{prefix}{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// ─── FEATURE CARD ─────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="feature-card reveal-item">
      <div className="feature-icon">{icon}</div>
      <div>
        <div className="feature-title">{title}</div>
        <div className="feature-desc">{desc}</div>
      </div>
    </div>
  );
}

// ─── TECH PILLS ───────────────────────────────────────────────────────────────
function TechPills({ pills }) {
  return (
    <div className="tech-pills">
      {pills.map(p => <span key={p} className="tech-pill">{p}</span>)}
    </div>
  );
}

// ─── MAC WINDOW ───────────────────────────────────────────────────────────────
function MacWindow({ title, children }) {
  return (
    <div className="mac-window">
      <div className="mac-titlebar">
        <span className="mac-dot red"></span>
        <span className="mac-dot yellow"></span>
        <span className="mac-dot green"></span>
        <span className="mac-title">{title}</span>
      </div>
      <div className="mac-body">{children}</div>
    </div>
  );
}

// ─── SERVICE 01 — PERFORMANCE MARKETING ──────────────────────────────────────
function PerformancePanel() {
  return (
    <MacWindow title="TECLOUDEX · CAMPAIGN ANALYTICS">
      <div className="panel-kpi-row">
        <div className="kpi-card">
          <div className="kpi-label">ROAS</div>
          <div className="kpi-val blue">12×</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">SPEND</div>
          <div className="kpi-val cyan">$48K</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">REVENUE</div>
          <div className="kpi-val yellow">$576K</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">CONV. RATE</div>
          <div className="kpi-val green">6.7%</div>
        </div>
      </div>
      <LineChart color="#00d4ff" label="perf" />
      <div className="panel-cpa-row">
        <div className="cpa-badge">
          <div className="cpa-label">CPA DROP</div>
          <div className="cpa-val">-42%</div>
        </div>
        <div className="cpa-split">
          <div className="split-label">$SPLIT</div>
          <div className="split-row"><div className="split-bar" style={{width:"42%",background:"#4361ee"}}></div><span>Google 42%</span></div>
          <div className="split-row"><div className="split-bar" style={{width:"29%",background:"#f4a23a"}}></div><span>Meta 29%</span></div>
          <div className="split-row"><div className="split-bar" style={{width:"18%",background:"#00d4ff"}}></div><span>LinkedIn 18%</span></div>
          <div className="split-row"><div className="split-bar" style={{width:"11%",background:"#555"}}></div><span>Other 11%</span></div>
        </div>
      </div>
    </MacWindow>
  );
}

// ─── SERVICE 02 — SEO ─────────────────────────────────────────────────────────
function SEOPanel() {
  const keywords = [
    { kw: "digital marketing agency", vol: "22K", rank: "#1", change: "↑+6" },
    { kw: "seo services india",       vol: "18K", rank: "#2", change: "↑+4" },
    { kw: "performance marketing",    vol: "14K", rank: "#3", change: "↑+2" },
    { kw: "google ads agency",        vol: "9.2K",rank: "#4", change: "↑+8" },
    { kw: "b2b content strategy",     vol: "6.8K", rank: "#5", change: "↑+11"},
  ];
  return (
    <MacWindow title="TECLOUDEX · SEO COMMAND CENTER">
      <div className="seo-organic">
        <span className="kpi-label">ORGANIC USERS</span>
        <span className="kpi-val green">+214%</span>
      </div>
      <div className="seo-da-row">
        <span className="kpi-label">DOMAIN AUTHORITY</span>
        <div className="da-bar-wrap">
          <div className="da-bar"></div>
        </div>
        <span className="kpi-val blue">80<small>/100</small></span>
      </div>
      <div className="seo-table-label">TOP KEYWORD RANKINGS</div>
      <table className="seo-table">
        <thead><tr><th>KEYWORD</th><th>VOL/MO</th><th>RANK</th><th>CHANGE</th></tr></thead>
        <tbody>
          {keywords.map(k => (
            <tr key={k.kw}>
              <td>{k.kw}</td>
              <td>{k.vol}</td>
              <td className="rank-col">{k.rank}</td>
              <td className="change-col green">{k.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </MacWindow>
  );
}

// ─── SERVICE 03 — WEB DEV ─────────────────────────────────────────────────────
function WebDevPanel() {
  const gauges = [
    { val: 99,  label: "PERF",   color: "#2dc653" },
    { val: 100, label: "A11Y",   color: "#4361ee" },
    { val: 100, label: "BEST P", color: "#f4a23a" },
    { val: 94,  label: "SEO",    color: "#00d4ff" },
  ];
  return (
    <MacWindow title="index.tsx — TECLOUDEX STUDIO">
      <div className="lh-label">LIGHTHOUSE PERFORMANCE</div>
      <div className="lh-gauges">
        {gauges.map(g => (
          <div key={g.label} className="lh-gauge">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="30" fill="none" stroke="#1a1d2e" strokeWidth="8"/>
              <circle
                cx="40" cy="40" r="30" fill="none"
                stroke={g.color} strokeWidth="8"
                strokeDasharray={`${(g.val / 100) * 188} 188`}
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
                className="gauge-arc"
              />
            </svg>
            <div className="gauge-val">{g.val}</div>
            <div className="gauge-label">{g.label}</div>
          </div>
        ))}
      </div>
      <div className="load-time-badge">LOAD TIME &lt;1.2s</div>
      <div className="code-snippet">
        <span className="code-blue">export default</span>{" "}
        <span className="code-yellow">function</span>{" "}
        <span className="code-green">HeroSection</span>
        <span className="code-white">() {"{"}</span><br/>
        <span className="code-indent"><span className="code-blue">return</span> <span className="code-white">&lt;</span><span className="code-green">section</span> <span className="code-yellow">className</span><span className="code-white">="hero"&gt;...&lt;/</span><span className="code-green">section</span><span className="code-white">&gt;</span></span>
        <br/><span className="code-white">{"}"}</span>
      </div>
    </MacWindow>
  );
}

// ─── SERVICE 04 — BRAND ───────────────────────────────────────────────────────
function BrandPanel() {
  const swatches = ["#3D5CF5","#0ECFCF","#F5A623","#a21caf","#1ED896","#04040C"];
  const labels =  ["#3D5CF5","#0ECFCF","#F5A623","#a21caf","#1ED896","#04040C"];
  return (
    <MacWindow title="TECLOUDEX · BRAND STUDIO">
      <div className="brand-recall-badge">
        <div className="kpi-label">BRAND RECALL</div>
        <div className="kpi-val pink">+180%</div>
      </div>
      <div className="brand-logo-ring-wrap">
        <div className="brand-logo-ring">
          <div className="brand-logo-center">
            <span className="brand-nex">TEC</span>
            <span className="brand-vora">LOUDEX</span>
          </div>
        </div>
      </div>
      <div className="brand-colour-label">BRAND COLOUR SYSTEM</div>
      <div className="brand-swatches">
        {swatches.map((c, i) => (
          <div key={c} className="swatch-item">
            <div className="swatch-block" style={{ background: c }}></div>
            <div className="swatch-label">{labels[i]}</div>
          </div>
        ))}
      </div>
    </MacWindow>
  );
}

// ─── SERVICE 05 — AI & AUTO ───────────────────────────────────────────────────
function AIPanel() {
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setTyping(p => !p), 1200);
    return () => clearInterval(t);
  }, []);
  return (
    <MacWindow title="TECLOUDEX · AI AUTOMATION FLOW">
      <div className="ai-pipeline">
        <div className="pipeline-node">
          <div className="pipeline-icon">📊</div>
          <div className="pipeline-node-label">DATA INPUT</div>
        </div>
        <div className="pipeline-arrow">▶</div>
        <div className="pipeline-node active">
          <div className="pipeline-icon">🧠</div>
          <div className="pipeline-node-label">AI ENGINE</div>
        </div>
        <div className="pipeline-arrow">▶</div>
        <div className="pipeline-node time-saved">
          <div className="pipeline-time-label">TIME SAVED</div>
          <div className="pipeline-time-val">340 hrs/mo</div>
        </div>
      </div>
      <div className="ai-chat-label">AI CHATBOT CONVERSATION</div>
      <div className="ai-chat">
        <div className="chat-bubble user">
          How can I improve my ROAS?
          <div className="chat-meta">User · 2:14 PM</div>
        </div>
        <div className="chat-bubble ai">
          Based on your last 30 days of data, tighten audience to 25–44 age group.
          <div className="chat-highlight">Expected ROAS lift: +22%</div>
          <div className="chat-meta green">Tecloudex AI · 2:14 PM</div>
        </div>
        {typing && (
          <div className="chat-typing">
            <span></span><span></span><span></span>
            <span className="typing-text"> AI typing...</span>
          </div>
        )}
      </div>
    </MacWindow>
  );
}

// ─── SERVICE 06 — ANALYTICS ───────────────────────────────────────────────────
function AnalyticsPanel() {
  return (
    <MacWindow title="TECLOUDEX · ANALYTICS SUITE">
      <div className="analytics-header">
        <div className="kpi-label">ATTRIBUTION</div>
        <div className="kpi-val cyan">100%</div>
      </div>
      <div className="analytics-label">REVENUE ATTRIBUTION</div>
      <div className="donut-wrap">
        <svg viewBox="0 0 160 160" className="donut-chart">
          <circle cx="80" cy="80" r="60" fill="none" stroke="#1a1d2e" strokeWidth="24"/>
          <circle cx="80" cy="80" r="60" fill="none" stroke="#4361ee" strokeWidth="24"
            strokeDasharray="158 378" strokeLinecap="round" transform="rotate(-90 80 80)" className="donut-arc"/>
          <circle cx="80" cy="80" r="60" fill="none" stroke="#f4a23a" strokeWidth="24"
            strokeDasharray="125 411" strokeLinecap="round" transform="rotate(60 80 80)" className="donut-arc"/>
          <circle cx="80" cy="80" r="60" fill="none" stroke="#2dc653" strokeWidth="24"
            strokeDasharray="75 461" strokeLinecap="round" transform="rotate(180 80 80)" className="donut-arc"/>
          <text x="80" y="85" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">100%</text>
        </svg>
        <div className="donut-legend">
          <div className="legend-item"><span className="legend-dot" style={{background:"#4361ee"}}></span>Paid Search 42%</div>
          <div className="legend-item"><span className="legend-dot" style={{background:"#f4a23a"}}></span>Social 33%</div>
          <div className="legend-item"><span className="legend-dot" style={{background:"#2dc653"}}></span>Organic 25%</div>
        </div>
      </div>
      <LineChart color="#8b5cf6" label="analytics" data={[20,35,25,55,45,65,55,75,70,88,95]} />
    </MacWindow>
  );
}

// ─── SERVICE SECTION ──────────────────────────────────────────────────────────
const SERVICES = [
  {
    num: "01", title: "Performance Marketing",
    tagline: "Turn every rupee into compounding returns.",
    body: "We architect full-funnel paid media strategies across Google, Meta, LinkedIn, and programmatic networks. From creative strategy and audience architecture to bid management and attribution modelling — every decision is data-driven and ROI-first.",
    stats: [{ v:"12×",label:"AVG ROAS"},{v:"$180M+",label:"AD SPEND MANAGED"},{v:"38%",label:"CVR LIFT"},{v:"-42%",label:"AVG CPA DROP"}],
    features: [
      { icon:"🎯", title:"Audience Architecture",         desc:"Hyper-segmented targeting across all funnel stages using first and third-party data." },
      { icon:"⚡", title:"Creative Strategy & Testing",   desc:"Continuous A/B and multivariate creative testing with statistical rigour." },
      { icon:"🔗", title:"Cross-Channel Attribution",     desc:"Multi-touch attribution models that reveal true channel contribution." },
    ],
    pills: ["Google Ads","Meta Ads","LinkedIn Ads","Programmatic","YouTube","Shopping","DV360"],
    cta: "Start a Campaign →",
    Panel: PerformancePanel,
  },
  {
    num: "02", title: "SEO & Content Strategy",
    tagline: "Rank. Own. Compound.",
    body: "We build search moats that grow in value every month. Technical audits, authority link building, and a content engine that answers your audience's exact questions — at every stage of the funnel.",
    stats: [{v:"+340%",label:"AVG TRAFFIC GROWTH"},{v:"142",label:"TOP-3 KEYWORDS"},{v:"4.8K",label:"BACKLINKS BUILT"}],
    features: [
      { icon:"🔧", title:"Technical SEO Overhaul",       desc:"Core Web Vitals, crawl health, schema markup, and structured data optimisation." },
      { icon:"✍️", title:"Content Velocity Engine",       desc:"Scalable topical authority content mapped to search intent." },
      { icon:"🌐", title:"Digital PR & Link Building",    desc:"High-authority editorial placements that move Domain Authority fast." },
    ],
    pills: ["Ahrefs","Semrush","Surfer SEO","Screaming Frog","Search Console","GA4"],
    cta: "Dominate Search →",
    Panel: SEOPanel,
  },
  {
    num: "03", title: "Web Development",
    tagline: "Fast. Scalable. Conversion-first.",
    body: "We design and engineer digital platforms that convert visitors into customers. From Next.js web apps to headless commerce — every project is built for speed, scalability, and measurable business outcomes.",
    stats: [{v:"99",label:"AVG LIGHTHOUSE SCORE"},{v:"+68%",label:"CONVERSION LIFT"},{v:"<1.2s",label:"AVG LOAD TIME"}],
    features: [
      { icon:"⚙️", title:"Performance Engineering",       desc:"Sub-1s load times with Next.js, ISR, edge functions, and CDN optimisation." },
      { icon:"🛒", title:"Headless Commerce",             desc:"Shopify, custom storefronts built for conversion." },
      { icon:"📐", title:"UX & Conversion Design",        desc:"Data-informed wireframes and UI that remove friction at every step." },
    ],
    pills: ["Next.js","React","TypeScript","Tailwind","Postgres","Vercel","Shopify"],
    cta: "Build My Site →",
    Panel: WebDevPanel,
  },
  {
    num: "04", title: "Brand Identity & Design",
    tagline: "Identities that demand attention.",
    body: "We craft visual identities that become competitive advantages. From logo design and brand systems to motion and campaign creative — everything is built to make your brand instantly recognisable and impossible to ignore.",
    stats: [{v:"+180%",label:"BRAND RECALL"},{v:"2×",label:"APP DOWNLOADS POST REBRAND"},{v:"48hr",label:"BRAND AUDIT TURNAROUND"}],
    features: [
      { icon:"🎨", title:"Logo & Brand System",           desc:"Comprehensive brand guidelines covering logo, typography, color, and usage rules." },
      { icon:"🖼️", title:"Campaign Creative",              desc:"Ad creative, social assets, and landing page design built to convert." },
      { icon:"🎬", title:"Motion & Video Identity",        desc:"Animated brand assets and video content that bring your identity to life." },
    ],
    pills: ["Figma","Adobe CC","Motion","Framer","Lottie","Webflow"],
    cta: "Build My Brand →",
    Panel: BrandPanel,
  },
  {
    num: "05", title: "AI & Automation",
    tagline: "Work smarter. Scale without headcount.",
    body: "We build custom AI solutions that plug directly into your marketing and operations stack. From intelligent chatbots and lead-scoring models to fully automated campaign workflows — we make your team 10× more productive.",
    stats: [{v:"340hrs",label:"SAVED PER MONTH"},{v:"$28K",label:"COST SAVED MONTHLY"},{v:"94%",label:"TASK ACCURACY"}],
    features: [
      { icon:"🤖", title:"Custom AI Chatbots",            desc:"LLM-powered bots trained on your brand voice, FAQs, and product catalogue." },
      { icon:"🔄", title:"Marketing Automation",          desc:"n8n, Zapier, and Make workflows that automate the full customer journey." },
      { icon:"📈", title:"Predictive Analytics",          desc:"ML models that forecast churn, LTV, and campaign outcomes." },
    ],
    pills: ["n8n","Make","Zapier","OpenAI","Pinecone","Langchain"],
    cta: "Automate My Stack →",
    Panel: AIPanel,
  },
  {
    num: "06", title: "Analytics & Insights",
    tagline: "Stop guessing. Start knowing.",
    body: "We build full-funnel analytics infrastructure that gives you true clarity on every marketing rupee. From GA4 implementation and BigQuery data warehousing to real-time Looker dashboards — you'll always know what's working.",
    stats: [{v:"+214%",label:"ORGANIC VISIBILITY"},{v:"100%",label:"ATTRIBUTION COVERAGE"},{v:"-30%",label:"WASTED AD SPEND"}],
    features: [
      { icon:"📊", title:"GA4 & Custom Dashboards",       desc:"Real-time Looker Studio dashboards connected to your full stack." },
      { icon:"🔗", title:"Attribution Modelling",         desc:"Multi-touch, data-driven attribution that reveals true channel value." },
      { icon:"🏗️", title:"Data Pipeline Architecture",    desc:"BigQuery + dbt pipelines that unify your customer data." },
    ],
    pills: ["GA4","BigQuery","Looker Studio","GTM","Segment","Mixpanel","dbt"],
    cta: "Get Full Visibility →",
    Panel: AnalyticsPanel,
  },
];

function ServiceSection({ service, index }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.classList.add("in-view");
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const { Panel } = service;
  return (
    <section ref={ref} className="service-section reveal-section" id={`service-${service.num}`}>
      <div className="service-left">
        <div className="service-num">SERVICE {service.num}</div>
        <h2 className="service-title">{service.title}</h2>
        <p className="service-tagline">{service.tagline}</p>
        <p className="service-body">{service.body}</p>
        <div className="stats-bar">
          {service.stats.map(s => <StatCard key={s.label} value={s.v} label={s.label} />)}
        </div>
        <div className="features-list">
          {service.features.map(f => <FeatureCard key={f.title} {...f} />)}
        </div>
        <TechPills pills={service.pills} />
        <button className="btn-primary service-cta">{service.cta}</button>
      </div>
      <div className="service-right">
        <Panel />
      </div>
    </section>
  );
}

// ─── HOW WE WORK ──────────────────────────────────────────────────────────────
function HowWeWork() {
  const steps = [
    { num:"01", title:"Discovery & Audit",       desc:"Deep-dive into your current digital performance, competitors, and market opportunity." },
    { num:"02", title:"Strategy & Roadmap",      desc:"A unified cross-channel strategy with clear milestones, KPIs, and budget allocation." },
    { num:"03", title:"Build & Launch",           desc:"Full execution across creative, technical, and media channels simultaneously." },
    { num:"04", title:"Optimise & Scale",         desc:"Continuous data-driven iteration every week, scaling what works." },
    { num:"05", title:"Expand",                   desc:"New channels, audiences, and territories as you grow." },
  ];
  return (
    <section className="how-section">
      <div className="section-eyebrow">—— HOW WE WORK ——</div>
      <h2 className="section-heading">Our <span className="accent-italic">engagement process</span></h2>
      <div className="process-steps">
        {steps.map((s, i) => (
          <div key={s.num} className="process-step reveal-item" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="step-num">{s.num}</div>
            <div className="step-title">{s.title}</div>
            <div className="step-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── GLOBAL STATS ─────────────────────────────────────────────────────────────
function GlobalStats() {
  const data = [
    { icon:"💰", val:"$180M+", label:"Revenue generated for clients" },
    { icon:"🚀", val:"350+",   label:"Successful projects delivered" },
    { icon:"📈", val:"14×",    label:"Average return on ad spend" },
    { icon:"🏆", val:"98%",    label:"Client satisfaction rate" },
  ];
  return (
    <section className="global-stats">
      {data.map((d, i) => (
        <div key={d.label} className="global-stat-cell">
          <div className="global-stat-icon">{d.icon}</div>
          <div className="global-stat-val">{d.val}</div>
          <div className="global-stat-label">{d.label}</div>
        </div>
      ))}
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Testimonials() {
  const reviews = [
    { stars:5, text:"Tecloudex transformed our entire digital presence. ROAS went from 2× to 14× in 6 months. Absolute game-changers.", name:"Arjun Mehta", role:"CMO, GrowthScale" },
    { stars:5, text:"Their SEO team took us from page 5 to position #1 for our top 20 keywords. Traffic up 340% and still climbing.", name:"Priya Sharma",  role:"Founder, BrandBridge" },
    { stars:5, text:"The AI automation alone saves us 340 hours a month. It's like having an extra team of 5 people.", name:"Rahul Verma",  role:"CEO, ScaleOps" },
  ];
  return (
    <section className="testimonials-section">
      <div className="section-eyebrow">—— WHAT CLIENTS SAY ——</div>
      <h2 className="section-heading">Trusted by <span className="accent-italic">builders</span></h2>
      <div className="testimonials-grid">
        {reviews.map(r => (
          <div key={r.name} className="testimonial-card reveal-item">
            <div className="stars">{"★".repeat(r.stars)}</div>
            <p className="testimonial-text">"{r.text}"</p>
            <div className="testimonial-author">
              <div className="author-avatar">{r.name[0]}</div>
              <div>
                <div className="author-name">{r.name}</div>
                <div className="author-role">{r.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
// function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer-grid">
//         <div className="footer-brand">
//           <div className="footer-logo">
//             <div className="logo-icon">N</div>
//             <span className="logo-text"><span>TEC</span><span className="logo-accent">LOUDEX</span></span>
//           </div>
//           <p className="footer-tagline">A digital transformation partner for growth-stage companies ready to dominate their category online.</p>
//         </div>
//         <div className="footer-col">
//           <div className="footer-col-title">SERVICES</div>
//           {["Performance Marketing","SEO & Content","Web Development","Brand Identity","AI & Automation","Analytics"].map(s => (
//             <div key={s} className="footer-link">{s}</div>
//           ))}
//         </div>
//         <div className="footer-col">
//           <div className="footer-col-title">COMPANY</div>
//           {["About Us","Case Studies","Blog","Careers"].map(s => (
//             <div key={s} className="footer-link">{s}</div>
//           ))}
//         </div>
//         <div className="footer-col">
//           <div className="footer-col-title">CONTACT</div>
//           <div className="footer-link">hello@tecloudex.com</div>
//           <div className="footer-link">+91950052027</div>
//           <div className="footer-link">Chennai, IN</div>
//           <div className="footer-link">Book a Call</div>
//         </div>
//       </div>
//       <div className="footer-bottom">
//         <span>© 2026 Tecloudex Digital. All rights reserved.</span>
//         <div className="social-icons">
//           {["X","in","ig","yt"].map(s => <div key={s} className="social-icon">{s}</div>)}
//         </div>
//       </div>
//     </footer>
//   );
// }

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal-item, .reveal-section").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <HeroSection />
      <div className="tabs-wrapper">
        <ServiceTabs active={activeTab} setActive={setActiveTab} />
      </div>
      <div className="services-wrapper">
        {SERVICES.map((svc, i) => (
          <ServiceSection key={svc.num} service={svc} index={i} />
        ))}
      </div>
      <GlobalStats />
      <HowWeWork />
      <Testimonials />
      <Footer />
    </div>
  );
}
