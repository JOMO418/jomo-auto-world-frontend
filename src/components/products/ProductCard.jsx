// src/components/products/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { ShoppingCart, Heart, Star, Flame, TrendingUp } from 'lucide-react';
import { formatCurrency, calculateDiscount } from '../../utils/helpers';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock) {
      toast.error('Product out of stock');
      return;
    }

    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url || '/placeholder.png',
      partNumber: product.partNumber,
      quantity: 1,
      stock: product.stock
    }));

    toast.success(`${product.name} added to cart!`);
  };

  const discountPercent = calculateDiscount(product.originalPrice, product.price);

  return (
    <Link
      to={`/product/${product._id}`}
      className="group block bg-white dark:bg-navy rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative h-56 bg-gray-100 dark:bg-charcoal overflow-hidden">
        <img
          src={product.images[0]?.url || '/placeholder.png'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.inStock && (
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
              IN STOCK
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Flame className="h-3 w-3" />
              -{discountPercent}%
            </span>
          )}
          {product.bestSeller && (
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              BEST SELLER
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toast.success('Added to wishlist!');
            }}
            className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg mb-2 block"
          >
            <Heart className="h-4 w-4 text-gray-700 hover:text-primary transition-colors" />
          </button>
        </div>

        {/* Add to Cart Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2 rounded-lg font-bold text-white text-sm flex items-center justify-center gap-2 ${
              product.inStock 
                ? 'bg-primary hover:bg-red-700' 
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand & Part Number */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-secondary dark:text-primary uppercase">
            {product.brand}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {product.partNumber}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-bold text-dark dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating || 0)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
            ({product.numReviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through mr-2">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className="text-xl font-bold text-primary">
              {formatCurrency(product.price)}
            </span>
          </div>
          {product.soldCount > 20 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              🔥 {product.soldCount} sold
            </span>
          )}
        </div>

        {/* Compatibility */}
        {product.compatibility && product.compatibility.length > 0 && (
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Fits: <span className="font-semibold text-dark dark:text-white">
                {product.compatibility[0].make} {product.compatibility[0].model}
              </span>
              {product.compatibility.length > 1 && (
                <span className="text-secondary dark:text-primary"> +{product.compatibility.length - 1} more</span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Red Glow on Hover */}
      <div className="absolute inset-0 pointer-events-none rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-glow-red"></div>
    </Link>
  );
};

export default ProductCard;