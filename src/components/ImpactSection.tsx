
import React from 'react';
import Navbar from './Navbar';

const ImpactSection = () => {
  return (
    <section id="impact" className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
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

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60"></div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-12">
        <div className="max-w-2xl">
          {/* Main Heading */}
          <h1 className="font-futura text-6xl lg:text-8xl font-black uppercase tracking-tight leading-[0.9] text-white mb-6">
            JUST DO IT
          </h1>

          {/* Subheading */}
          <p className="font-manrope text-base lg:text-lg text-white/80 mb-12 max-w-xl leading-relaxed">
            Every step forward is a choice. Make it yours. Move with purpose, no matter the silence around you.
          </p>

          {/* CTA Button */}
          <button className="group inline-flex items-center space-x-3 bg-white text-black px-8 py-4 font-manrope font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-gray-100 hover:scale-105">
            <span>STEP IN</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>

      {/* Floating Labels */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 rotate-90 origin-center">
        <p className="font-manrope text-xs text-white/60 tracking-widest uppercase">
          FIELD ENTRY · CHAPTER ONE
        </p>
      </div>

      <div className="absolute bottom-8 left-8">
        <p className="font-manrope text-xs text-white/50 flex items-center space-x-2">
          <span className="ember-flicker">✦</span>
          <span>Founded in Motion, 2025</span>
        </p>
      </div>

      <div className="absolute bottom-8 right-8">
        <p className="font-manrope text-xs text-white/60">
          ©️ Nike
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <div className="w-px h-8 bg-white/40"></div>
          <div className="w-2 h-2 rounded-full bg-white/60"></div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
