import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProductShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const products = [
    {
      id: 1,
      name: "AIR JORDAN XXXIX",
      category: "BASKETBALL",
      price: "$200",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&crop=center",
      description: "Revolutionary cushioning technology meets iconic design"
    },
    {
      id: 2,
      name: "REACT INFINITY",
      category: "RUNNING",
      price: "$160",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop&crop=center",
      description: "Engineered for endless miles and ultimate comfort"
    },
    {
      id: 3,
      name: "ZOOM FREAK 5",
      category: "BASKETBALL",
      price: "$130",
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&h=800&fit=crop&crop=center",
      description: "Explosive performance for the modern athlete"
    },
    {
      id: 4,
      name: "PEGASUS 41",
      category: "RUNNING",
      price: "$140",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop&crop=center",
      description: "Trusted by runners worldwide for daily training"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance animation
      gsap.fromTo(titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Description animation
      gsap.fromTo(descriptionRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Product cards stagger animation
      productRefs.current.forEach((product, index) => {
        if (product) {
          gsap.fromTo(product,
            { 
              y: 100, 
              opacity: 0, 
              scale: 0.8,
              rotateY: 15
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotateY: 0,
              duration: 1.2,
              delay: index * 0.2,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: product,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // Hover animations
          const productImage = product.querySelector('.product-image');
          const productOverlay = product.querySelector('.product-overlay');
          const productInfo = product.querySelector('.product-info');

          product.addEventListener('mouseenter', () => {
            gsap.to(productImage, {
              scale: 1.1,
              duration: 0.6,
              ease: "power2.out"
            });
            gsap.to(productOverlay, {
              opacity: 1,
              duration: 0.4,
              ease: "power2.out"
            });
            gsap.to(productInfo, {
              y: -10,
              duration: 0.4,
              ease: "power2.out"
            });
          });

          product.addEventListener('mouseleave', () => {
            gsap.to(productImage, {
              scale: 1,
              duration: 0.6,
              ease: "power2.out"
            });
            gsap.to(productOverlay, {
              opacity: 0,
              duration: 0.4,
              ease: "power2.out"
            });
            gsap.to(productInfo, {
              y: 0,
              duration: 0.4,
              ease: "power2.out"
            });
          });
        }
      });

      // Parallax effect for the entire section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(sectionRef.current, {
            y: progress * -50,
            duration: 0.3,
            ease: "none"
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToProductRefs = (el: HTMLDivElement | null) => {
    if (el && !productRefs.current.includes(el)) {
      productRefs.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-8 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-6xl lg:text-8xl font-black text-black mb-8 tracking-tighter"
          >
            FEATURED
          </h2>
          <p 
            ref={descriptionRef}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Discover our latest innovations in athletic footwear. Each pair crafted with 
            precision engineering and cutting-edge technology.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={addToProductRefs}
              className="relative group cursor-pointer"
            >
              {/* Product Card */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image w-full h-full object-cover"
                  />
                  {/* Overlay */}
                  <div className="product-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-400" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wider">
                    {product.category}
                  </div>
                  
                  {/* Price */}
                  <div className="absolute top-4 right-4 bg-white/90 text-black px-3 py-1 rounded-full text-sm font-bold">
                    {product.price}
                  </div>
                </div>

                {/* Product Info */}
                <div className="product-info p-6">
                  <h3 className="text-xl font-bold text-black mb-2 tracking-tight">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description}
                  </p>
                  
                  {/* CTA Button */}
                  <button className="mt-4 w-full bg-black text-white py-3 rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300">
                    VIEW DETAILS
                  </button>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <button className="group inline-flex items-center space-x-4 bg-black text-white px-12 py-6 rounded-full font-semibold text-sm uppercase tracking-widest hover:bg-gray-800 transition-all duration-500">
            <span>VIEW ALL PRODUCTS</span>
            <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase; 