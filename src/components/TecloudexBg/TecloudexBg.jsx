import { useEffect, useRef, useState } from "react";
import "./TecloudexBg.css";

/* ─── PARTICLE CANVAS ─────────────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H;

    const COLORS = ["#4f8bff", "#a855f7", "#06b6d4", "#818cf8", "#38bdf8"];
    const particles = [];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function makeParticle() {
      return {
        x:    Math.random() * W,
        y:    Math.random() * H,
        r:    Math.random() * 1.8 + 0.3,
        vx:   (Math.random() - 0.5) * 0.35,
        vy:   (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.55 + 0.15,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
      };
    }

    resize();
    for (let i = 0; i < 140; i++) particles.push(makeParticle());

    // build connection pairs
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,130,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      drawConnections();
      particles.forEach(p => {
        // twinkle
        p.alpha += p.twinkleSpeed * p.twinkleDir;
        if (p.alpha > 0.7 || p.alpha < 0.1) p.twinkleDir *= -1;
        // move
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        // draw glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grad.addColorStop(0, p.color + "cc");
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.globalAlpha = p.alpha * 0.4;
        ctx.fill();
        // core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      animId = requestAnimationFrame(tick);
    }

    tick();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="tcx-canvas" />;
}

/* ─── GRID OVERLAY ────────────────────────────────────────────────────────── */
function GridOverlay() {
  return (
    <div className="tcx-grid-overlay">
      <svg className="tcx-grid-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="tcx-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(99,130,255,0.045)" strokeWidth="0.8"/>
          </pattern>
          <pattern id="tcx-grid-lg" width="256" height="256" patternUnits="userSpaceOnUse">
            <path d="M 256 0 L 0 0 0 256" fill="none" stroke="rgba(99,130,255,0.07)" strokeWidth="1.2"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tcx-grid)" />
        <rect width="100%" height="100%" fill="url(#tcx-grid-lg)" />
      </svg>
    </div>
  );
}

/* ─── FLOATING GLASSMORPHISM BLOBS ────────────────────────────────────────── */
function GlassBlobs() {
  const blobs = [
    { cls: "tcx-blob-1", color: "rgba(79,139,255,0.18)",  shadow: "rgba(79,139,255,0.3)" },
    { cls: "tcx-blob-2", color: "rgba(168,85,247,0.15)",  shadow: "rgba(168,85,247,0.25)" },
    { cls: "tcx-blob-3", color: "rgba(6,182,212,0.12)",   shadow: "rgba(6,182,212,0.2)" },
    { cls: "tcx-blob-4", color: "rgba(129,140,248,0.10)", shadow: "rgba(129,140,248,0.18)" },
    { cls: "tcx-blob-5", color: "rgba(56,189,248,0.08)",  shadow: "rgba(56,189,248,0.15)" },
  ];
  return (
    <div className="tcx-blobs">
      {blobs.map(b => (
        <div
          key={b.cls}
          className={`tcx-blob ${b.cls}`}
          style={{ background: b.color, boxShadow: `0 0 120px 60px ${b.shadow}` }}
        />
      ))}
    </div>
  );
}

/* ─── MESH GRADIENT LAYER ─────────────────────────────────────────────────── */
function MeshGradient() {
  return (
    <div className="tcx-mesh">
      <div className="tcx-mesh-node tcx-mn-1" />
      <div className="tcx-mesh-node tcx-mn-2" />
      <div className="tcx-mesh-node tcx-mn-3" />
      <div className="tcx-mesh-node tcx-mn-4" />
      <div className="tcx-mesh-node tcx-mn-5" />
    </div>
  );
}

