// import { Link } from "react-router-dom";
// import React, { useState, useEffect } from 'react';
// import './Navbar.css';


// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
//       <Link to="#" className="nav-logo">
//         <div className="logo-mark">T</div>
//         <span className="logo-text">TEC<span>LOUDEX</span></span>
//       </Link>

//       <ul className="nav-links">
//         {['Home','Services', 'Work', 'About', 'Insights', 'Contact'].map((item) => (
//           <li key={item}>
//             <a href={`#${item.toLowerCase()}`}>{item}</a>
//           </li>
//         ))}
//       </ul>

//       <div className="nav-cta">
//         <div className="nav-status">
//           <span className="status-dot" />
//           <span>Available for projects</span>
//         </div>
//         <Link to="#contact" className="btn-primary">
//           <span>Get Started</span>
//           <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//             <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//         </Link>
//       </div>

//       <button className="hamburger" aria-label="Menu">
//         <span /><span /><span />
//       </button>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>

      {/* LOGO */}

      <Link to="/" className="nav-logo">

        <div className="logo-mark">T</div>

        <span className="logo-text">
          TEC<span>LOUDEX</span>
        </span>

      </Link>

      {/* NAV LINKS */}

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/services">Services</Link>
        </li>

        
        <li>
          <Link to="/About">About</Link>
        </li>

        <li>
          <Link to="/DigitalMarketing">Digital Marketing</Link>
        </li>

        <li>
          <Link to="/CaseStudies">Case Studies</Link>
        </li>

        <li>
          <Link to="/services">Blog</Link>
        </li>

        <li>
          <Link to="/services">Contact</Link>
        </li>

        {/* SAME PAGE SCROLL LINKS */}

        {/* {location.pathname === "/" && (
          <>
            <li>
              <a href="#work">Work</a>
            </li>

            <li>
              <a href="#about">About</a>
            </li>

            <li>
              <a href="#insights">Insights</a>
            </li>

            <li>
              <a href="#contact">Contact</a>
            </li>
          </>
        )} */}

      </ul>

      {/* CTA */}

      <div className="nav-cta">

        <div className="nav-status">
          <span className="status-dot"></span>

          <span>Available for projects</span>
        </div>

        <a href="#contact" className="btn-primary">

          <span>Get Started</span>

          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M1 7h12M8 2l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

        </a>

      </div>

      {/* MOBILE MENU */}

      <button className="hamburger" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

    </nav>
  );
};

export default Navbar;