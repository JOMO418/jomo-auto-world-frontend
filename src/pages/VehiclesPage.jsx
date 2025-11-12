// src/pages/VehiclesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { VEHICLES } from '../utils/constants';
import { ChevronRight } from 'lucide-react';

const VehiclesPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-dark">
      <div className="container-custom">
        <h1 className="heading-lg text-dark dark:text-white mb-8">
          All <span className="text-primary">Vehicles</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {VEHICLES.map((vehicle) => (
            <Link
              key={vehicle.slug}
              to={`/parts?vehicle=${vehicle.slug}`}
              className="card-hover group"
            >
              <div className="h-48 overflow-hidden rounded-t-xl">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white dark:bg-navy rounded-b-xl">
                <h3 className="font-bold text-dark dark:text-white group-hover:text-primary">
                  {vehicle.name}
                </h3>
                <div className="flex items-center text-primary text-sm mt-2">
                  <span>View Parts</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehiclesPage;