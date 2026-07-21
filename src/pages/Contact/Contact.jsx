import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Sections/Sections";
import "./Contact.css";

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

/* ─── NAVBAR ─────────────────────────────────────────────────────────────── */
// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", fn);
//     return () => window.removeEventListener("scroll", fn);
//   }, []);
//   return (
//     <nav className={`ct-navbar${scrolled ? " ct-scrolled" : ""}`}>
//       <div className="ct-nav-logo">
//         <div className="ct-logo-icon">N</div>
//         <span className="ct-logo-text">
//           <span>NEX</span><span className="ct-logo-accent">VORA</span>
//         </span>
//       </div>
//       <ul className="ct-nav-links">
//         <li>Services</li>
//         <li>Work</li>
//         <li>About</li>
//         <li className="ct-nav-active">Contact</li>
//         <li>Case Studies</li>
//       </ul>
//       <div className="ct-nav-right">
//         <div className="ct-avail">
//           <span className="ct-green-dot" />
//           <span>Available now</span>
//         </div>
//         <button className="ct-btn-primary">Get Started →</button>
//       </div>
//     </nav>
//   );
// }

/* ─── TOAST ──────────────────────────────────────────────────────────────── */
function Toast({ message, visible }) {
  return (
    <div className={`ct-toast${visible ? " ct-toast-show" : ""}`}>
      <span className="ct-toast-icon">✓</span>
      {message}
    </div>
  );
}

/* ─── SUCCESS STATE ──────────────────────────────────────────────────────── */
function SuccessState({ onReset }) {
  return (
    <div className="ct-success">
      <svg className="ct-success-svg" viewBox="0 0 80 80">
        <circle
          cx="40" cy="40" r="34"
          fill="none" stroke="var(--ct-green)" strokeWidth="3"
          strokeDasharray="214" strokeDashoffset="214"
          className="ct-success-circle"
        />
        <polyline
          points="24,40 35,52 56,30"
          fill="none" stroke="var(--ct-green)" strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="50" strokeDashoffset="50"
          className="ct-success-check"
        />
      </svg>
      <h3 className="ct-success-title">Message sent!</h3>
      <p className="ct-success-sub">
        We'll be in touch within 2 hours. Check your inbox.
      </p>
      <button className="ct-success-reset" onClick={onReset}>
        ← Send Another
      </button>
    </div>
  );
}

/* ─── CONTACT FORM ───────────────────────────────────────────────────────── */
const SERVICES = [
  "Performance Marketing",
  "SEO & Content",
  "Web Development",
  "Brand Identity",
  "AI & Automation",
  "Analytics",
];

