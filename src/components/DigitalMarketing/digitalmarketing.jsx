import React from 'react';
import { motion } from 'framer-motion';
import './digitalmarketing.css';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

function DgitalMarketing() {
  return (
    <div className="app">
      <header className="header">
        <motion.div 
          className="logo"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}>
          <h1>AgencyName</h1>
        </motion.div>
      </header>

      <section className="hero">
        <motion.div 
          className="hero-text"
          initial={{ y: -100, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.5, duration: 1 }}>
          <h2>Innovative Digital Solutions</h2>
          <p>Your digital transformation starts here.</p>
        </motion.div>
      </section>

      <section className="services">
        <motion.div 
          className="service-card"
          whileHover={{ scale: 1.1 }} 
          transition={{ duration: 0.3 }}>
          <h3>SEO Optimization</h3>
          <p>Improve your visibility and ranking.</p>
        </motion.div>
        <motion.div 
          className="service-card"
          whileHover={{ scale: 1.1 }} 
          transition={{ duration: 0.3 }}>
          <h3>Social Media Marketing</h3>
          <p>Engage your audience on every platform.</p>
        </motion.div>
        <motion.div 
          className="service-card"
          whileHover={{ scale: 1.1 }} 
          transition={{ duration: 0.3 }}>
          <h3>Web Design</h3>
          <p>Designs that leave a lasting impression.</p>
        </motion.div>
      </section>

      <footer className="footer">
        <div className="social-icons">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
        </div>
      </footer>
    </div>
  );
}

export default DgitalMarketing();