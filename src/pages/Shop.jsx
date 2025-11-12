// src/pages/Shop.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilter from '../components/products/ProductFilter';
import SearchBar from '../components/common/SearchBar';
import { getProducts, setFilters } from '../redux/slices/productSlice';
import { scrollToTop } from '../utils/helpers';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Shop = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading, pagination, filters } = useSelector((state) => state.products);

  useEffect(() => {
    scrollToTop('auto');
    
    // Get filters from URL
    const urlFilters = {
      category: searchParams.get('category') || '',
      brand: searchParams.get('brand') || '',
      vehicle: searchParams.get('vehicle') || '',
      search: searchParams.get('search') || '',
      page: parseInt(searchParams.get('page')) || 1,
    };

    dispatch(setFilters(urlFilters));
    dispatch(getProducts(urlFilters));
  }, [searchParams, dispatch]);

  const handleFilterChange = (newFilters) => {
    const params = {};
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key] && newFilters[key] !== '' && newFilters[key] !== 0) {
        params[key] = newFilters[key];
      }
    });
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    const newFilters = { ...filters, page };
    handleFilterChange(newFilters);
    scrollToTop();
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-dark">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-lg text-dark dark:text-white mb-4">
            AUTO <span className="text-primary">PARTS</span>
          </h1>
          <SearchBar placeholder="Search for parts by name, part number, or vehicle..." />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilter onFilterChange={handleFilterChange} />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            {!isLoading && (
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing <span className="font-bold text-dark dark:text-white">{products.length}</span> of{' '}
                  <span className="font-bold text-dark dark:text-white">{pagination.total}</span> results
                </p>
              </div>
            )}

            {/* Product Grid */}
            <ProductGrid products={products} isLoading={isLoading} />

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {[...Array(pagination.pages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === pagination.pages ||
                    (page >= pagination.page - 1 && page <= pagination.page + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg border ${
                          page === pagination.page
                            ? 'bg-primary text-white border-primary'
                            : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === pagination.page - 2 || page === pagination.page + 2) {
                    return <span key={page}>...</span>;
                  }
                  return null;
                })}

                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;