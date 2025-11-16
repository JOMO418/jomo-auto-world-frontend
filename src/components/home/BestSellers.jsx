// src/components/home/BestSellers.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '../products/ProductCard';
import { Flame, ChevronRight, Tag } from 'lucide-react';
import Loader from '../common/Loader';

const BestSellers = () => {
  const { bestSellers, isLoading } = useSelector((state) => state.products);

  if (isLoading) {
    return (
      <section className="py-8 sm:py-12 bg-white dark:bg-dark">
        <div className="container-custom">
          <Loader size="lg" />
        </div>
      </section>
    );
  }

  if (!bestSellers || bestSellers.length === 0) {
    return null;
  }

  // Filter only products with discounts
  const discountedProducts = bestSellers.filter(
    product => product.originalPrice > product.price
  );

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50 dark:bg-charcoal">
      <div className="container-custom">
        
        {/* Header - Minimal & Clean */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flame className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 dark:text-primary" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white">
              HOT DEALS
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Limited time discounts on selected parts
          </p>
        </div>

        {/* Special Offer Banner - Optional (if you have bundle deals) */}
        {discountedProducts.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <div className="bg-gradient-to-r from-red-600 to-red-700 dark:from-primary dark:to-red-700 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Tag className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                <span className="text-white font-bold text-sm sm:text-base">
                  SPECIAL OFFER
                </span>
              </div>
              <p className="text-white text-xs sm:text-sm">
                Save up to <span className="font-extrabold text-base sm:text-lg">40%</span> on premium auto parts
              </p>
            </div>
          </div>
        )}

        {/* Products Grid - Mobile First */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-8">
          {(discountedProducts.length > 0 ? discountedProducts : bestSellers)
            .slice(0, 8)
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>

        {/* Simple CTA */}
        <div className="text-center">
          <Link
            to="/parts?sort=soldCount"
            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 dark:bg-primary dark:hover:bg-red-700 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all touch-manipulation"
          >
            <span>View All Deals</span>
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;