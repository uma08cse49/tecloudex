import './ServiceSection.css';
const services = [
  {
    title: 'Web Development',
    icon: '💻',
    desc: 'Modern responsive websites and scalable web apps.'
  },
  {
    title: 'SEO Optimization',
    icon: '📈',
    desc: 'Increase rankings and organic traffic.'
  },
  {
    title: 'UI/UX Design',
    icon: '🎨',
    desc: 'Creative interfaces with better user experience.'
  },
  {
    title: 'Brand Strategy',
    icon: '🚀',
    desc: 'Strong brand positioning for business growth.'
  },
  {
    title: 'Marketing',
    icon: '📢',
    desc: 'Digital campaigns that convert users into customers.'
  },
  {
    title: 'Automation',
    icon: '🤖',
    desc: 'Smart automation systems to save time and scale.'
  }
];

const ServiceSection = () => {
  return (
    <section className="services-section" id="services">

      <div className="section-title">
        <span>OUR SERVICES</span>
        <h2>What We Offer</h2>
      </div>

      <div className="services-grid">

        {services.map((service, index) => (
          <div className="service-card" key={index}>

            <div className="service-icon">
              {service.icon}
            </div>

            <h3>{service.title}</h3>

            <p>{service.desc}</p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default ServiceSection;


// src/components/ServiceSection.jsx
// import { useRef } from 'react';
// import useScrollReveal from '../hooks/useScrollReveal';
// import { PerfMktSVG, SEOSVG, WebDevSVG, BrandSVG, AISVG, AnalyticsSVG } from './ServiceVisuals';
// import './ServiceSection.css';

// const ArrowIcon = () => (
//   <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
//     <path d="M1 6.5h11M7.5 2l5 4.5-5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// );

// /* Map service id → its SVG component */
// const VISUAL_MAP = {
//   'perf-mkt':  <PerfMktSVG />,
//   'seo':       <SEOSVG />,
//   'webdev':    <WebDevSVG />,
//   'brand':     <BrandSVG />,
//   'ai':        <AISVG />,
//   'analytics': <AnalyticsSVG />,
// };

// export default function ServiceSection({ service, index }) {
//   const ref = useRef(null);
//   useScrollReveal(ref);

//   const isFlip  = service.flip;
//   const isEven  = index % 2 !== 0;
//   const textClass = isFlip ? 'reveal-right' : 'reveal-left';
//   const visClass  = isFlip ? 'reveal-left'  : 'reveal-right';

//   return (
//     <section
//       ref={ref}
//       id={service.id}
//       className={`svc-section ${isEven ? 'even' : ''}`}
//     >
//       <div className={`svc-row ${isFlip ? 'flip' : ''}`}>

//         {/* ── TEXT COLUMN ── */}
//         <div className={`svc-text ${textClass}`}>
//           <div className="svc-num-label">Service {service.num}</div>

//           <div className="svc-title-wrap">
//             <h2 className="svc-title">{service.title}</h2>
//             <p className="svc-tagline">{service.tagline}</p>
//           </div>

//           <p className="svc-body">{service.body}</p>

//           {/* Result strip */}
//           <div className="result-strip reveal">
//             {service.results.map((r) => (
//               <div key={r.lbl} className="rs-item">
//                 <span className="rs-val">{r.val}</span>
//                 <span className="rs-lbl">{r.lbl}</span>
//               </div>
//             ))}
//           </div>

//           {/* Feature items */}
//           <div className="feat-list reveal">
//             {service.features.map((f) => (
//               <div key={f.name} className="feat-item">
//                 <div className="feat-ico" style={{ background: f.bg }}>{f.ico}</div>
//                 <div>
//                   <div className="feat-name">{f.name}</div>
//                   <div className="feat-desc">{f.desc}</div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Tags */}
//           <div className="tag-row reveal">
//             {service.tags.map((t) => (
//               <span key={t} className="tag">{t}</span>
//             ))}
//           </div>

//           {/* CTA */}
//           <a href="#cta" className="btn-primary reveal">
//             {service.cta} <ArrowIcon />
//           </a>
//         </div>

//         {/* ── VISUAL COLUMN ── */}
//         <div className={`svc-visual ${visClass}`}>
//           <div className="vis-wrap">
//             {VISUAL_MAP[service.id]}

//             {/* Floating metric chips */}
//             {service.floats?.map((fl, i) => (
//               <div
//                 key={i}
//                 className="v-float"
//                 style={{
//                   top:    fl.top    || 'auto',
//                   bottom: fl.bottom || 'auto',
//                   left:   fl.left   || 'auto',
//                   right:  fl.right  || 'auto',
//                 }}
//               >
//                 <div className="vf-lbl">{fl.label}</div>
//                 <div className="vf-val" style={{ color: fl.color }}>{fl.val}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }
