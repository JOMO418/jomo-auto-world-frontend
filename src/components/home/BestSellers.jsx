// src/components/home/BestSellers.jsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '../products/ProductCard';
import { Flame, TrendingUp, ChevronRight } from 'lucide-react';
import Loader from '../common/Loader';

const BestSellers = () => {
  const { bestSellers, isLoading } = useSelector((state) => state.products);

  if (isLoading) {
    return (
      <section className="section bg-charcoal">
        <div className="container-custom">
          <Loader size="lg" />
        </div>
      </section>
    );
  }

  if (!bestSellers || bestSellers.length === 0) {
    return null;
  }

  return (
    <section className="section bg-charcoal">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Flame className="h-10 w-10 text-primary mr-3 animate-pulse" />
            <h2 className="heading-lg text-white">
              BEST <span className="text-primary">SELLERS</span>
            </h2>
            <Flame className="h-10 w-10 text-primary ml-3 animate-pulse" />
          </div>
          <p className="text-gray-400 text-lg mb-6">
            Hot deals on our most popular parts. Limited stock available!
          </p>

          {/* Deal Timer (Static for now) */}
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-primary to-red-700 px-8 py-4 rounded-xl shadow-xl">
            <span className="text-white font-semibold">Hot Deals</span>
            <div className="flex space-x-2">
              {['4', '23', '45'].map((num, i) => (
                <React.Fragment key={i}>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px]">
                    <div className="text-2xl font-bold text-white">{num}</div>
                    <div className="text-xs text-white/80">
                      {i === 0 ? 'Hours' : i === 1 ? 'Min' : 'Sec'}
                    </div>
                  </div>
                  {i < 2 && <span className="text-white text-2xl">:</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Best Seller Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Stats/Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: TrendingUp, label: 'Top Rated', value: '4.8★' },
            { icon: Flame, label: 'Hot Deals', value: 'Save 35%' },
            { icon: '🚚', label: 'Fast Delivery', value: 'Same Day' },
            { icon: '✅', label: 'Warranty', value: '1 Year' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="card p-6 text-center hover:shadow-xl transition-shadow"
              >
                {typeof Icon === 'string' ? (
                  <span className="text-4xl mb-2 block">{Icon}</span>
                ) : (
                  <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                )}
                <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                <p className="text-lg font-bold text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/parts?sort=soldCount"
            className="btn-primary inline-flex items-center gap-2"
          >
            <span>View All Best Sellers</span>
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Live Purchase Ticker */}
        <div className="mt-12 bg-navy/50 backdrop-blur-sm rounded-xl py-4 px-6 overflow-hidden">
          <div className="flex items-center mb-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-white font-semibold text-sm">Recent Purchases</span>
          </div>
          <div className="flex space-x-12 animate-scroll">
            {[
              { name: 'John from Westlands', item: 'Shock Absorbers', time: '2 min ago' },
              { name: 'Mary from Karen', item: 'Brake Pads', time: '5 min ago' },
              { name: 'David from Ngong', item: 'Engine Mount', time: '8 min ago' },
              { name: 'Sarah from CBD', item: 'Coil Springs', time: '12 min ago' },
              { name: 'John from Westlands', item: 'Shock Absorbers', time: '2 min ago' },
              { name: 'Mary from Karen', item: 'Brake Pads', time: '5 min ago' }
            ].map((purchase, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center space-x-3 text-gray-300 whitespace-nowrap"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">
                  <strong>{purchase.name}</strong> bought{' '}
                  <span className="text-primary">{purchase.item}</span> - {purchase.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;