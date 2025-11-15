// src/components/home/About.jsx
import React from 'react';
import { Shield, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Story & Content */}
          <div className="space-y-8 animate-fade-in">
            
            {/* Heading */}
            <div className="space-y-4">
              <h2 
                className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
                style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
              >
                We Hunt. We Strip.{' '}
                <span className="text-red-600 relative inline-block">
                  We Ship.
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path d="M0 4C50 8 150 0 200 4" stroke="#DC2626" strokeWidth="2"/>
                  </svg>
                </span>
              </h2>
              
              <p 
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                At <span className="font-semibold text-gray-900 dark:text-white">JOMO AUTO WORLD</span>, every part tells a story — precision-sourced from Japan's top auctions, rebuilt and delivered across Kenya.
              </p>
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              <p>
                We hunt <span className="font-semibold text-gray-900 dark:text-white">Japan auctions</span>, strip the junk, and ship the gold — bringing you premium parts trusted across Kenya. From engine components to suspension systems, every piece is vetted for authenticity and quality.
              </p>
              
              <p>
                Based on <span className="font-semibold text-gray-900 dark:text-white">Kirinyaga Road, Nairobi</span>, we've become Kenya's leading online spares hub for Toyota, Nissan, Mazda, and more. Whether you're a mechanic or a car enthusiast, we deliver genuine parts with <span className="font-semibold">same-day service</span> across the city.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <Shield className="w-10 h-10 text-red-600" />
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                  100% Genuine
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Direct from authorized Japan sources
                </p>
              </div>

              <div className="space-y-2">
                <Award className="w-10 h-10 text-red-600" />
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                  Warranty Backed
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Every part comes with quality assurance
                </p>
              </div>

              <div className="space-y-2">
                <Users className="w-10 h-10 text-red-600" />
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                  Expert Support
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our team guides you to the right fit
                </p>
              </div>
            </div>

            {/* Location Badge */}
            <div className="inline-flex items-center space-x-3 bg-gray-100 dark:bg-gray-800 px-6 py-4 rounded-xl border-l-4 border-red-600">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Kirinyaga Road, Nairobi</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Kenya's Premier Auto Parts Hub</p>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative animate-slide-in-right">
            
            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=900"
                alt="JOMO AUTO WORLD Workshop - Premium Auto Parts"
                className="w-full h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              
              {/* Overlay Text */}
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p 
                  className="text-3xl font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Precision. Quality. Trust.
                </p>
                <p className="text-lg font-light opacity-90">
                  Since 2025
                </p>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -z-10 top-8 -right-8 w-72 h-72 bg-red-600/10 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -bottom-8 -left-8 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
          </div>

        </div>

        {/* Bottom Trust Statement */}
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <p 
            className="text-2xl md:text-3xl text-gray-800 dark:text-gray-200 font-light leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="italic">"Fast. Clean. Nairobi."</span>
            <br />
            <span className="text-lg text-gray-600 dark:text-gray-400 block mt-4">
              We hunt Japan auctions, strip the junk, ship the gold.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;