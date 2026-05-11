import React from 'react';
// import Navbar from './Navbar';
import Navbar from "../../components/Navbar/Navbar";
import Hero from '../../components/Hero/Hero';
import MarqueeSection from '../../components/Marquee/Marquee';
import Services from '../../components/Services/Services';
import { CaseStudies, NumbersSection, CTASection, Footer } from '../../components/Sections/Sections';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <MarqueeSection />
      <Services />
      <CaseStudies />
      <NumbersSection />
      <CTASection />
      <Footer />
    </>
  );
};

export default HomePage;