/* ─── CIRCUIT LINES ───────────────────────────────────────────────────────── */
function CircuitLines() {
  return (
    <svg className="tcx-circuit" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="tcx-glow-filter">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
        <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#4f8bff" stopOpacity="0"/>
          <stop offset="50%"  stopColor="#4f8bff" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#4f8bff" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="cg2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#a855f7" stopOpacity="0"/>
          <stop offset="50%"  stopColor="#a855f7" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="cg3" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%"   stopColor="#06b6d4" stopOpacity="0"/>
          <stop offset="50%"  stopColor="#06b6d4" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* Horizontal circuit lines */}
      <g filter="url(#tcx-glow-filter)">
        <line x1="0" y1="180" x2="420" y2="180" stroke="url(#cg1)" strokeWidth="1" className="tcx-cl tcx-cl-1"/>
        <line x1="320" y1="320" x2="820" y2="320" stroke="url(#cg2)" strokeWidth="0.8" className="tcx-cl tcx-cl-2"/>
        <line x1="900" y1="160" x2="1440" y2="160" stroke="url(#cg1)" strokeWidth="1" className="tcx-cl tcx-cl-3"/>
        <line x1="600" y1="580" x2="1200" y2="580" stroke="url(#cg2)" strokeWidth="0.7" className="tcx-cl tcx-cl-4"/>
        <line x1="0" y1="720" x2="500" y2="720" stroke="url(#cg3)" strokeWidth="0.9" className="tcx-cl tcx-cl-5"/>
        <line x1="1100" y1="750" x2="1440" y2="750" stroke="url(#cg1)" strokeWidth="0.8" className="tcx-cl tcx-cl-6"/>

        {/* Vertical lines */}
        <line x1="420" y1="0" x2="420" y2="360" stroke="url(#cg3)" strokeWidth="0.8" className="tcx-cl tcx-cl-7"/>
        <line x1="820" y1="200" x2="820" y2="500" stroke="url(#cg1)" strokeWidth="0.7" className="tcx-cl tcx-cl-8"/>
        <line x1="1100" y1="400" x2="1100" y2="900" stroke="url(#cg2)" strokeWidth="0.8" className="tcx-cl tcx-cl-9"/>
        <line x1="240" y1="550" x2="240" y2="900" stroke="url(#cg3)" strokeWidth="0.6" className="tcx-cl tcx-cl-10"/>

        {/* Corner joints */}
        <circle cx="420" cy="180" r="3" fill="#4f8bff" opacity="0.6" className="tcx-node"/>
        <circle cx="820" cy="320" r="3" fill="#a855f7" opacity="0.6" className="tcx-node"/>
        <circle cx="1100" cy="580" r="3" fill="#06b6d4" opacity="0.6" className="tcx-node"/>
        <circle cx="240" cy="720" r="3" fill="#818cf8" opacity="0.5" className="tcx-node"/>

        {/* L-shaped segments */}
        <path d="M 420 180 L 420 320 L 820 320" fill="none" stroke="rgba(79,139,255,0.18)" strokeWidth="0.8"/>
        <path d="M 820 320 L 820 580 L 1100 580" fill="none" stroke="rgba(168,85,247,0.15)" strokeWidth="0.7"/>
        <path d="M 240 720 L 240 580 L 600 580" fill="none" stroke="rgba(6,182,212,0.15)" strokeWidth="0.6"/>
      </g>

      {/* Travelling light pulses */}
      <circle r="3" fill="#4f8bff" opacity="0.9" filter="url(#tcx-glow-filter)">
        <animateMotion dur="4s" repeatCount="indefinite" path="M 0 180 L 420 180 L 420 320 L 820 320"/>
      </circle>
      <circle r="2.5" fill="#a855f7" opacity="0.8" filter="url(#tcx-glow-filter)">
        <animateMotion dur="5.5s" repeatCount="indefinite" begin="1.5s" path="M 820 320 L 820 580 L 1100 580 L 1100 750 L 1440 750"/>
      </circle>
      <circle r="2" fill="#06b6d4" opacity="0.7" filter="url(#tcx-glow-filter)">
        <animateMotion dur="6s" repeatCount="indefinite" begin="2s" path="M 0 720 L 240 720 L 240 580 L 600 580"/>
      </circle>
      <circle r="2" fill="#38bdf8" opacity="0.6" filter="url(#tcx-glow-filter)">
        <animateMotion dur="7s" repeatCount="indefinite" begin="0.8s" path="M 900 160 L 1440 160"/>
      </circle>
    </svg>
  );
}

/* ─── GLASS PANELS ─────────────────────────────────────────────────────────── */
function GlassPanels() {
  return (
    <div className="tcx-glass-panels">
      <div className="tcx-gp tcx-gp-1" />
      <div className="tcx-gp tcx-gp-2" />
      <div className="tcx-gp tcx-gp-3" />
    </div>
  );
}

