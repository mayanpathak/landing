import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TechnologySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const techRefs = useRef<HTMLDivElement[]>([]);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const technologies = [
    {
      name: "AIR ZOOM",
      description: "Responsive cushioning that delivers a quick, snappy feel with every step",
      icon: "⚡",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "FLYKNIT",
      description: "Lightweight, formfitting fabric that provides targeted support and breathability",
      icon: "🧬",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "REACT FOAM",
      description: "Lightweight, durable and responsive cushioning with a smooth, soft feel",
      icon: "🚀",
      color: "from-orange-500 to-red-500"
    },
    {
      name: "DRI-FIT",
      description: "Moisture-wicking technology that moves sweat away from your skin for quicker evaporation",
      icon: "💧",
      color: "from-green-500 to-emerald-500"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background animation
      gsap.fromTo(backgroundRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Title reveal
      gsap.fromTo(titleRef.current,
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Technology cards animation
      techRefs.current.forEach((tech, index) => {
        if (tech) {
          // Initial reveal
          gsap.fromTo(tech,
            { 
              y: 150, 
              opacity: 0, 
              scale: 0.8,
              rotateY: 45
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotateY: 0,
              duration: 1.2,
              delay: 0.5 + index * 0.2,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: tech,
                start: "top 90%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // Floating animation
          gsap.to(tech, {
            y: "random(-10, 10)",
            x: "random(-5, 5)",
            rotation: "random(-2, 2)",
            duration: "random(4, 6)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.5
          });

          // Hover interactions
          const icon = tech.querySelector('.tech-icon');
          const content = tech.querySelector('.tech-content');
          const background = tech.querySelector('.tech-background');

          tech.addEventListener('mouseenter', () => {
            gsap.to(tech, {
              scale: 1.05,
              y: -10,
              duration: 0.4,
              ease: "power2.out"
            });
            gsap.to(icon, {
              scale: 1.2,
              rotation: 360,
              duration: 0.6,
              ease: "power2.out"
            });
            gsap.to(background, {
              opacity: 1,
              scale: 1.1,
              duration: 0.4,
              ease: "power2.out"
            });
            gsap.to(content, {
              y: -5,
              duration: 0.4,
              ease: "power2.out"
            });
          });

          tech.addEventListener('mouseleave', () => {
            gsap.to(tech, {
              scale: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out"
            });
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              ease: "power2.out"
            });
            gsap.to(background, {
              opacity: 0.1,
              scale: 1,
              duration: 0.4,
              ease: "power2.out"
            });
            gsap.to(content, {
              y: 0,
              duration: 0.4,
              ease: "power2.out"
            });
          });
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
          gsap.to(backgroundRef.current, {
            y: progress * 100,
            duration: 0.3,
            ease: "none"
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToTechRefs = (el: HTMLDivElement | null) => {
    if (el && !techRefs.current.includes(el)) {
      techRefs.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
      />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-sm animate-pulse" />
      <div className="absolute bottom-32 right-32 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60" />
      <div className="absolute top-1/2 left-10 w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full" />

      <div className="container mx-auto px-8 lg:px-16 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-6xl lg:text-8xl font-black text-white mb-8 tracking-tighter"
          >
            INNOVATION
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Pushing the boundaries of athletic performance through cutting-edge technology 
            and relentless innovation.
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              ref={addToTechRefs}
              className="relative group cursor-pointer"
            >
              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full transition-all duration-500">
                {/* Background Gradient */}
                <div className={`tech-background absolute inset-0 bg-gradient-to-br ${tech.color} opacity-10 rounded-2xl transition-all duration-500`} />
                
                {/* Icon */}
                <div className="tech-icon text-4xl mb-6 relative z-10">
                  {tech.icon}
                </div>
                
                {/* Content */}
                <div className="tech-content relative z-10">
                  <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                    {tech.name}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {tech.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500`} />
              </div>

              {/* Floating Accent */}
              <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${tech.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <button className="group inline-flex items-center space-x-4 bg-gradient-to-r from-white to-gray-100 text-black px-12 py-6 rounded-full font-semibold text-sm uppercase tracking-widest hover:from-gray-100 hover:to-white transition-all duration-500">
            <span>EXPLORE TECHNOLOGY</span>
            <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
          </button>
        </div>
      </div>

      {/* Side Label */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 rotate-90 origin-center">
        <p className="text-xs text-white/60 tracking-[0.3em] uppercase">
          FUTURE · PERFORMANCE
        </p>
      </div>
    </section>
  );
};

export default TechnologySection;