function ContactForm() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", budget: "", message: "",
  });
  const [services, setServices] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [shaking, setShaking] = useState(false);

  const update = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: "" }));
  };

  const toggleService = (s) => {
    setServices(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }
    setTimeout(() => setSubmitted(true), 300);
  };

  if (submitted) return <SuccessState onReset={() => { setSubmitted(false); setForm({ name:"", email:"", company:"", budget:"", message:"" }); setServices([]); }} />;

  return (
    <form
      className={`ct-form${shaking ? " ct-shake" : ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="ct-form-header">START A CONVERSATION</div>

      <div className="ct-field-row">
        <div className={`ct-field${errors.name ? " ct-field-error" : ""}`}>
          <label className="ct-label">YOUR NAME</label>
          <input
            type="text" className="ct-input"
            placeholder="e.g. Arjun Mehta"
            value={form.name}
            onChange={e => update("name", e.target.value)}
          />
          {errors.name && <span className="ct-error-msg">{errors.name}</span>}
        </div>
        <div className={`ct-field${errors.email ? " ct-field-error" : ""}`}>
          <label className="ct-label">EMAIL ADDRESS</label>
          <input
            type="email" className="ct-input"
            placeholder="e.g. arjun@company.com"
            value={form.email}
            onChange={e => update("email", e.target.value)}
          />
          {errors.email && <span className="ct-error-msg">{errors.email}</span>}
        </div>
      </div>

      <div className="ct-field-row">
        <div className="ct-field">
          <label className="ct-label">COMPANY NAME</label>
          <input
            type="text" className="ct-input"
            placeholder="e.g. GrowthScale"
            value={form.company}
            onChange={e => update("company", e.target.value)}
          />
        </div>
        <div className="ct-field">
          <label className="ct-label">MONTHLY BUDGET</label>
          <div className="ct-select-wrap">
            <select
              className="ct-select"
              value={form.budget}
              onChange={e => update("budget", e.target.value)}
            >
              <option value="">Select your budget range</option>
              <option>Under ₹1L/month</option>
              <option>₹1L – ₹5L/month</option>
              <option>₹5L – ₹20L/month</option>
              <option>₹20L+/month</option>
              <option>Not sure yet</option>
            </select>
            <span className="ct-select-arrow">▾</span>
          </div>
        </div>
      </div>

      <div className="ct-field">
        <label className="ct-label">WHAT CAN WE HELP WITH?</label>
        <div className="ct-service-pills">
          {SERVICES.map(s => (
            <button
              key={s} type="button"
              className={`ct-service-pill${services.includes(s) ? " ct-pill-active" : ""}`}
              onClick={() => toggleService(s)}
            >{s}</button>
          ))}
        </div>
      </div>

      <div className="ct-field">
        <label className="ct-label">MESSAGE</label>
        <textarea
          className="ct-textarea"
          placeholder="Tell us about your project, goals, or challenges..."
          value={form.message}
          onChange={e => update("message", e.target.value)}
          rows={4}
        />
      </div>

      <button type="submit" className="ct-submit-btn">
        <span>Send Message</span>
        <span className="ct-submit-arrow">→</span>
      </button>

      <div className="ct-form-trust">
        ✓ No spam &nbsp;·&nbsp; ✓ Reply within 2 hours &nbsp;·&nbsp; ✓ Free 60-min audit included
      </div>
    </form>
  );
}

/* ─── HERO ───────────────────────────────────────────────────────────────── */
function Hero() {
  const [ref, visible] = useInView(0.1);
  const [toast, setToast] = useState({ show: false, msg: "" });

  const copy = (text) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setToast({ show: true, msg: `${text} copied!` });
    setTimeout(() => setToast({ show: false, msg: "" }), 2500);
  };

  const quickLinks = [
    { icon: "✉️", text: "hello@tecloudex.com", action: () => copy("hello@tecloudex.com") },
    { icon: "📞", text: "+91950052027",   action: () => copy("+91950052027") },
    { icon: "📍", text: "Chennai, IN",    action: null },
  ];

  return (
    <section className="ct-hero" ref={ref}>
      <div className="ct-hero-glow ct-glow-1" />
      <div className="ct-hero-glow ct-glow-2" />

      {/* LEFT */}
      <div className={`ct-hero-left${visible ? " ct-visible" : ""}`}>
        <div className="ct-badge-pill">
          <span className="ct-badge-icon">⊕</span>
          Contact · Let's Talk
        </div>
        <h1 className="ct-hero-h1">
          Let's build<br />
          <span className="ct-hero-accent">something great.</span>
        </h1>
        <p className="ct-hero-sub">
          Whether you have a brief, a budget, or just a question — we'd love to hear
          from you. No pitch decks, no lock-in. Just an honest conversation about
          your growth.
        </p>

        <div className="ct-quick-links">
          {quickLinks.map(l => (
            <div
              key={l.text}
              className={`ct-quick-pill${l.action ? " ct-quick-clickable" : ""}`}
              onClick={l.action || undefined}
              title={l.action ? "Click to copy" : ""}
            >
              <span className="ct-quick-icon">{l.icon}</span>
              <span className="ct-quick-text">{l.text}</span>
              {l.action && <span className="ct-quick-copy">copy</span>}
            </div>
          ))}
        </div>

        <div className="ct-status-row">
          <span className="ct-status-dot" />
          <div>
            <div className="ct-status-text">We typically respond within 2 hours</div>
            <div className="ct-status-sub">Mon–Sat · 9AM – 7PM IST</div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className={`ct-hero-right${visible ? " ct-visible" : ""}`}>
        <div className="ct-form-card">
          <ContactForm />
        </div>
      </div>

      <Toast message={toast.msg} visible={toast.show} />
    </section>
  );
}

/* ─── CONTACT METHODS ────────────────────────────────────────────────────── */
function ContactMethods() {
  const [ref, visible] = useInView(0.1);
  return (
    <section className="ct-section ct-methods" ref={ref}>
      <div className={`ct-section-inner${visible ? " ct-visible" : ""}`}>
        <div className="ct-eyebrow">—— REACH US ——</div>
        <h2 className="ct-section-h2">
          Three ways to{" "}
          <span className="ct-accent-italic">start the conversation.</span>
        </h2>
        <div className="ct-methods-grid">

          {/* EMAIL */}
          <div className="ct-method-card">
            <div className="ct-method-icon">✉️</div>
            <div className="ct-method-tag">EMAIL</div>
            <div className="ct-method-title">Drop us a line</div>
            <p className="ct-method-desc">
              Best for project briefs, proposals, and detailed questions. We read
              every email personally.
            </p>
            <div className="ct-method-value">hello@tecloudex.com</div>
            <div className="ct-response-badge ct-badge-green">⚡ 2 hr response</div>
            <button className="ct-btn-outline ct-method-btn">Send an Email →</button>
          </div>

          {/* PHONE — FEATURED */}
          <div className="ct-method-card ct-method-featured">
            <div className="ct-recommended-badge">RECOMMENDED</div>
            <div className="ct-method-icon">📱</div>
            <div className="ct-method-tag" style={{ color: "var(--ct-cyan)" }}>
              CALL / WHATSAPP
            </div>
            <div className="ct-method-title">Let's talk directly</div>
            <p className="ct-method-desc">
              Fastest way to get clarity. Book a free 30-min strategy call or ping us
              on WhatsApp anytime.
            </p>
            <div className="ct-method-value" style={{ color: "var(--ct-cyan)" }}>
              +91950052027
            </div>
            <div className="ct-response-badge ct-badge-cyan">⚡ Instant on WhatsApp</div>
            <div className="ct-method-btn-stack">
              <button className="ct-btn-primary ct-method-btn-full">Call Now →</button>
              <button className="ct-btn-whatsapp">WhatsApp →</button>
            </div>
          </div>

          {/* OFFICE */}
          <div className="ct-method-card">
            <div className="ct-method-icon">📍</div>
            <div className="ct-method-tag" style={{ color: "var(--ct-teal)" }}>
              OFFICE
            </div>
            <div className="ct-method-title">Come say hello</div>
            <p className="ct-method-desc">
              Based in Chennai, Tamil Nadu. Remote-first but always happy to meet
              in person for larger projects.
            </p>
            <div className="ct-method-value" style={{ color: "var(--ct-teal)", fontSize: "13px" }}>
              Chennai, Tamil Nadu, IN 🇮🇳
            </div>
            <div className="ct-response-badge ct-badge-teal">🕐 Mon–Sat, 9AM–7PM IST</div>
            <button className="ct-btn-outline ct-method-btn">Get Directions →</button>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── TRUST STRIP ────────────────────────────────────────────────────────── */
function TrustStrip() {
  const [ref, visible] = useInView(0.15);
  const stats = [
    { icon: "🚀", num: "48hr",      label: "Average onboarding time after first contact" },
    { icon: "💬", num: "2hr",       label: "Average first response time to all enquiries" },
    { icon: "🔒", num: "No Lock-in",label: "Cancel anytime — no long-term contracts ever" },
    { icon: "⭐", num: "98%",       label: "Client satisfaction rate across all engagements" },
  ];
  return (
    <section className="ct-trust" ref={ref}>
      <div className="ct-trust-grid">
        {stats.map((s, i) => (
          <div
            className={`ct-trust-card${visible ? " ct-visible" : ""}`}
            key={s.num}
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <div className="ct-trust-icon">{s.icon}</div>
            <div className="ct-trust-num">{s.num}</div>
            <div className="ct-trust-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState(null);
  const [ref, visible] = useInView(0.1);
  const items = [
    {
      q: "How quickly will you respond to my enquiry?",
      a: "We respond to all enquiries within 2 business hours — often faster. If it's urgent, WhatsApp us directly and we'll respond immediately.",
    },
    {
      q: "Do I need a big budget to work with TECLOUDEX?",
      a: "We work with clients from ₹1L/month in managed spend up to ₹1Cr+/month. We'll tell you honestly if your budget isn't right for what you need — we'd rather set you up for success than take your money.",
    },
    {
      q: "What happens in the first call?",
      a: "We do a free 60-minute strategy session — no pitch, no pressure. We review your current setup, identify your biggest growth opportunity, and tell you exactly what we'd do and why. You keep the insights whether you work with us or not.",
    },
    {
      q: "Do you work with international clients?",
      a: "Yes — we have clients in India, UAE, UK, US, Singapore, and Australia. Time zones are no barrier. We work async by default and schedule live calls when needed.",
    },
    {
      q: "Can I just start with one service?",
      a: "Absolutely. Most clients start with one service — usually performance marketing or SEO — and expand as they see results. We never push you to buy more than you need.",
    },
    {
      q: "How long does onboarding take?",
      a: "48 hours from signing. We set up tracking, access, and creative frameworks on Day 1. By Day 3 you have a live strategy. By Day 7 you have campaigns running.",
    },
  ];
  return (
    <section className="ct-section ct-faq" ref={ref}>
      <div className={`ct-section-inner${visible ? " ct-visible" : ""}`}>
        <div className="ct-eyebrow">—— FAQ ——</div>
        <h2 className="ct-section-h2">
          Quick answers{" "}
          <span className="ct-accent-italic">before you reach out.</span>
        </h2>
        <div className="ct-faq-list">
          {items.map((item, i) => (
            <div
              key={i}
              className={`ct-faq-item${open === i ? " ct-faq-open" : ""}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="ct-faq-q">
                <span>{item.q}</span>
                <span className="ct-faq-icon">{open === i ? "−" : "+"}</span>
              </div>
              <div className="ct-faq-a">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────────────── */
// function Footer() {
//   return (
//     <footer className="ct-footer">
//       <div className="ct-footer-grid">
//         <div className="ct-footer-brand">
//           <div className="ct-footer-logo">
//             <div className="ct-logo-icon">N</div>
//             <span className="ct-logo-text">
//               <span>NEX</span><span className="ct-logo-accent">VORA</span>
//             </span>
//           </div>
//           <p className="ct-footer-tagline">
//             A digital transformation partner for growth-stage companies ready to
//             dominate their category online.
//           </p>
//         </div>
//         {[
//           {
//             title: "SERVICES",
//             links: ["Performance Marketing","SEO & Content","Web Development","Brand Identity","AI & Automation","Analytics"],
//           },
//           {
//             title: "COMPANY",
//             links: ["About Us","Case Studies","Blog","Careers"],
//           },
//           {
//             title: "CONTACT",
//             links: ["hello@nexvora.com","+91950052027","Chennai, IN","Book a Call"],
//           },
//         ].map(col => (
//           <div className="ct-footer-col" key={col.title}>
//             <div className="ct-footer-col-title">{col.title}</div>
//             {col.links.map(l => (
//               <div key={l} className="ct-footer-link">{l}</div>
//             ))}
//           </div>
//         ))}
//       </div>
//       <div className="ct-footer-bottom">
//         <span>© 2026 Nexvora Digital. All rights reserved.</span>
//         <div className="ct-socials">
//           {["X","in","ig","yt"].map(s => (
//             <div key={s} className="ct-social-icon">{s}</div>
//           ))}
//         </div>
//       </div>
//     </footer>
//   );
// }

/* ─── ROOT ───────────────────────────────────────────────────────────────── */
export default function Contact() {
  return (
    <>
    {/* // <div className="ct-app"> */}
      <Navbar />
      <Hero />
      <ContactMethods />
      <TrustStrip />
      <FAQ />
      <Footer />
    {/* </div> */}
    </>
  );
}
