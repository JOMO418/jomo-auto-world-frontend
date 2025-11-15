// src/components/home/Hero.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Package, Award } from 'lucide-react';
import SearchBar from '../common/SearchBar';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      image: '/rangerover.jpg',
      title: 'Premium Parts',
      subtitle: 'For Every Ride'
    },
    {
      id: 2,
      image: '/landcruiser.jpg',
      title: 'Quality Guaranteed',
      subtitle: 'Direct From Japan'
    },
    {
      id: 3,
      image: '/gtr.jpg',
      title: 'Same-Day Delivery',
      subtitle: 'Across Nairobi'
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[90vh] min-h-[600px] bg-gradient-to-br from-gray-900 to-black overflow-hidden mt-20">
      {/* Background Carousel */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-[5000ms]"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              filter: 'brightness(0.65) contrast(1.1)'
            }}
          />
        </div>
      ))}

      {/* Refined Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-4xl mx-auto text-center">
            {/* Brand Name */}
            <div className="mb-6 animate-fade-in">
              <h1 
                className="text-6xl md:text-8xl text-[#F8EFE6] mb-2 leading-none tracking-tight"
                style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
              >
                JOMO AUTO WORLD
              </h1>
              
              {/* Elegant Divider */}
              <div className="flex items-center justify-center my-6">
                <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent w-64"></div>
              </div>
            </div>

            {/* Rotating Tagline */}
            <div className="mb-10 h-16 flex items-center justify-center">
              {slides.map((slide, index) => (
                <p
                  key={slide.id}
                  className={`absolute text-xl md:text-2xl text-[#F8EFE6]/90 font-light tracking-wide transition-all duration-700 ${
                    index === currentSlide 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
                >
                  <span className="italic">{slide.title}</span>
                  <span className="mx-3 text-[#D4AF37]">—</span>
                  <span className="font-normal">{slide.subtitle}</span>
                </p>
              ))}
            </div>

            {/* Refined Search Bar */}
            <div className="max-w-2xl mx-auto mb-12 animate-slide-in-up">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <SearchBar 
                  placeholder="Search shock absorbers, brake pads, coilovers..."
                  className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl hover:bg-white/15 focus-within:bg-white/20 focus-within:border-[#D4AF37]/50 transition-all duration-300"
                />
              </div>
            </div>

            {/* Refined Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {[
                { icon: Package, label: '5000+ Parts', color: 'text-[#D4AF37]' },
                { icon: TrendingUp, label: 'Same Day Delivery', color: 'text-[#F8EFE6]' },
                { icon: Award, label: '1 Year Warranty', color: 'text-[#D4AF37]' },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-lg border border-white/10 hover:bg-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 group"
                  >
                    <Icon className={`h-5 w-5 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                    <span className="text-[#F8EFE6] font-light text-sm tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Elegant Subtext */}
            <p className="text-[#F8EFE6]/70 text-sm md:text-base mt-8 max-w-2xl mx-auto font-light tracking-wide leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Premium auto parts from trusted Japanese auctions. Expert installation, same-day delivery across Nairobi.
            </p>
          </div>
        </div>
      </div>

      {/* Refined Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:ring-offset-2 focus:ring-offset-transparent ${
              index === currentSlide
                ? 'w-12 bg-[#D4AF37]'
                : 'w-1 bg-[#F8EFE6]/40 hover:bg-[#F8EFE6]/70 hover:w-6'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;