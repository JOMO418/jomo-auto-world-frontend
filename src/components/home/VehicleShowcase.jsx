// src/components/home/VehicleShowcase.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Wrench } from 'lucide-react';
import { VEHICLES } from '../../utils/constants';

const VehicleShowcase = () => {
  return (
    <section className="section bg-gradient-to-br from-gray-50 to-gray-100 dark:from-navy dark:to-charcoal">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="h-1 w-16 bg-primary mr-4"></div>
            <h2 className="heading-lg text-dark dark:text-white">
              SHOP BY <span className="text-primary">VEHICLE</span>
            </h2>
            <div className="h-1 w-16 bg-primary ml-4"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Find the perfect parts for your vehicle. Quality guaranteed, tested in Japan.
          </p>
        </div>

        {/* Vehicle Grid - Show first 5 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {VEHICLES.slice(0, 5).map((vehicle, index) => (
            <Link
              key={vehicle.slug}
              to={`/parts?vehicle=${vehicle.slug}`}
              className="group relative card-hover"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-charcoal dark:to-navy rounded-t-xl">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Popular Badge */}
                {index < 3 && (
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    POPULAR
                  </div>
                )}

                {/* Hover Icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-center">
                    <Wrench className="h-12 w-12 text-white mb-2 mx-auto" />
                    <span className="text-white font-bold">View Parts</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 bg-white dark:bg-navy rounded-b-xl">
                <h3 className="font-bold text-lg text-dark dark:text-white mb-1 group-hover:text-primary transition-colors">
                  {vehicle.name}
                </h3>
                
                {/* Browse Parts Link */}
                <div className="flex items-center text-primary font-semibold text-sm group-hover:translate-x-2 transition-transform">
                  <span>Browse Parts</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>

              {/* Red Glow on Hover */}
              <div className="absolute inset-0 pointer-events-none rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-glow-red"></div>
            </Link>
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <Link
            to="/vehicles"
            className="btn-primary inline-flex items-center gap-2"
          >
            <span>View All Vehicles</span>
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Vehicles Supported', value: '50+' },
            { label: 'Parts Available', value: '5000+' },
            { label: 'Happy Customers', value: '1200+' },
            { label: 'Same Day Delivery', value: '98%' }
          ].map((stat, index) => (
            <div
              key={index}
              className="card p-6 text-center hover:shadow-xl transition-shadow"
            >
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleShowcase;