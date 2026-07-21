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
import Navbar from "../../components/Navbar/Navbar";
import { Footer } from '../../components/Sections/Sections';
import "./Digitalmarketing.css";

/* ─── SHARED UTILITIES ───────────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
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

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseFloat(String(target).replace(/[^0-9.]/g, ""));
    const startTime = performance.now();
    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setCount(parseFloat((ease * num).toFixed(1)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, target, duration]);
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
//     <nav className={`dm-navbar${scrolled ? " scrolled" : ""}`}>
//       <div className="dm-nav-logo">
//         <div className="dm-logo-icon">N</div>
//         <span className="dm-logo-text"><span>TEC</span><span className="dm-logo-accent">LOUDEX</span></span>
//       </div>
//       <ul className="dm-nav-links">
//         <li>Services</li><li>Work</li><li>About</li>
//         <li className="dm-nav-active">Digital Marketing</li>
//         <li>Contact</li>
//       </ul>
//       <div className="dm-nav-right">
//         <div className="dm-avail">
//           <span className="dm-green-dot" /><span>Available now</span>
//         </div>
//         <button className="dm-btn-primary">Get Started →</button>
//       </div>
//     </nav>
//   );
// }

/* ─── HERO SECTION ───────────────────────────────────────────────────────── */
function HeroDashboard() {
  const [conv, setConv] = useState(247);
  useEffect(() => {
    const t = setInterval(() => setConv(c => c + Math.floor(Math.random() * 3 + 1)), 3000);
    return () => clearInterval(t);
  }, []);

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const revenue = [18,28,22,42,38,60,55,78,72,90,88,100];
  const spend   = [10,14,12,20,18,28,26,35,32,40,38,44];
  const W = 360, H = 130;
  const toX = i => (i / 11) * (W - 20) + 10;
  const toY = (v, max) => H - (v / max) * (H - 16) - 4;
  const pathD = (arr, max) => arr.map((v,i) => `${i===0?"M":"L"} ${toX(i)} ${toY(v,max)}`).join(" ");
  const revPath = pathD(revenue, 100);
  const spnPath = pathD(spend, 100);

  return (
    <div className="dm-mac-window dm-hero-dashboard">
      <div className="dm-mac-bar">
        <span className="dm-dot red"/><span className="dm-dot yellow"/><span className="dm-dot green"/>
        <span className="dm-mac-title">TECLOUDEX · LIVE DASHBOARD</span>
        <span className="dm-live-badge"><span className="dm-live-dot"/>LIVE</span>
      </div>
      <div className="dm-mac-body">
        <div className="dm-kpi-row">
          {[
            { label:"ROAS",    val:"14×",      color:"var(--dm-blue)" },
            { label:"REVENUE", val:"₹2.4Cr",   color:"var(--dm-yellow)" },
            { label:"CPA",     val:"₹280",     color:"var(--dm-cyan)" },
            { label:"CTR",     val:"6.8%",     color:"var(--dm-green)" },
          ].map(k => (
            <div className="dm-kpi-card" key={k.label}>
              <div className="dm-kpi-label">{k.label}</div>
              <div className="dm-kpi-val" style={{color:k.color}}>{k.val}</div>
            </div>
          ))}
        </div>
        <div className="dm-chart-wrap">
          <svg viewBox={`0 0 ${W} ${H}`} className="dm-hero-chart">
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4361ee"/><stop offset="100%" stopColor="#00d4ff"/>
              </linearGradient>
            </defs>
            {months.map((m,i) => (
              <text key={m} x={toX(i)} y={H+2} textAnchor="middle" className="dm-chart-label">{m}</text>
            ))}
            <path d={revPath} fill="none" stroke="url(#revGrad)" strokeWidth="2.5" strokeLinecap="round"
              className="dm-chart-path dm-rev-path" />
            <path d={spnPath} fill="none" stroke="rgba(67,97,238,0.4)" strokeWidth="2" strokeLinecap="round"
              strokeDasharray="6 3" className="dm-chart-path dm-spn-path" />
            <circle cx={toX(11)} cy={toY(100,100)} r="5" fill="#00d4ff" className="dm-chart-endpt"/>
          </svg>
          <div className="dm-chart-legend">
            <span className="dm-legend-item"><span className="dm-legend-line solid"/>Revenue</span>
            <span className="dm-legend-item"><span className="dm-legend-line dashed"/>Ad Spend</span>
          </div>
        </div>
        <div className="dm-conv-row">
          <span className="dm-conv-label">TODAY'S CONVERSIONS</span>
          <span className="dm-conv-val">↑ {conv.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  const platforms = ["Google Ads","Meta Ads","LinkedIn","YouTube","Programmatic","TikTok","DV360","Bing Ads","Amazon Ads","Pinterest","Snapchat","Klaviyo"];
  return (
    <section className="dm-hero">
      <div className="dm-hero-bg-glow"/>
      <div className="dm-hero-left">
        <div className="dm-badge-pill">
          <span className="dm-badge-icon">⊕</span>
          Digital Marketing · Full-Funnel Growth
        </div>
        <h1 className="dm-hero-h1">
          Grow Faster.<br/>
          <span className="dm-hero-accent">Spend Smarter.</span>
        </h1>
        <p className="dm-hero-sub">
          We engineer data-driven marketing systems that turn every rupee into compounding returns — across every channel, every audience, every stage of the funnel.
        </p>
        <div className="dm-hero-btns">
          <button className="dm-btn-primary dm-btn-lg">Launch My Campaign →</button>
          {/* <button className="dm-btn-outline dm-btn-lg">View Case Studies</button> */}
          <Link to="/CaseStudies" className="dm-btn-outline dm-btn-lg">
            View Case Studies
          </Link>
        </div>
        <div className="dm-marquee-wrap">
          <div className="dm-marquee-track">
            {[...platforms,...platforms].map((p,i) => (
              <span key={i} className="dm-marquee-pill">{p}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="dm-hero-right">
        <HeroDashboard/>
      </div>
    </section>
  );
}

/* ─── TRUST STRIP ────────────────────────────────────────────────────────── */
function TrustStrip() {
  const badges = [
    {icon:"🟦",name:"Google Partner"},
    {icon:"📘",name:"Meta Business Partner"},
    {icon:"💼",name:"LinkedIn Marketing Partner"},
    {icon:"🛒",name:"HubSpot"},
    {icon:"📧",name:"Klaviyo Partner"},
    {icon:"🔷",name:"Shopify Plus"},
    {icon:"📊",name:"DV360 Certified"},
    {icon:"🟠",name:"Amazon Ads"},
  ];
  return (
    <div className="dm-trust-strip">
      <span className="dm-trust-label">TRUSTED PLATFORMS</span>
      <div className="dm-trust-marquee">
        <div className="dm-trust-track">
          {[...badges,...badges].map((b,i) => (
            <span key={i} className="dm-trust-badge">{b.icon} {b.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── WHAT WE DO ─────────────────────────────────────────────────────────── */
function WhatWeDo() {
  const [ref, visible] = useInView();
  const cards = [
    { icon:"🎯", title:"Full-Funnel Architecture", color:"var(--dm-blue)",
      desc:"We map the entire customer journey from first impression to repeat purchase, then build paid and organic systems for every stage." },
    { icon:"📊", title:"Data-First Decisions", color:"var(--dm-cyan)",
      desc:"Every channel, campaign, and creative is tracked, tested, and optimised weekly. No gut feelings — only statistical certainty." },
    { icon:"🔄", title:"Compounding Returns", color:"var(--dm-teal)",
      desc:"Our integrated strategy makes each channel reinforce the others — SEO lowers CPCs, retargeting lifts ROAS, email maximises LTV." },
  ];
  return (
    <section className="dm-section dm-what" ref={ref}>
      <div className={`dm-section-inner${visible?" dm-visible":""}`}>
        <div className="dm-eyebrow">—— OUR APPROACH ——</div>
        <h2 className="dm-section-h2">Marketing that <span className="dm-accent-italic">compounds.</span></h2>
        <p className="dm-section-sub">We don't run ads. We build growth machines — integrated systems where every channel amplifies the next.</p>
        <div className="dm-what-cards">
          {cards.map((c,i) => (
            <div className="dm-what-card" key={c.title} style={{"--accent":c.color,"animationDelay":`${i*0.15}s`}}>
              <div className="dm-what-card-top"/>
              <div className="dm-what-icon">{c.icon}</div>
              <div className="dm-what-title">{c.title}</div>
              <div className="dm-what-desc">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CHANNEL TABS ───────────────────────────────────────────────────────── */
/* Shared sub-components */
function MacWindow({title, children}) {
  return (
    <div className="dm-mac-window">
      <div className="dm-mac-bar">
        <span className="dm-dot red"/><span className="dm-dot yellow"/><span className="dm-dot green"/>
        <span className="dm-mac-title">{title}</span>
      </div>
      <div className="dm-mac-body">{children}</div>
    </div>
  );
}

function MiniLineChart({color="#00d4ff", data}) {
  const pts = data || [10,25,18,40,33,55,48,70,65,82,78,95];
  const W=320, H=100;
  const xs = pts.map((_,i)=>(i/(pts.length-1))*(W-10)+5);
  const ys = pts.map(v=>H-(v/100)*(H-10)-5);
  const d  = xs.map((x,i)=>`${i===0?"M":"L"} ${x} ${ys[i]}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="dm-mini-chart">
      <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"
        className="dm-chart-path" style={{strokeDasharray:1000,strokeDashoffset:1000}}/>
      <circle cx={xs[xs.length-1]} cy={ys[ys.length-1]} r="5" fill={color}/>
    </svg>
  );
}

function StatBar({stats}) {
  return (
    <div className="dm-stat-bar">
      {stats.map(s => (
        <div className="dm-stat-cell" key={s.label}>
          <div className="dm-stat-val">{s.val}</div>
          <div className="dm-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function FeatCard({icon,title,desc}) {
  return (
    <div className="dm-feat-card">
      <span className="dm-feat-icon">{icon}</span>
      <div><div className="dm-feat-title">{title}</div><div className="dm-feat-desc">{desc}</div></div>
    </div>
  );
}

function Pills({list}) {
  return <div className="dm-pills">{list.map(p=><span key={p} className="dm-pill">{p}</span>)}</div>;
}

/* Channel panels */
function PaidSearchPanel() {
  const rows = [
    {kw:"digital marketing agency", clicks:"4.2K", cpc:"₹85", cr:"8.4%", roas:"14×"},
    {kw:"google ads management",    clicks:"2.8K", cpc:"₹72", cr:"7.1%", roas:"12×"},
    {kw:"ppc agency india",         clicks:"1.9K", cpc:"₹61", cr:"6.8%", roas:"11×"},
    {kw:"performance marketing",    clicks:"3.4K", cpc:"₹54", cr:"9.2%", roas:"16×"},
    {kw:"paid search services",     clicks:"1.2K", cpc:"₹48", cr:"5.9%", roas:"10×"},
  ];
  return (
    <MacWindow title="TECLOUDEX · SEARCH CONSOLE">
      <table className="dm-table">
        <thead><tr><th>KEYWORD</th><th>CLICKS</th><th>CPC</th><th>CR</th><th>ROAS</th></tr></thead>
        <tbody>{rows.map(r=>(
          <tr key={r.kw}>
            <td>{r.kw}</td><td>{r.clicks}</td><td>{r.cpc}</td>
            <td className="dm-td-green">{r.cr}</td>
            <td className="dm-td-blue">↑ {r.roas}</td>
          </tr>
        ))}</tbody>
      </table>
      <div style={{marginTop:14}}>
        <div className="dm-mini-label">WEEKLY IMPRESSIONS</div>
        <MiniLineChart color="#4361ee" data={[20,35,28,50,42,65,58,75,68,85,80,100]}/>
      </div>
    </MacWindow>
  );
}

function PaidSocialPanel() {
  const creatives = [
    {thumb:"🎨", headline:"Summer Sale — 70% Off", ctr:"8.2%", color:"var(--dm-blue)"},
    {thumb:"📸", headline:"New Collection Drop",   ctr:"6.7%", color:"var(--dm-pink)"},
    {thumb:"🎥", headline:"Brand Story Video",     ctr:"5.1%", color:"var(--dm-teal)"},
  ];
  return (
    <MacWindow title="TECLOUDEX · SOCIAL ANALYTICS">
      <div className="dm-creative-grid">
        {creatives.map(c=>(
          <div className="dm-creative-card" key={c.headline}>
            <div className="dm-creative-thumb" style={{borderColor:c.color}}>{c.thumb}</div>
            <div className="dm-creative-info">
              <div className="dm-creative-headline">{c.headline}</div>
              <div className="dm-creative-ctr" style={{color:c.color}}>CTR {c.ctr}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="dm-mini-label" style={{marginTop:16}}>AUDIENCE OVERLAP</div>
      <svg viewBox="0 0 300 120" className="dm-venn">
        <circle cx="100" cy="60" r="48" fill="rgba(67,97,238,0.18)" stroke="#4361ee" strokeWidth="1.5"/>
        <circle cx="150" cy="60" r="48" fill="rgba(0,212,255,0.15)" stroke="#00d4ff" strokeWidth="1.5"/>
        <circle cx="200" cy="60" r="48" fill="rgba(0,201,177,0.15)" stroke="#00c9b1" strokeWidth="1.5"/>
        <text x="80"  y="64" textAnchor="middle" className="dm-venn-label">Lookalike</text>
        <text x="150" y="32" textAnchor="middle" className="dm-venn-label" style={{fontSize:"9px"}}>38%</text>
        <text x="150" y="64" textAnchor="middle" className="dm-venn-label" style={{fontSize:"9px"}}>overlap</text>
        <text x="150" y="96" textAnchor="middle" className="dm-venn-label" style={{fontSize:"9px"}}>22%</text>
        <text x="220" y="64" textAnchor="middle" className="dm-venn-label">Interest</text>
        <text x="150" y="64" textAnchor="middle" className="dm-venn-label" style={{fill:"white",fontWeight:600,fontSize:"9px",dy:-8}}>Retarget</text>
      </svg>
    </MacWindow>
  );
}

function VideoPanel() {
  const funnel = [
    {label:"IMPRESSIONS", val:"2.4M", pct:100, color:"#4361ee"},
    {label:"VIEWS",       val:"1.8M", pct:75,  color:"#00d4ff"},
    {label:"ENGAGED",     val:"420K", pct:35,  color:"#00c9b1"},
    {label:"CONVERSIONS", val:"38K",  pct:12,  color:"#2dc653"},
  ];
  return (
    <MacWindow title="TECLOUDEX · VIDEO METRICS">
      <div className="dm-funnel">
        {funnel.map((f,i)=>(
          <div className="dm-funnel-row" key={f.label}>
            <div className="dm-funnel-label">{f.label}</div>
            <div className="dm-funnel-bar-wrap">
              <div className="dm-funnel-bar" style={{width:`${f.pct}%`,background:f.color}}/>
            </div>
            <div className="dm-funnel-val" style={{color:f.color}}>{f.val}</div>
          </div>
        ))}
      </div>
      <div style={{marginTop:12}} className="dm-metric-badge">
        <span>View-Through Rate</span><span className="dm-badge-num" style={{color:"var(--dm-yellow)"}}>87%</span>
      </div>
    </MacWindow>
  );
}

function ShoppingPanel() {
  const products = [
    {icon:"👟",name:"Running Shoes Pro",price:"₹4,999",roas:"18×",status:"Optimised"},
    {icon:"👜",name:"Leather Handbag",  price:"₹8,499",roas:"14×",status:"Active"},
    {icon:"⌚",name:"Smart Watch X",    price:"₹12,999",roas:"22×",status:"Optimised"},
    {icon:"🎧",name:"Wireless Earbuds", price:"₹2,999",roas:"16×",status:"Active"},
  ];
  return (
    <MacWindow title="TECLOUDEX · FEED MANAGER">
      <table className="dm-table">
        <thead><tr><th></th><th>PRODUCT</th><th>PRICE</th><th>ROAS</th><th>STATUS</th></tr></thead>
        <tbody>{products.map(p=>(
          <tr key={p.name}>
            <td style={{fontSize:18}}>{p.icon}</td>
            <td>{p.name}</td>
            <td style={{color:"var(--dm-yellow)"}}>{p.price}</td>
            <td className="dm-td-blue">{p.roas}</td>
            <td><span className={`dm-status-badge ${p.status==="Optimised"?"opt":"act"}`}>{p.status}</span></td>
          </tr>
        ))}</tbody>
      </table>
      <div className="dm-roas-gauge-wrap">
        <svg viewBox="0 0 120 70" className="dm-roas-gauge">
          <path d="M 15 65 A 50 50 0 0 1 105 65" fill="none" stroke="#1a1d2e" strokeWidth="10" strokeLinecap="round"/>
          <path d="M 15 65 A 50 50 0 0 1 105 65" fill="none" stroke="var(--dm-yellow)" strokeWidth="10"
            strokeDasharray="157 200" strokeLinecap="round" className="dm-gauge-arc"/>
        </svg>
        <div className="dm-gauge-label-center">PEAK ROAS<br/><span style={{color:"var(--dm-yellow)",fontSize:22,fontWeight:700}}>18×</span></div>
      </div>
    </MacWindow>
  );
}

function ProgrammaticPanel() {
  const dots = [
    {x:220,y:55,label:"India"  ,color:"#4361ee",size:16},
    {x:180,y:42,label:"UAE"    ,color:"#00d4ff",size:10},
    {x:140,y:40,label:"UK"     ,color:"#2dc653",size:12},
    {x:100,y:38,label:"US"     ,color:"#f4a23a",size:14},
    {x:250,y:65,label:"SG"     ,color:"#d63af9",size:9 },
  ];
  const [impressions, setImpressions] = useState(2847392);
  useEffect(() => {
    const t = setInterval(() => setImpressions(n => n + Math.floor(Math.random()*400+100)), 800);
    return () => clearInterval(t);
  }, []);
  return (
    <MacWindow title="TECLOUDEX · DSP DASHBOARD">
      <div className="dm-mini-label">GLOBAL IMPRESSION MAP</div>
      <svg viewBox="0 0 340 160" className="dm-world-map">
        <rect width="340" height="160" fill="transparent"/>
        {/* simplified continent shapes */}
        <ellipse cx="100" cy="75" rx="55" ry="35" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
        <ellipse cx="180" cy="65" rx="40" ry="28" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
        <ellipse cx="220" cy="70" rx="50" ry="40" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
        <ellipse cx="265" cy="100" rx="30" ry="22" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
        {dots.map(d=>(
          <g key={d.label}>
            <circle cx={d.x} cy={d.y} r={d.size} fill={d.color} opacity="0.25" className="dm-map-pulse"/>
            <circle cx={d.x} cy={d.y} r={d.size/2.5} fill={d.color}/>
            <text x={d.x} y={d.y+d.size+8} textAnchor="middle" fill={d.color} fontSize="8" fontFamily="JetBrains Mono,monospace">{d.label}</text>
          </g>
        ))}
      </svg>
      <div className="dm-metric-badge">
        <span>LIVE IMPRESSIONS</span>
        <span className="dm-badge-num" style={{color:"var(--dm-cyan)"}}>{impressions.toLocaleString()}</span>
      </div>
      <div className="dm-metric-badge" style={{marginTop:6}}>
        <span>BRAND SAFETY SCORE</span>
        <span className="dm-badge-num" style={{color:"var(--dm-green)"}}>98%</span>
      </div>
    </MacWindow>
  );
}

function EmailPanel() {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % 6), 1400);
    return () => clearInterval(t);
  }, []);
  const steps = ["SIGNUP","WELCOME\n(D1·D3·D7)","BROWSE\nABANDON","CART\nRECOVERY","POST-\nPURCHASE","WINBACK"];
  return (
    <MacWindow title="TECLOUDEX · EMAIL FLOW">
      <div className="dm-flow-steps">
        {steps.map((s, i) => (
          <div key={s} className="dm-flow-step-wrap">
            <div className={`dm-flow-step${i===activeStep?" active":""}`}>
              <span>{s}</span>
            </div>
            {i < steps.length-1 && (
              <div className={`dm-flow-arrow${i < activeStep?" passed":""}`}>→</div>
            )}
          </div>
        ))}
      </div>
      <div style={{marginTop:14}}>
        <div className="dm-mini-label">OPEN RATE TREND</div>
        <MiniLineChart color="#2dc653" data={[28,35,32,42,38,48,45,52,50,56,54,60]}/>
      </div>
      <div className="dm-email-kpis">
        <div className="dm-email-kpi"><span style={{color:"var(--dm-green)"}}>48%</span><br/><small>Open Rate</small></div>
        <div className="dm-email-kpi"><span style={{color:"var(--dm-cyan)"}}>6.2%</span><br/><small>Click Rate</small></div>
        <div className="dm-email-kpi"><span style={{color:"var(--dm-yellow)"}}>28×</span><br/><small>ROAS</small></div>
      </div>
    </MacWindow>
  );
}

const CHANNELS = [
  {
    label:"🎯 Paid Search", dot:"var(--dm-blue)", num:"01",
    title:"Paid Search & PPC", tagline:"Intent. Captured. Converted.",
    body:"We architect Google and Bing campaigns with surgical keyword targeting, smart bidding automation, and relentless negative keyword hygiene — so every click is worth paying for.",
    stats:[{val:"340%",label:"AVERAGE ROI"},{val:"₹48K",label:"AVG MONTHLY SPEND"},{val:"8.2",label:"AVG QUALITY SCORE"}],
    features:[
      {icon:"🔍",title:"Keyword Intelligence",desc:"Deep search-term mining and competitor gap analysis to own every relevant query."},
      {icon:"🤖",title:"Smart Bidding Automation",desc:"Target CPA, ROAS, and Maximize Conversions strategies tuned weekly."},
      {icon:"⛏️",title:"Search Term Mining",desc:"Continuous expansion of converting terms and suppression of wasted spend."},
    ],
    pills:["Google Ads","Bing Ads","Performance Max","Smart Shopping","Dynamic Search"],
    cta:"Launch Paid Search →", Panel: PaidSearchPanel,
  },
  {
    label:"📱 Paid Social", dot:"var(--dm-pink)", num:"02",
    title:"Paid Social Media", tagline:"Scroll. Stop. Convert.",
    body:"We build scroll-stopping creative systems across Meta, LinkedIn, TikTok and more — with audience architecture and creative testing that lowers CPAs and compounds ROAS.",
    stats:[{val:"6.7%",label:"AVG CTR"},{val:"12×",label:"ROAS"},{val:"-38%",label:"CPA VS INDUSTRY"}],
    features:[
      {icon:"⚡",title:"Creative Testing Engine",desc:"Systematic A/B and multivariate testing of hooks, formats, and CTAs."},
      {icon:"🎯",title:"Audience Segmentation",desc:"Lookalike, retargeting, and interest stacks engineered for each funnel stage."},
      {icon:"🔗",title:"Cross-Platform Attribution",desc:"Unified view of social contribution across the full customer journey."},
    ],
    pills:["Meta Ads","Instagram","LinkedIn","TikTok","Snapchat","Pinterest"],
    cta:"Launch Social Ads →", Panel: PaidSocialPanel,
  },
  {
    label:"📹 Video & YouTube", dot:"#ff4444", num:"03",
    title:"Video & YouTube Ads", tagline:"Your story. At scale.",
    body:"From pre-roll to connected TV, we build YouTube ad funnels that grow brand recall and drive direct conversions — with creative strategies built for the format.",
    stats:[{val:"87%",label:"VIEW RATE"},{val:"4.2×",label:"BRAND RECALL LIFT"},{val:"₹0.04",label:"AVG CPV"}],
    features:[
      {icon:"🎬",title:"In-Stream & Bumper Strategy",desc:"Non-skippable and bumper ads engineered to maximise recall in 6–15 seconds."},
      {icon:"🔢",title:"YouTube Funnel Sequences",desc:"Multi-touch video sequences that warm, educate, and convert across sessions."},
      {icon:"📺",title:"Connected TV Campaigns",desc:"Premium placements on smart TVs for reach and brand awareness at scale."},
    ],
    pills:["YouTube","DV360","CTV","Google Video Partners","Shorts"],
    cta:"Run Video Ads →", Panel: VideoPanel,
  },
  {
    label:"🛍️ Shopping & Feed", dot:"var(--dm-yellow)", num:"04",
    title:"Shopping & Feed Ads", tagline:"The right product. The right moment.",
    body:"We engineer product feed operations and shopping campaigns that put your products in front of buyers the moment they're ready to purchase — at maximum efficiency.",
    stats:[{val:"18×",label:"PEAK ROAS"},{val:"₹2.1Cr",label:"GMV MANAGED"},{val:"52%",label:"NEW CUSTOMER RATE"}],
    features:[
      {icon:"⚙️",title:"Feed Optimisation Engine",desc:"Title, description, and attribute optimisation for maximum impression share."},
      {icon:"🏪",title:"Smart Shopping Campaigns",desc:"Performance Max and Standard Shopping structures tuned for your margin."},
      {icon:"🎖️",title:"Merchant Centre Mastery",desc:"Suspensions resolved, feed health maintained, and policies navigated."},
    ],
    pills:["Google Shopping","Meta Catalogue","Pinterest","Shopify","Feedonomics"],
    cta:"Optimise My Feed →", Panel: ShoppingPanel,
  },
  {
    label:"🌐 Programmatic", dot:"var(--dm-purple)", num:"05",
    title:"Programmatic Display", tagline:"Precision. At internet scale.",
    body:"We buy premium inventory across the open web with precise audience targeting, brand safety controls, and viewability standards that protect your brand and your budget.",
    stats:[{val:"98%",label:"BRAND SAFE"},{val:"3.2×",label:"VIEWABILITY RATE"},{val:"0.08%",label:"AVG CTR"}],
    features:[
      {icon:"💻",title:"DSP Strategy & Buying",desc:"DV360 and The Trade Desk strategies built for awareness, retargeting, and prospecting."},
      {icon:"🎯",title:"Contextual & Audience Targeting",desc:"First-party data activation and lookalike modelling across the open web."},
      {icon:"🛡️",title:"Brand Safety & Fraud Prevention",desc:"Whitelists, blacklists, IAS/DoubleVerify integrations and pre-bid filtering."},
    ],
    pills:["DV360","The Trade Desk","Amazon DSP","Xandr","IAS"],
    cta:"Scale Programmatic →", Panel: ProgrammaticPanel,
  },
  {
    label:"📧 Email & CRM", dot:"var(--dm-green)", num:"06",
    title:"Email & CRM Marketing", tagline:"The channel that owns your customer.",
    body:"We build lifecycle automation systems that recover abandoned carts, nurture leads, and maximise LTV — turning your email list into your highest-ROAS marketing channel.",
    stats:[{val:"48%",label:"AVG OPEN RATE"},{val:"6.2%",label:"CLICK RATE"},{val:"28×",label:"EMAIL ROAS"}],
    features:[
      {icon:"🔄",title:"Lifecycle Automation Flows",desc:"Welcome, abandon, post-purchase, and winback sequences built for revenue."},
      {icon:"✂️",title:"List Segmentation & Hygiene",desc:"RFM modelling, engagement scoring, and deliverability maintenance."},
      {icon:"📈",title:"Revenue Attribution",desc:"Per-email revenue tracking, list growth analytics, and A/B test cadences."},
    ],
    pills:["Klaviyo","HubSpot","Mailchimp","ActiveCampaign","Salesforce"],
    cta:"Build My Email Engine →", Panel: EmailPanel,
  },
];

function ChannelTabs() {
  const [active, setActive] = useState(0);
  const ch = CHANNELS[active];
  const Panel = ch.Panel;
  const [contentKey, setContentKey] = useState(0);
  const handleTab = (i) => { setActive(i); setContentKey(k => k+1); };

  return (
    <section className="dm-section dm-channels">
      <div className="dm-eyebrow">—— CHANNELS ——</div>
      <h2 className="dm-section-h2">Every channel. <span className="dm-accent-italic">Fully mastered.</span></h2>
      <div className="dm-channel-tabs">
        {CHANNELS.map((c,i) => (
          <button key={c.num} className={`dm-ch-tab${active===i?" dm-ch-active":""}`}
            style={{"--tab-dot":c.dot}} onClick={()=>handleTab(i)}>
            <span className="dm-ch-dot" style={{background:c.dot}}/>
            {c.label}
          </button>
        ))}
      </div>
      <div className="dm-channel-content" key={contentKey}>
        <div className="dm-ch-left">
          <div className="dm-service-num">CHANNEL {ch.num}</div>
          <h3 className="dm-ch-title">{ch.title}</h3>
          <p className="dm-ch-tagline">{ch.tagline}</p>
          <p className="dm-ch-body">{ch.body}</p>
          <StatBar stats={ch.stats}/>
          <div className="dm-feat-list">
            {ch.features.map(f=><FeatCard key={f.title} {...f}/>)}
          </div>
          <Pills list={ch.pills}/>
          <button className="dm-btn-primary dm-ch-cta">{ch.cta}</button>
        </div>
        <div className="dm-ch-right">
          <Panel/>
        </div>
      </div>
    </section>
  );
}

/* ─── CASE STUDIES ───────────────────────────────────────────────────────── */
function CaseStudies() {
  const [ref, visible] = useInView();
  const cases = [
    {
      industry:"E-COMMERCE", company:"GrowthScale",
      challenge:"Scaling Meta ads beyond ₹5L/month with consistent ROAS.",
      results:[{v:"14×",l:"ROAS",c:"var(--dm-blue)"},{v:"₹2.4Cr",l:"REVENUE",c:"var(--dm-yellow)"},{v:"-42%",l:"CPA DROP",c:"var(--dm-cyan)"}],
      pills:["Meta Ads","Google Shopping","Email"],
    },
    {
      industry:"B2B SAAS", company:"BrandBridge",
      challenge:"Generating qualified SQLs from LinkedIn at a viable CPL.",
      results:[{v:"340",l:"SQLs/MO",c:"var(--dm-blue)"},{v:"₹1,800",l:"CPL",c:"var(--dm-green)"},{v:"68%",l:"SQL→DEMO",c:"var(--dm-cyan)"}],
      pills:["LinkedIn Ads","Google Search","HubSpot"],
    },
    {
      industry:"D2C BRAND", company:"NovaDTC",
      challenge:"Building a sustainable paid-organic flywheel from scratch.",
      results:[{v:"+480%",l:"TRAFFIC",c:"var(--dm-teal)"},{v:"12×",l:"ROAS",c:"var(--dm-blue)"},{v:"₹4.2Cr",l:"IN 90 DAYS",c:"var(--dm-yellow)"}],
      pills:["Meta","Google","SEO","Email"],
    },
  ];
  return (
    <section className="dm-section dm-cases" ref={ref}>
      <div className={`dm-section-inner${visible?" dm-visible":""}`}>
        <div className="dm-eyebrow">—— PROOF ——</div>
        <h2 className="dm-section-h2">Real brands. <span className="dm-accent-italic">Real results.</span></h2>
        <div className="dm-cases-grid">
          {cases.map((c,i) => (
            <div className="dm-case-card" key={c.company} style={{animationDelay:`${i*0.15}s`}}>
              <div className="dm-case-industry">{c.industry}</div>
              <div className="dm-case-company">{c.company}</div>
              <p className="dm-case-challenge">"{c.challenge}"</p>
              <div className="dm-case-results">
                {c.results.map(r=>(
                  <div className="dm-case-result" key={r.l}>
                    <div className="dm-case-result-val" style={{color:r.c}}>{r.v}</div>
                    <div className="dm-case-result-label">{r.l}</div>
                  </div>
                ))}
              </div>
              <Pills list={c.pills}/>
              <a href="#" className="dm-case-link">Read Case Study →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESS ────────────────────────────────────────────────────────────── */
function Process() {
  const [ref, visible] = useInView();
  const steps = [
    {num:"01",title:"Audit & Discovery",       desc:"Full account audit, competitor analysis, and growth opportunity mapping across every channel."},
    {num:"02",title:"Strategy Build",           desc:"Custom cross-channel media plan with budget allocation, KPIs, and a 90-day growth roadmap."},
    {num:"03",title:"Creative & Launch",        desc:"Ad creative production, campaign architecture, pixel/tracking setup, and go-live."},
    {num:"04",title:"Optimise Weekly",          desc:"Weekly performance reviews, A/B tests, bid adjustments, and audience refinements."},
    {num:"05",title:"Scale & Expand",           desc:"Double down on winning channels, expand into new audiences and geographies."},
  ];
  return (
    <section className="dm-section dm-process" ref={ref}>
      <div className={`dm-section-inner${visible?" dm-visible":""}`}>
        <div className="dm-eyebrow">—— HOW IT WORKS ——</div>
        <h2 className="dm-section-h2">From audit to <span className="dm-accent-italic">market dominance.</span></h2>
        <div className="dm-process-steps">
          {steps.map((s,i)=>(
            <div className="dm-process-step-wrap" key={s.num}>
              <div className="dm-process-step" style={{animationDelay:`${i*0.12}s`}}>
                <div className="dm-process-num">{s.num}</div>
                <div className="dm-process-title">{s.title}</div>
                <div className="dm-process-desc">{s.desc}</div>
              </div>
              {i < steps.length-1 && (
                <div className="dm-process-connector">
                  <svg viewBox="0 0 60 12" className="dm-connector-svg">
                    <line x1="0" y1="6" x2="60" y2="6" stroke="rgba(67,97,238,0.4)"
                      strokeWidth="1.5" strokeDasharray="6 4"
                      className={`dm-connector-line${visible?" dm-line-draw":""}`}
                      style={{transitionDelay:`${i*0.2+0.4}s`}}/>
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

/* ─── LIVE METRICS TICKER ────────────────────────────────────────────────── */
function MetricsTicker() {
  const [ref, visible] = useInView();
  const metrics = [
    {raw:"120000000", display:"₹12Cr+", label:"AD SPEND MANAGED THIS MONTH", color:"var(--dm-blue)"},
    {raw:"47000",     display:"47,000+",label:"CONVERSIONS DELIVERED",        color:"var(--dm-cyan)"},
    {raw:"14.2",      display:"14.2×",  label:"AVERAGE ROAS ACROSS ACCOUNTS",color:"var(--dm-yellow)"},
    {raw:"98",        display:"98%",    label:"CLIENT RETENTION RATE",        color:"var(--dm-green)"},
  ];
  return (
    <section className="dm-metrics-ticker" ref={ref}>
      <div className="dm-ticker-glow"/>
      <div className="dm-eyebrow" style={{marginBottom:40}}>—— LIVE NUMBERS ——</div>
      <div className="dm-ticker-grid">
        {metrics.map((m,i) => (
          <div className="dm-ticker-cell" key={m.label}>
            <div className="dm-ticker-val" style={{color:m.color}}>{visible ? m.display : "—"}</div>
            <div className="dm-ticker-label">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── PLATFORMS GRID ─────────────────────────────────────────────────────── */
function PlatformsGrid() {
  const [ref, visible] = useInView();
  const platforms = [
    {icon:"🟦",name:"Google Ads",       badge:"CERTIFIED PARTNER", glow:"#4285f4"},
    {icon:"📘",name:"Meta Business",    badge:"CERTIFIED",          glow:"#1877f2"},
    {icon:"💼",name:"LinkedIn Mktg",    badge:"PARTNER",            glow:"#0a66c2"},
    {icon:"▶️",name:"YouTube Ads",      badge:"CERTIFIED",          glow:"#ff0000"},
    {icon:"🛒",name:"Google Shopping",  badge:"EXPERT",             glow:"#34a853"},
    {icon:"📊",name:"DV360",            badge:"VERIFIED",           glow:"#4361ee"},
    {icon:"📧",name:"Klaviyo",          badge:"PARTNER",            glow:"#00d4ff"},
    {icon:"🔶",name:"HubSpot",          badge:"CERTIFIED",          glow:"#ff7a59"},
    {icon:"🎵",name:"TikTok Ads",       badge:"PARTNER",            glow:"#fe2c55"},
    {icon:"📌",name:"Pinterest Ads",    badge:"VERIFIED",           glow:"#e60023"},
    {icon:"🟠",name:"Snapchat Ads",     badge:"PARTNER",            glow:"#fffc00"},
    {icon:"🟣",name:"Amazon Ads",       badge:"CERTIFIED",          glow:"#ff9900"},
  ];
  return (
    <section className="dm-section dm-platforms" ref={ref}>
      <div className={`dm-section-inner${visible?" dm-visible":""}`}>
        <div className="dm-eyebrow">—— OUR STACK ——</div>
        <h2 className="dm-section-h2">Certified across <span className="dm-accent-italic">every major platform.</span></h2>
        <div className="dm-platforms-grid">
          {platforms.map((p,i) => (
            <div className="dm-platform-card" key={p.name}
              style={{"--glow":p.glow, animationDelay:`${i*0.06}s`}}>
              <div className="dm-platform-icon">{p.icon}</div>
              <div className="dm-platform-name">{p.name}</div>
              <div className="dm-platform-badge">{p.badge}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS CAROUSEL ──────────────────────────────────────────────── */
function Testimonials() {
  const reviews = [
    {stars:5,text:"TECLOUDEX took our ROAS from 3× to 14× in 5 months. The level of data granularity in their weekly reports is unlike anything I've seen from an agency.",name:"Arjun Mehta",role:"CMO, GrowthScale",service:"Meta Ads"},
    {stars:5,text:"Our LinkedIn CPL dropped by 58% in 90 days. They rebuilt our entire funnel architecture from scratch — absolute specialists.",name:"Priya Sharma",role:"VP Marketing, BrandBridge",service:"LinkedIn Ads"},
    {stars:5,text:"From zero to ₹4.2Cr in revenue in 90 days. The paid + email flywheel they built is now our single biggest growth lever.",name:"Rahul Verma",role:"Founder, NovaDTC",service:"Full Funnel"},
    {stars:5,text:"They manage our entire ₹80L/month Google budget with incredible efficiency. Best agency decision we've ever made.",name:"Sneha Kapoor",role:"Head of Growth, ScaleOps",service:"Google Ads"},
    {stars:5,text:"Email ROAS went from 8× to 28× after TECLOUDEX rebuilt our Klaviyo flows. Every rupee in email is now working 4× harder.",name:"Vikram Nair",role:"CEO, NovaBrands",service:"Email & CRM"},
  ];
  return (
    <section className="dm-section dm-testimonials">
      <div className="dm-eyebrow">—— CLIENT VOICES ——</div>
      <h2 className="dm-section-h2">Brands that <span className="dm-accent-italic">trust us.</span></h2>
      <div className="dm-carousel-wrap">
        <div className="dm-carousel-track">
          {[...reviews,...reviews].map((r,i) => (
            <div className="dm-testi-card" key={i}>
              <div className="dm-testi-stars">{"★".repeat(r.stars)}</div>
              <p className="dm-testi-text">"{r.text}"</p>
              <div className="dm-testi-author">
                <div className="dm-testi-avatar">{r.name[0]}</div>
                <div>
                  <div className="dm-testi-name">{r.name}</div>
                  <div className="dm-testi-role">{r.role}</div>
                </div>
                <span className="dm-testi-service">{r.service}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState(null);
  const items = [
    {q:"How long before I see results from paid ads?",
     a:"Most clients see meaningful data within 2–4 weeks and measurable ROAS improvement within 60–90 days. Paid search typically shows results faster than paid social due to intent-based targeting."},
    {q:"What's your minimum monthly ad spend requirement?",
     a:"We work with clients spending from ₹2L/month on up. For best results with our full-funnel approach, we recommend at least ₹5L/month across channels."},
    {q:"Do you work with businesses outside India?",
     a:"Absolutely. We manage campaigns across India, UAE, UK, US, Southeast Asia, and Australia. Our team operates across time zones to support international clients."},
    {q:"How do you measure and report results?",
     a:"We provide weekly performance dashboards, monthly strategy reports, and real-time Looker Studio access. Every KPI is tracked with attribution modeling to show true channel contribution."},
    {q:"Can you manage ads if we already have an internal team?",
     a:"Yes — we frequently operate as a specialist extension of in-house teams. We can own specific channels, provide strategy oversight, or run a full account audit and hand back."},
    {q:"What makes TECLOUDEX different from other agencies?",
     a:"We're a full-stack digital agency — paid, SEO, web, brand, AI, and analytics under one roof. Every channel is connected, every decision is data-backed, and we report on compounding business outcomes, not vanity metrics."},
    {q:"Do you offer performance-based pricing?",
     a:"We offer hybrid models for established accounts — a base retainer plus a performance component tied to agreed KPIs like ROAS, CPL, or revenue. Speak to us about what works for your business model."},
    {q:"Which industries do you specialise in?",
     a:"E-commerce, D2C, B2B SaaS, EdTech, FinTech, Healthcare, and Real Estate. We have specialist playbooks for each vertical built from 350+ client engagements."},
  ];
  return (
    <section className="dm-section dm-faq">
      <div className="dm-eyebrow">—— FAQ ——</div>
      <h2 className="dm-section-h2">Common questions, <span className="dm-accent-italic">honest answers.</span></h2>
      <div className="dm-faq-list">
        {items.map((item,i) => (
          <div className={`dm-faq-item${open===i?" dm-faq-open":""}`} key={i} onClick={()=>setOpen(open===i?null:i)}>
            <div className="dm-faq-q">
              <span>{item.q}</span>
              <span className="dm-faq-icon">{open===i?"−":"+"}</span>
            </div>
            <div className="dm-faq-a"><p>{item.a}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── CTA SECTION ────────────────────────────────────────────────────────── */
function CTASection() {
  const [ref, visible] = useInView();
  const particles = Array.from({length:22},(_,i)=>({
    id:i, x:Math.random()*100, y:Math.random()*100,
    size:Math.random()*3+1, dur:Math.random()*8+6, delay:Math.random()*5,
  }));
  return (
    <section className="dm-cta-section" ref={ref}>
      <div className="dm-cta-glow"/>
      <div className="dm-particles">
        {particles.map(p=>(
          <div key={p.id} className="dm-particle"
            style={{left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size,
              animationDuration:`${p.dur}s`,animationDelay:`${p.delay}s`}}/>
        ))}
      </div>
      <div className={`dm-cta-inner${visible?" dm-visible":""}`}>
        <div className="dm-badge-pill">⊕ Let's Build Something Unstoppable</div>
        <h2 className="dm-cta-h2">
          Ready to make your<br/>
          <span className="dm-hero-accent">marketing unstoppable?</span>
        </h2>
        <p className="dm-cta-sub">Join 350+ growth-stage brands that trust TECLOUDEX to manage their full digital marketing stack.</p>
        <div className="dm-cta-btns">
          <button className="dm-btn-primary dm-btn-xl">Start My Campaign →</button>
          {/* <button className="dm-btn-outline dm-btn-xl">Book a Free Audit</button> */}
           <Link to="/contact" className="dm-btn-outline dm-btn-xl">
            Book a Free Audit
          </Link>
          
        </div>
        <div className="dm-trust-badges">
          <span>✓ No Lock-In Contracts</span>
          <span>✓ 48-Hour Onboarding</span>
          <span>✓ Dedicated Account Manager</span>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────────────── */
// function Footer() {
//   return (
//     <footer className="dm-footer">
//       <div className="dm-footer-grid">
//         <div className="dm-footer-brand">
//           <div className="dm-footer-logo">
//             <div className="dm-logo-icon">N</div>
//             <span className="dm-logo-text"><span>TEC</span><span className="dm-logo-accent">LOUDEX</span></span>
//           </div>
//           <p className="dm-footer-tagline">A digital transformation partner for growth-stage companies ready to dominate their category online.</p>
//         </div>
//         {[
//           {title:"SERVICES", links:["Performance Marketing","SEO & Content","Web Development","Brand Identity","AI & Automation","Analytics"]},
//           {title:"COMPANY",  links:["About Us","Case Studies","Blog","Careers"]},
//           {title:"CONTACT",  links:["hello@tecloudex.com","+91950052027","Chennai, IN","Book a Call"]},
//         ].map(col=>(
//           <div className="dm-footer-col" key={col.title}>
//             <div className="dm-footer-col-title">{col.title}</div>
//             {col.links.map(l=><div key={l} className="dm-footer-link">{l}</div>)}
//           </div>
//         ))}
//       </div>
//       <div className="dm-footer-bottom">
//         <span>© 2026 Tecloudex Digital. All rights reserved.</span>
//         <div className="dm-socials">
//           {["X","in","ig","yt"].map(s=><div key={s} className="dm-social-icon">{s}</div>)}
//         </div>
//       </div>
//     </footer>
//   );
// }

/* ─── ROOT ───────────────────────────────────────────────────────────────── */
export default function DigitalMarketing() {
  // Trigger scroll reveal on all .dm-reveal items
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("dm-visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".dm-reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    // <div className="dm-app">
    <>
      <Navbar />
      <HeroSection/>
      <TrustStrip/>
      <WhatWeDo/>
      <ChannelTabs/>
      <CaseStudies/>
      <Process/>
      <MetricsTicker/>
      <PlatformsGrid/>
      <Testimonials/>
      <FAQ/>
      <CTASection/>
      <Footer/>
    {/* </div> */}
    </>
  );
}


