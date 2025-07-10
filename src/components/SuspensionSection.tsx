
import React from 'react';

const SuspensionSection = () => {
  return (
    <section id="suspension" className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source
          src="https://res.cloudinary.com/djna34e6f/video/upload/v1751233704/Gen-4_Turbo_A_single_molten_Nike_sneaker_glowing_red-hot_and_battle-worn_hovers_briefly_before_slowly_descending_in_ultra-slow_motion_It_lands_with_a_soft_but_impactful_thud_on_scorched_ash-covere_tbcdkt.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/70"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-end px-6 lg:px-12">
        <div className="max-w-xl text-right">
          {/* Quote Block */}
          <blockquote className="mb-8">
            <p className="font-futura text-4xl lg:text-5xl italic text-white/70 leading-tight mb-4 gradient-sweep">
              "Silence isn't absence. It's preparation."
            </p>
            <footer className="font-manrope text-sm text-white/60">
              Feel the heat of movement before the leap.
            </footer>
          </blockquote>

          {/* Floating Elements */}
          <div className="float-animation">
            <div className="w-3 h-3 rounded-full bg-orange-400/60 ember-flicker"></div>
          </div>
        </div>
      </div>

      {/* Side Labels */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center">
        <p className="font-manrope text-xs text-white/60 tracking-widest uppercase">
          SUSPENSION · CHAPTER TWO
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <p className="font-manrope text-xs text-white/50 text-center">
          Purpose now burns. And motion begins.
        </p>
      </div>

      {/* Scroll to Top Indicator */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center space-y-2 group hover:scale-110 transition-transform duration-300"
        >
          <div className="w-2 h-2 rounded-full bg-white/60 group-hover:bg-white transition-colors"></div>
          <div className="w-px h-8 bg-white/40 group-hover:bg-white/60 transition-colors"></div>
        </button>
      </div>
    </section>
  );
};

export default SuspensionSection;
