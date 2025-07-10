import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '../components/HeroSection';
import ProductShowcase from '../components/ProductShowcase';
import AthleteSection from '../components/AthleteSection';
import TechnologySection from '../components/TechnologySection';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Global smooth scrolling setup
    const ctx = gsap.context(() => {
      // Page load animation
      gsap.fromTo(document.body,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );

      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href') || '');
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* Product Showcase */}
      <section id="products">
        <ProductShowcase />
      </section>

      {/* Athletes Section */}
      <section id="athletes">
        <AthleteSection />
      </section>

      {/* Technology Section */}
      <section id="technology">
        <TechnologySection />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
