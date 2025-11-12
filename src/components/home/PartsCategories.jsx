// src/components/home/PartsCategories.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Package } from 'lucide-react';
import { CATEGORIES } from '../../utils/constants';

const PartsCategories = () => {
  return (
    <section className="section bg-navy dark:bg-dark">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Package className="h-10 w-10 text-primary mr-3" />
            <h2 className="heading-lg text-white">
              PREMIUM <span className="text-primary">PARTS</span>
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            High-quality auto parts tested and certified. Direct from Japanese auctions.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CATEGORIES.map((category, index) => (
            <Link
              key={category.slug}
              to={`/parts?category=${category.slug}`}
              className="group relative card-hover"
            >
              {/* Card */}
              <div className="relative h-96 bg-charcoal rounded-2xl overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500"
                  />
                  
                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-6">
                  {/* Top Section - IN STOCK Badge */}
                  <div className="flex justify-end">
                    <div className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1 animate-pulse">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      <span>IN STOCK</span>
                    </div>
                  </div>

                  {/* Bottom Section - Category Info */}
                  <div>
                    <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Premium quality parts
                    </p>
                    
                    {/* Browse Link */}
                    <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                      <span className="text-sm">Browse Parts</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </div>

                {/* Red Glow on Hover */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity shadow-glow-red"></div>

                {/* Animated Border */}
                <div className="absolute inset-0 border-2 border-primary rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Brand Ticker */}
        <div className="mt-16 overflow-hidden">
          <div className="bg-charcoal/50 rounded-xl py-6">
            <p className="text-center text-gray-400 text-sm mb-4 uppercase tracking-wider">
              Trusted Brands
            </p>
            <div className="flex space-x-12 animate-scroll">
              {['Bosch', 'NGK', 'KYB', 'Denso', 'Brembo', 'Sachs', 'Monroe', 'Mann Filter', 'Bosch', 'NGK', 'KYB', 'Denso'].map((brand, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-8"
                >
                  <span className="text-white text-2xl font-bold opacity-50 hover:opacity-100 transition-opacity whitespace-nowrap">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Link
            to="/parts"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Package className="h-6 w-6" />
            <span>Browse All Parts</span>
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PartsCategories;