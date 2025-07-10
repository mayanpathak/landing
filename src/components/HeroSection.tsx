import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Video entrance with scale and opacity
      gsap.fromTo(videoRef.current, 
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.5, ease: "power2.out" }
      );

      // Overlay gradient animation
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, delay: 0.5, ease: "power2.inOut" }
      );

      // Title reveal with stagger effect
      const titleChars = titleRef.current?.textContent?.split('') || [];
      if (titleRef.current) {
        titleRef.current.innerHTML = titleChars.map(char => 
          char === ' ' ? '<span>&nbsp;</span>' : `<span class="inline-block">${char}</span>`
        ).join('');
        
        gsap.fromTo(titleRef.current.children,
          { y: 100, opacity: 0, rotateX: 90 },
          { 
            y: 0, 
            opacity: 1, 
            rotateX: 0,
            duration: 1.2,
            stagger: 0.05,
            delay: 1,
            ease: "back.out(1.7)"
          }
        );
      }

      // Subtitle slide up with blur effect
      gsap.fromTo(subtitleRef.current,
        { y: 50, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, delay: 1.8, ease: "power3.out" }
      );

      // CTA button with premium hover animation
      gsap.fromTo(ctaRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, delay: 2.2, ease: "elastic.out(1, 0.5)" }
      );

      // Floating elements with continuous animation
      floatingElementsRef.current.forEach((el, index) => {
        if (el) {
          gsap.set(el, { opacity: 0 });
          gsap.to(el, {
            opacity: 1,
            delay: 2.5 + index * 0.3,
            duration: 1,
            ease: "power2.out"
          });
          
          gsap.to(el, {
            y: "random(-20, 20)",
            x: "random(-15, 15)",
            rotation: "random(-10, 10)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.5
          });
        }
      });

      // Parallax effect on scroll
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(videoRef.current, {
            scale: 1 + progress * 0.1,
            duration: 0.3,
            ease: "none"
          });
          gsap.to(overlayRef.current, {
            opacity: 1 + progress * 0.3,
            duration: 0.3,
            ease: "none"
          });
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const addToFloatingRefs = (el: HTMLDivElement | null) => {
    if (el && !floatingElementsRef.current.includes(el)) {
      floatingElementsRef.current.push(el);
    }
  };

  return (
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden">
      {/* Premium Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://res.cloudinary.com/djna34e6f/video/upload/v1751231026/Gen-4_Turbo_A_single_molten_Nike_sneaker_glowing_red-hot_hovers_and_drops_in_slow_motion_onto_a_scorched_ash-covered_ground_Positioned_on_the_left_of_a_pitch-black_frame_it_lands_with_a_soft_hea_ustxgl.mp4"
          type="video/mp4"
        />
      </video>

      {/* Premium Gradient Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/40 to-black/80"
      />

      {/* Floating Premium Elements */}
      <div ref={addToFloatingRefs} className="absolute top-20 right-20 w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-sm" />
      <div ref={addToFloatingRefs} className="absolute top-1/3 left-1/4 w-1 h-1 bg-white/60 rounded-full" />
      <div ref={addToFloatingRefs} className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-gradient-to-r from-amber-300 to-orange-500 rounded-full opacity-40" />
      <div ref={addToFloatingRefs} className="absolute top-2/3 left-1/6 w-1.5 h-1.5 bg-red-400/50 rounded-full" />

      <Navbar />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8 lg:px-16">
        <div className="max-w-6xl w-full">
          {/* Premium Typography */}
          <div className="relative mb-8">
            <h1 
              ref={titleRef}
              className="font-black leading-[0.8] tracking-tight select-none"
              style={{ 
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 'clamp(2.5rem, 8vw, 8rem)',
                color: '#CC4500',
                textShadow: '0 8px 32px rgba(0, 0, 0, 0.8), 0 4px 16px rgba(204, 69, 0, 0.3)'
              }}
            >
              JUST DO IT
            </h1>
          </div>

          <p 
            ref={subtitleRef}
            className="text-lg lg:text-xl xl:text-2xl text-white/90 mb-12 max-w-3xl leading-relaxed font-light tracking-wide"
            style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
            }}
          >
            Experience the future of athletic performance. Where innovation meets determination, 
            and every step defines greatness.
          </p>

          <button 
            ref={ctaRef}
            className="group relative inline-flex items-center space-x-4 bg-white text-black px-12 py-6 font-bold text-sm uppercase tracking-widest transition-all duration-500 hover:bg-gray-100 overflow-hidden rounded-full nike-shadow-premium"
            style={{
              boxShadow: '0 8px 32px rgba(255, 255, 255, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.05,
                y: -2,
                duration: 0.3,
                ease: "power2.out"
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
              });
            }}
          >
            <span className="relative z-10 font-black">EXPLORE COLLECTION</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-2 text-lg">→</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-red-100 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 rounded-full" />
          </button>
        </div>
      </div>

      {/* Premium Side Labels */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 rotate-90 origin-center">
        <p className="text-xs text-white/70 tracking-[0.3em] uppercase font-light">
          PERFORMANCE · REDEFINED
        </p>
      </div>

      <div className="absolute bottom-8 left-8">
        <p className="text-xs text-white/60 flex items-center space-x-3">
          <span className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse" />
          <span className="tracking-wider">NIKE INNOVATION LAB</span>
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
          <div className="w-3 h-3 rounded-full bg-white/80 animate-bounce" />
          <p className="text-xs text-white/60 tracking-widest uppercase">SCROLL</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;