import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(loadingRef.current, { opacity: 1 });
      gsap.set(logoRef.current, { scale: 0.8, opacity: 0 });
      gsap.set(progressBarRef.current, { width: '0%' });

      // Create timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Exit animation
          gsap.to(loadingRef.current, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete: onComplete
          });
        }
      });

      // Logo entrance
      tl.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)"
      })
      // Progress bar animation
      .to(progressBarRef.current, {
        width: '100%',
        duration: 2.5,
        ease: "power2.out"
      }, "-=0.5")
      // Logo pulse
      .to(logoRef.current, {
        scale: 1.05,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      }, "-=0.5");

    }, loadingRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={loadingRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]" />
      </div>

      {/* Logo */}
      <div ref={logoRef} className="mb-12">
        <h1 className="text-6xl lg:text-8xl font-black text-white tracking-wider">
          NIKE
        </h1>
      </div>

      {/* Progress Bar */}
      <div ref={progressRef} className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
        />
      </div>

      {/* Loading Text */}
      <p className="mt-8 text-white/60 text-sm uppercase tracking-widest">
        LOADING EXPERIENCE
      </p>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full nike-ember-flicker" />
      <div className="absolute bottom-32 left-20 w-1 h-1 bg-white/40 rounded-full nike-pulse" />
      <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-amber-400/60 rounded-full nike-float-animation" />
    </div>
  );
};

export default LoadingScreen; 