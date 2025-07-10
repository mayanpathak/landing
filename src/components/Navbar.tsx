import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial navbar animation
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, delay: 0.5, ease: "power3.out" }
      );

      // Logo animation
      gsap.fromTo(logoRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1, delay: 1, ease: "back.out(1.7)" }
      );

      // Links stagger animation
      const links = linksRef.current?.children;
      if (links) {
        gsap.fromTo(links,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 1.2, ease: "power2.out" }
        );
      }

      // Language toggle animation
      gsap.fromTo(languageRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay: 1.5, ease: "power2.out" }
      );

    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-6 lg:p-8">
      {/* Logo */}
      <div ref={logoRef} className="flex items-center group cursor-pointer">
        <div className="text-white font-black text-2xl tracking-wider relative">
          NIKE
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 group-hover:w-full transition-all duration-500" />
        </div>
      </div>

      {/* Navigation Links */}
      <div ref={linksRef} className="hidden md:flex items-center space-x-12">
        <a 
          href="#hero" 
          className="group relative text-white/80 hover:text-white font-medium text-sm uppercase tracking-widest transition-colors duration-300"
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }}
        >
          HOME
          <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-gray-300 group-hover:w-full transition-all duration-500" />
        </a>
        <a 
          href="#products" 
          className="group relative text-white/80 hover:text-white font-medium text-sm uppercase tracking-widest transition-colors duration-300"
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }}
        >
          PRODUCTS
          <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-gray-300 group-hover:w-full transition-all duration-500" />
        </a>
        <a 
          href="#athletes" 
          className="group relative text-white/80 hover:text-white font-medium text-sm uppercase tracking-widest transition-colors duration-300"
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }}
        >
          ATHLETES
          <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-gray-300 group-hover:w-full transition-all duration-500" />
        </a>
        <a 
          href="#technology" 
          className="group relative text-white/80 hover:text-white font-medium text-sm uppercase tracking-widest transition-colors duration-300"
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }}
        >
          INNOVATION
          <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-gray-300 group-hover:w-full transition-all duration-500" />
        </a>
      </div>

      {/* Language Toggle & Menu */}
      <div ref={languageRef} className="flex items-center space-x-6">
        <div className="hidden md:flex items-center space-x-4">
          <button 
            className="text-white/60 hover:text-white text-sm transition-colors duration-300 uppercase tracking-wider"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.1,
                duration: 0.2,
                ease: "power2.out"
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
              });
            }}
          >
            EN
          </button>
          <div className="text-white/30">|</div>
          <button 
            className="text-white/60 hover:text-white text-sm transition-colors duration-300 uppercase tracking-wider"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.1,
                duration: 0.2,
                ease: "power2.out"
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
              });
            }}
          >
            ES
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white/80 hover:text-white transition-colors duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
