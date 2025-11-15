// src/components/home/PartsCategories.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Package } from 'lucide-react';
import { CATEGORIES } from '../../utils/constants';

const PartsCategories = () => {
  return (
    <section className="section bg-gradient-to-b from-black via-zinc-900 to-black relative overflow-hidden">
      {/* Subtle ambient glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Package className="h-12 w-12 text-red-600 mr-4" />
            <h2 className="text-5xl md:text-6xl font-serif text-white tracking-tight">
              SHOP BY <span className="text-red-600">CATEGORY</span>
            </h2>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Browse our top categories sourced from Japan's best auctions.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {CATEGORIES.map((category, index) => (
            <Link
              key={category.slug}
              to={`/parts?category=${category.slug}`}
              className="group relative transform transition-all duration-500 hover:-translate-y-2"
            >
              {/* Card */}
              <div className="relative h-96 bg-zinc-900/60 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-all duration-500">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Gradient Overlays - minimal for photo dominance */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-black/20 group-hover:from-red-500/10 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-6">
                  {/* Top Section - IN STOCK Badge */}
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-red-600 to-red-700 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg shadow-red-500/20">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                      <span>IN STOCK</span>
                    </div>
                  </div>

                  {/* Bottom Section - Category Info */}
                  <div className="text-center">
                    <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-red-500 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-6">
                      Premium quality parts
                    </p>
                    
                    {/* Browse Link */}
                    <div className="inline-flex items-center px-6 py-2.5 bg-transparent backdrop-blur-md rounded-full border border-white/40 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
                      <span className="text-sm font-semibold text-white group-hover:text-black transition-colors">Browse Parts</span>
                      <ChevronRight className="h-4 w-4 ml-2 text-white group-hover:text-black group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>

                {/* Red Glow on Hover */}
                <div className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-2xl shadow-red-500/20"></div>
              </div>
            </Link>
          ))}
        </div>

      

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link
            to="/parts"
            className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-full shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300"
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