import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRefs = useRef<HTMLDivElement[]>([]);
  const socialRefs = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer reveal animation
      gsap.fromTo(contentRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Logo animation
      gsap.fromTo(logoRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Links stagger animation
      linksRefs.current.forEach((linkGroup, index) => {
        if (linkGroup) {
          const links = linkGroup.children;
          gsap.fromTo(links,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              delay: 0.5 + index * 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: footerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

      // Social icons animation
      gsap.fromTo(socialRefs.current,
        { scale: 0, rotation: 180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const addToLinksRefs = (el: HTMLDivElement | null) => {
    if (el && !linksRefs.current.includes(el)) {
      linksRefs.current.push(el);
    }
  };

  const addToSocialRefs = (el: HTMLAnchorElement | null) => {
    if (el && !socialRefs.current.includes(el)) {
      socialRefs.current.push(el);
    }
  };

  return (
    <footer ref={footerRef} className="relative bg-black text-white py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl" />
      </div>

      <div ref={contentRef} className="container mx-auto px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div ref={logoRef} className="mb-8">
              <h3 className="text-3xl font-black tracking-wider mb-4">NIKE</h3>
              <p className="text-white/70 leading-relaxed">
                Bringing inspiration and innovation to every athlete in the world. 
                If you have a body, you are an athlete.
              </p>
            </div>
          </div>

          {/* Products */}
          <div ref={addToLinksRefs} className="space-y-4">
            <h4 className="text-lg font-bold uppercase tracking-wider mb-6">Products</h4>
            <a href="#" className="block text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-2 transform">Shoes</a>
            <a href="#" className="block text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-2 transform">Clothing</a>
            <a href="#" className="block text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-2 transform">Accessories</a>
            <a href="#" className="block text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-2 transform">Sale</a>
          </div>

          {/* Sports */}
          <div ref={addToLinksRefs} className="space-y-4">
            <h4 className="text-lg font-bold uppercase tracking-wider mb-6">Sports</h4>
            <a href="#" className="block text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-2 transform">Running</a>
            <a href="#" className="block text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-2 transform">Basketball</a>
            <a href="#" className="block text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-2 transform">Football</a>
            <a href="#" className="block text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-2 transform">Training</a>
          </div>

          {/* Support */}
          <div ref={addToLinksRefs} className="space-y-4">
            <h4 className="text-lg font-bold uppercase tracking-wider mb-6">Support</h4>
            <a href="#" className="block text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-2 transform">Help Center</a>
            <a href="#" className="block text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-2 transform">Size Guide</a>
            <a href="#" className="block text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-2 transform">Returns</a>
            <a href="#" className="block text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-2 transform">Contact Us</a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-16 pt-8 flex flex-col lg:flex-row justify-between items-center">
          {/* Social Links */}
          <div className="flex space-x-6 mb-6 lg:mb-0">
            <a 
              ref={addToSocialRefs}
              href="#" 
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.1,
                  rotation: 360,
                  duration: 0.6,
                  ease: "power2.out"
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  rotation: 0,
                  duration: 0.6,
                  ease: "power2.out"
                });
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a 
              ref={addToSocialRefs}
              href="#" 
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.1,
                  rotation: 360,
                  duration: 0.6,
                  ease: "power2.out"
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  rotation: 0,
                  duration: 0.6,
                  ease: "power2.out"
                });
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
            <a 
              ref={addToSocialRefs}
              href="#" 
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.1,
                  rotation: 360,
                  duration: 0.6,
                  ease: "power2.out"
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  rotation: 0,
                  duration: 0.6,
                  ease: "power2.out"
                });
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.083.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
              </svg>
            </a>
            <a 
              ref={addToSocialRefs}
              href="#" 
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.1,
                  rotation: 360,
                  duration: 0.6,
                  ease: "power2.out"
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  rotation: 0,
                  duration: 0.6,
                  ease: "power2.out"
                });
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center lg:text-right">
            <p className="text-white/60 text-sm">
              © 2025 Nike, Inc. All Rights Reserved.
            </p>
            <p className="text-white/40 text-xs mt-2">
              Privacy Policy | Terms of Service | Cookie Settings
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;