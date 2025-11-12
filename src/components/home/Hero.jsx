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
      image: '/logo.png',
      title: 'Quality Guaranteed',
      subtitle: 'Direct From Japan'
    },
    {
      id: 3,
      image: '/landcruiser.jpg',
      title: 'Same Day Delivery',
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
    <div className="relative h-[90vh] min-h-[600px] bg-gradient-to-br from-secondary to-navy overflow-hidden mt-20">
      {/* Background Carousel */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              filter: 'brightness(0.4)'
            }}
          />
        </div>
      ))}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom w-full">
          <div className="max-w-3xl">
            {/* Title */}
            <div className="mb-8 animate-fade-in">
              <h1 className="font-impact text-5xl md:text-7xl text-white mb-4 leading-tight">
                {slides[currentSlide].title}
                <span className="block text-primary relative mt-2">
                  {slides[currentSlide].subtitle}
                  <div className="absolute -bottom-2 left-0 h-1 bg-primary w-32 animate-slide-in"></div>
                </span>
              </h1>
            </div>

            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl">
              Premium auto parts from trusted Japanese auctions. 
              Expert installation, same-day delivery across Nairobi.
            </p>

            {/* Search Bar */}
            <SearchBar 
              placeholder="Find shock absorbers, brake pads, coilovers..."
              className="max-w-2xl mb-8"
            />

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 md:gap-6">
              {[
                { icon: Package, label: '5000+ Parts', color: 'text-primary' },
                { icon: TrendingUp, label: 'Same Day Delivery', color: 'text-green-500' },
                { icon: Award, label: '1 Year Warranty', color: 'text-yellow-500' },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-3 rounded-lg border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                    <span className="text-white font-semibold text-sm">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-primary'
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;