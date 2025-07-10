import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AthleteSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const statsRefs = useRef<HTMLDivElement[]>([]);

  const stats = [
    { number: "50+", label: "Professional Athletes" },
    { number: "12", label: "Olympic Gold Medals" },
    { number: "200M+", label: "Products Sold Worldwide" },
    { number: "1971", label: "Founded" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Video reveal animation
      gsap.fromTo(videoRef.current,
        { scale: 1.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Content slide in from right
      gsap.fromTo(contentRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Title character animation
      const titleText = titleRef.current?.textContent || '';
      if (titleRef.current) {
        titleRef.current.innerHTML = titleText.split('').map(char => 
          char === ' ' ? '<span>&nbsp;</span>' : `<span class="inline-block">${char}</span>`
        ).join('');

        gsap.fromTo(titleRef.current.children,
          { y: 50, opacity: 0, rotateY: 90 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.03,
            delay: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Quote animation with typewriter effect
      gsap.fromTo(quoteRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stats counter animation
      statsRefs.current.forEach((stat, index) => {
        if (stat) {
          const numberElement = stat.querySelector('.stat-number');
          const labelElement = stat.querySelector('.stat-label');
          
          gsap.fromTo(stat,
            { y: 30, opacity: 0, scale: 0.8 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              delay: 2 + index * 0.1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: stat,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // Number counting animation
          if (numberElement) {
            const finalNumber = numberElement.textContent || '';
            gsap.fromTo(numberElement,
              { scale: 0.5, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                delay: 2.2 + index * 0.1,
                ease: "elastic.out(1, 0.5)",
                scrollTrigger: {
                  trigger: stat,
                  start: "top 85%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }
        }
      });

      // Parallax effect
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(videoRef.current, {
            y: progress * -100,
            duration: 0.3,
            ease: "none"
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToStatsRefs = (el: HTMLDivElement | null) => {
    if (el && !statsRefs.current.includes(el)) {
      statsRefs.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://res.cloudinary.com/djna34e6f/video/upload/v1751233704/Gen-4_Turbo_A_single_molten_Nike_sneaker_glowing_red-hot_and_battle-worn_hovers_briefly_before_slowly_descending_in_ultra-slow_motion_It_lands_with_a_soft_but_impactful_thud_on_scorched_ash-covere_tbcdkt.mp4"
          type="video/mp4"
        />
      </video>

      {/* Premium Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div ref={contentRef} className="text-white">
              <h2 
                ref={titleRef}
                className="text-6xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.9]"
              >
                ATHLETES
              </h2>
              
              <blockquote ref={quoteRef} className="mb-12">
                <p className="text-2xl lg:text-3xl font-light italic leading-relaxed mb-6 text-white/90">
                  "Excellence isn't a skill, it's an attitude. Every champion knows that victory 
                  begins with the decision to try."
                </p>
                <footer className="text-sm text-white/70 uppercase tracking-widest">
                  — NIKE ATHLETE COLLECTIVE
                </footer>
              </blockquote>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    ref={addToStatsRefs}
                    className="text-center"
                  >
                    <div className="stat-number text-4xl lg:text-5xl font-black text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="stat-label text-sm text-white/70 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-12">
                <button className="group inline-flex items-center space-x-4 border-2 border-white text-white px-8 py-4 font-semibold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500">
                  <span>MEET OUR ATHLETES</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                </button>
              </div>
            </div>

            {/* Right side - empty for video focus */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse" />
      <div className="absolute bottom-32 left-20 w-2 h-2 bg-white/40 rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-amber-400/60 rounded-full" />

      {/* Side Label */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center">
        <p className="text-xs text-white/60 tracking-[0.3em] uppercase">
          CHAMPIONS · LEGACY
        </p>
      </div>
    </section>
  );
};

export default AthleteSection;