/* ─── NEON RINGS ──────────────────────────────────────────────────────────── */
function NeonRings() {
  return (
    <div className="tcx-rings">
      <div className="tcx-ring tcx-ring-1" />
      <div className="tcx-ring tcx-ring-2" />
      <div className="tcx-ring tcx-ring-3" />
    </div>
  );
}

/* ─── NOISE TEXTURE ────────────────────────────────────────────────────────── */
function NoiseTexture() {
  return (
    <svg className="tcx-noise" xmlns="http://www.w3.org/2000/svg">
      <filter id="tcx-noise-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
        <feBlend in="SourceGraphic" mode="overlay" result="blend"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#tcx-noise-filter)" opacity="0.025"/>
    </svg>
  );
}

/* ─── DEMO PAGE ─────────────────────────────────────────────────────────────── */
function TeCloudexDemo() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fn = e => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const services = [
    { icon: "⚡", label: "Web Development",    color: "#4f8bff" },
    { icon: "📊", label: "Digital Marketing",  color: "#a855f7" },
    { icon: "☁️", label: "Cloud Solutions",    color: "#06b6d4" },
    { icon: "🔒", label: "Cyber Security",     color: "#818cf8" },
    { icon: "🤖", label: "AI Integration",     color: "#38bdf8" },
    { icon: "📱", label: "Mobile Apps",        color: "#a78bfa" },
  ];

  const stats = [
    { num: "350+", label: "Projects Delivered" },
    { num: "98%",  label: "Client Satisfaction" },
    { num: "50+",  label: "Team Members" },
    { num: "12+",  label: "Years Experience" },
  ];

  return (
    <div className="tcx-demo">
      {/* NAVBAR */}
      <nav className="tcx-nav">
        <div className="tcx-nav-brand">
          <div className="tcx-nav-logo-icon">T</div>
          <span className="tcx-nav-name">
            <span className="tcx-nav-te">Te</span>
            <span className="tcx-nav-cloud">Cloud</span>
            <span className="tcx-nav-ex">ex</span>
          </span>
        </div>
        <ul className="tcx-nav-links">
          <li>Home</li><li>Services</li><li>About</li>
          <li>Portfolio</li><li>Contact</li>
        </ul>
        <div className="tcx-nav-right">
          <span className="tcx-nav-avail">
            <span className="tcx-nav-dot" />Available now
          </span>
          <button className="tcx-nav-cta">Get Started →</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="tcx-hero-section">
        {/* Dynamic spotlight following mouse */}
        <div
          className="tcx-spotlight"
          style={{
            left: `${mousePos.x * 100}%`,
            top:  `${mousePos.y * 100}%`,
          }}
        />

        <div className="tcx-hero-content">
          <div className="tcx-hero-badge">
            <span className="tcx-badge-pulse" />
            IT Services · Web · Cloud · Digital Growth
          </div>

          <h1 className="tcx-hero-h1">
            <span className="tcx-h1-line1">Build Smarter.</span>
            <span className="tcx-h1-line2">
              Scale <span className="tcx-h1-accent">Faster.</span>
            </span>
            <span className="tcx-h1-line3">
              Grow <span className="tcx-h1-accent2">Bigger.</span>
            </span>
          </h1>

          <p className="tcx-hero-sub">
            TeCloudex engineers high-performance digital solutions — from
            blazing-fast web platforms to AI-powered marketing systems. We turn
            ambitious ideas into market-leading products.
          </p>

          <div className="tcx-hero-btns">
            <button className="tcx-btn-primary">
              Start Your Project <span className="tcx-btn-arrow">→</span>
            </button>
            <button className="tcx-btn-ghost">View Our Work</button>
          </div>

          {/* Stats row */}
          <div className="tcx-stats-row">
            {stats.map(s => (
              <div className="tcx-stat" key={s.label}>
                <div className="tcx-stat-num">{s.num}</div>
                <div className="tcx-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — floating UI card */}
        <div className="tcx-hero-visual">
          <div className="tcx-visual-card tcx-vc-main">
            <div className="tcx-vc-header">
              <span className="tcx-vc-dot" style={{background:"#ff5f57"}}/>
              <span className="tcx-vc-dot" style={{background:"#ffbd2e"}}/>
              <span className="tcx-vc-dot" style={{background:"#28c940"}}/>
              <span className="tcx-vc-title">TECLOUDEX · LIVE DASHBOARD</span>
              <span className="tcx-vc-live"><span className="tcx-live-dot"/>LIVE</span>
            </div>
            <div className="tcx-vc-body">
              <div className="tcx-vc-kpis">
                {[
                  { l:"UPTIME",   v:"99.9%",  c:"#4f8bff" },
                  { l:"SITES",    v:"182",    c:"#a855f7" },
                  { l:"LEADS",    v:"↑2.4K",  c:"#06b6d4" },
                  { l:"ROAS",     v:"14×",    c:"#38bdf8" },
                ].map(k => (
                  <div className="tcx-kpi" key={k.l}>
                    <div className="tcx-kpi-label">{k.l}</div>
                    <div className="tcx-kpi-val" style={{color:k.c}}>{k.v}</div>
                  </div>
                ))}
              </div>
              {/* Sparkline bars */}
              <div className="tcx-sparkline">
                {[40,65,45,80,60,90,72,95,78,100,85,96].map((h,i) => (
                  <div
                    key={i} className="tcx-spark-bar"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}
                  />
                ))}
              </div>
              <div className="tcx-vc-footer">
                <span className="tcx-vc-status">● All systems operational</span>
                <span className="tcx-vc-time">Updated just now</span>
              </div>
            </div>
          </div>

          {/* Floating mini cards */}
          <div className="tcx-visual-card tcx-vc-mini tcx-vc-mini-1">
            <div className="tcx-mini-icon">🚀</div>
            <div className="tcx-mini-text">
              <div className="tcx-mini-val">+340%</div>
              <div className="tcx-mini-label">Organic Traffic</div>
            </div>
          </div>

          <div className="tcx-visual-card tcx-vc-mini tcx-vc-mini-2">
            <div className="tcx-mini-icon">⚡</div>
            <div className="tcx-mini-text">
              <div className="tcx-mini-val">&lt;1.2s</div>
              <div className="tcx-mini-label">Load Time</div>
            </div>
          </div>

          <div className="tcx-visual-card tcx-vc-mini tcx-vc-mini-3">
            <div className="tcx-mini-icon">💎</div>
            <div className="tcx-mini-text">
              <div className="tcx-mini-val">99/100</div>
              <div className="tcx-mini-label">Lighthouse</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className="tcx-services-strip">
        <div className="tcx-strip-eyebrow">—— WHAT WE BUILD ——</div>
        <h2 className="tcx-strip-h2">
          Full-stack digital excellence.
        </h2>
        <div className="tcx-services-grid">
          {services.map(s => (
            <div
              className="tcx-service-card"
              key={s.label}
              style={{ "--svc-color": s.color }}
            >
              <div className="tcx-svc-top-line" />
              <div className="tcx-svc-icon">{s.icon}</div>
              <div className="tcx-svc-label">{s.label}</div>
              <div className="tcx-svc-arrow">→</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─── MAIN BACKGROUND SYSTEM ─────────────────────────────────────────────── */
export default function TeCloudexBG() {
  return (
    <div className="tcx-root">
      {/* Layer 1 — Base gradient */}
      <div className="tcx-base" />
      {/* Layer 2 — Mesh gradient glows */}
      <MeshGradient />
      {/* Layer 3 — Animated blobs */}
      <GlassBlobs />
      {/* Layer 4 — Grid overlay */}
      <GridOverlay />
      {/* Layer 5 — Circuit lines SVG */}
      <CircuitLines />
      {/* Layer 6 — Particle canvas */}
      <ParticleCanvas />
      {/* Layer 7 — Neon rings */}
      <NeonRings />
      {/* Layer 8 — Glass panels */}
      <GlassPanels />
      {/* Layer 9 — Noise texture */}
      <NoiseTexture />
      {/* Layer 10 — Vignette */}
      <div className="tcx-vignette" />
      {/* Layer 11 — Demo page content */}
      <TeCloudexDemo />
    </div>
  );
}
