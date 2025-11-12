// src/components/products/ProductFilter.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters } from '../../redux/slices/productSlice';
import { CATEGORIES, BRANDS, VEHICLES, SORT_OPTIONS } from '../../utils/constants';
import { Filter, X } from 'lucide-react';

const ProductFilter = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    dispatch(setFilters(newFilters));
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    if (onFilterChange) {
      onFilterChange({});
    }
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-bold text-dark dark:text-white mb-3 text-sm uppercase">
          Category
        </h3>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="input text-sm"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Brand Filter */}
      <div>
        <h3 className="font-bold text-dark dark:text-white mb-3 text-sm uppercase">
          Brand
        </h3>
        <select
          value={filters.brand}
          onChange={(e) => handleFilterChange('brand', e.target.value)}
          className="input text-sm"
        >
          <option value="">All Brands</option>
          {BRANDS.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Vehicle Filter */}
      <div>
        <h3 className="font-bold text-dark dark:text-white mb-3 text-sm uppercase">
          Vehicle
        </h3>
        <select
          value={filters.vehicle}
          onChange={(e) => handleFilterChange('vehicle', e.target.value)}
          className="input text-sm"
        >
          <option value="">All Vehicles</option>
          {VEHICLES.map((vehicle) => (
            <option key={vehicle.slug} value={vehicle.slug}>
              {vehicle.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-bold text-dark dark:text-white mb-3 text-sm uppercase">
          Price Range (KES)
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
              Min Price
            </label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              placeholder="0"
              className="input text-sm"
              min="0"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
              Max Price
            </label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              placeholder="100000"
              className="input text-sm"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* In Stock Only */}
      <div>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => handleFilterChange('inStock', e.target.checked)}
            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
          />
          <span className="ml-2 text-sm text-dark dark:text-white">
            In Stock Only
          </span>
        </label>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="font-bold text-dark dark:text-white mb-3 text-sm uppercase">
          Sort By
        </h3>
        <select
          value={filters.sort}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
          className="input text-sm"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={handleClearFilters}
        className="w-full btn-outline text-sm"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setShowMobileFilters(true)}
        className="lg:hidden fixed bottom-20 right-6 z-30 bg-primary hover:bg-red-700 text-white p-4 rounded-full shadow-2xl"
      >
        <Filter className="h-6 w-6" />
      </button>

      {/* Mobile Filter Panel */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white dark:bg-navy shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-navy border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
              <h2 className="font-bold text-lg text-dark dark:text-white">
                Filters
              </h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X className="h-6 w-6 text-dark dark:text-white" />
              </button>
            </div>
            <div className="p-4">
              <FilterContent />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Filters */}
      <div className="hidden lg:block card p-6 sticky top-24">
        <h2 className="font-bold text-lg text-dark dark:text-white mb-6 flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </h2>
        <FilterContent />
      </div>
    </>
  );
};

export default ProductFilter;