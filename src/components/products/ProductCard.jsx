// src/components/products/ProductCard.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { ShoppingCart, X, Package, Shield, CheckCircle } from 'lucide-react';
import { formatCurrency, calculateDiscount } from '../../utils/helpers';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
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
      quantity: quantity,
      stock: product.stock
    }));

    toast.success(`${product.name} added to cart!`);
    setShowModal(false);
  };

  const handleCardClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const discountPercent = calculateDiscount(product.originalPrice, product.price);
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <>
      {/* ===== PRODUCT CARD - MOBILE FIRST DESIGN ===== */}
      <div
        onClick={handleCardClick}
        className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 hover:border-red-600 transition-all duration-300 hover:-translate-y-1"
      >
        {/* IMAGE SECTION - 65% of card - MAXIMUM SIZE */}
        <div className="relative bg-gray-50 h-56 sm:h-64 md:h-72 overflow-hidden">
          <img
            src={product.images[0]?.url || '/placeholder.png'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badges - Top Right - Minimal */}
          {(discountPercent >= 15 || isLowStock || product.specifications?.condition === 'New') && (
            <div className="absolute top-2 right-2 flex flex-col gap-1.5">
              {product.specifications?.condition === 'New' && (
                <span className="bg-blue-600 text-white text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
                  NEW
                </span>
              )}
              {discountPercent >= 15 && (
                <span className="bg-amber-500 text-white text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
                  -{discountPercent}%
                </span>
              )}
              {isLowStock && (
                <span className="bg-orange-500 text-white text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
                  LOW
                </span>
              )}
            </div>
          )}
        </div>

        {/* CONTENT SECTION - 35% of card */}
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-2.5">
          {/* Brand & Condition Badge */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wide">
              {product.brand}
            </span>
            {product.specifications?.condition === 'Ex-Japan' && (
              <span className="text-[8px] sm:text-[9px] bg-gray-100 text-gray-700 px-1.5 sm:px-2 py-0.5 rounded font-bold">
                EX-JP
              </span>
            )}
          </div>

          {/* Product Name - LARGEST TEXT - MOST PROMINENT */}
          <h3 className="font-extrabold text-base sm:text-lg md:text-xl text-gray-900 line-clamp-2 leading-tight">
            {product.name}
          </h3>

          {/* Part Number - Secondary */}
          <div className="text-xs sm:text-sm font-semibold text-gray-600 tracking-wide">
            Part #: {product.partNumber}
          </div>

          {/* Price - Bold Red */}
          <div className="space-y-0.5">
            {product.originalPrice > product.price && (
              <div className="text-[10px] sm:text-xs text-gray-500 line-through">
                {formatCurrency(product.originalPrice)}
              </div>
            )}
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-red-600 leading-none">
              {formatCurrency(product.price)}
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-1.5">
            {product.inStock ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-[10px] sm:text-xs font-bold text-green-600">In Stock</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-[10px] sm:text-xs font-bold text-red-600">Out of Stock</span>
              </>
            )}
          </div>

          {/* Add to Cart Button - Full Width */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(e);
            }}
            disabled={!product.inStock}
            className={`w-full mt-2 py-2.5 sm:py-3 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all touch-manipulation ${
              product.inStock
                ? 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-md active:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
          </button>
        </div>
      </div>

      {/* ===== MODAL - MOBILE OPTIMIZED ===== */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setShowModal(false)}
          />

          {/* Modal Container - Slides up on mobile */}
          <div className="fixed inset-0 flex items-end sm:items-center justify-center sm:p-4">
            <div className="relative bg-white w-full sm:max-w-6xl sm:rounded-2xl rounded-t-3xl shadow-2xl overflow-hidden animate-slide-up max-h-[95vh] flex flex-col">
              
              {/* Header with Close Button */}
              <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sm:hidden">
                <h3 className="font-bold text-gray-900 text-sm truncate flex-1">
                  {product.partNumber}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-2"
                >
                  <X className="h-5 w-5 text-gray-700" />
                </button>
              </div>

              {/* Close Button - Desktop Only */}
              <button
                onClick={() => setShowModal(false)}
                className="hidden sm:block absolute top-4 right-4 z-20 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>

              {/* Modal Content - Scrollable */}
              <div className="overflow-y-auto flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  
                  {/* LEFT: Image Gallery */}
                  <div className="bg-gray-50 p-4 sm:p-6 lg:p-8">
                    {/* Main Image - HUGE */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-3 sm:mb-4">
                      <div className="h-72 sm:h-80 lg:h-96">
                        <img
                          src={product.images[selectedImage]?.url || '/placeholder.png'}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Thumbnails - Horizontal Scroll */}
                    {product.images && product.images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                        {product.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all snap-start ${
                              selectedImage === index
                                ? 'border-red-600 shadow-md ring-2 ring-red-200'
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            <img
                              src={image.url}
                              alt={`View ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* RIGHT: Product Info */}
                  <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5">
                    
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 text-gray-700 text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full uppercase">
                        {product.brand}
                      </span>
                      {product.specifications?.condition && (
                        <span className="bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-full">
                          {product.specifications.condition}
                        </span>
                      )}
                    </div>

                    {/* Part Number - HUGE */}
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                      {product.partNumber}
                    </div>

                    {/* Product Name */}
                    <h2 className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                      {product.name}
                    </h2>

                    {/* Price */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                      {product.originalPrice > product.price && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm sm:text-base text-gray-500 line-through">
                            {formatCurrency(product.originalPrice)}
                          </span>
                          <span className="bg-amber-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md">
                            SAVE {discountPercent}%
                          </span>
                        </div>
                      )}
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-red-600">
                        {formatCurrency(product.price)}
                      </div>
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="text-sm sm:text-base font-bold text-green-600">
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </div>
                        {product.inStock && product.stock < 10 && (
                          <div className="text-xs text-green-700">
                            Only {product.stock} left
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="space-y-2 text-xs sm:text-sm">
                      {product.specifications?.origin && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <Package className="h-4 w-4 text-gray-500" />
                          <span>Origin: <strong>{product.specifications.origin}</strong></span>
                        </div>
                      )}
                      {product.warranty && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <Shield className="h-4 w-4 text-gray-500" />
                          <span>Warranty: <strong>{product.warranty}</strong></span>
                        </div>
                      )}
                      {product.compatibility && product.compatibility.length > 0 && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <CheckCircle className="h-4 w-4 text-gray-500" />
                          <span>Fits <strong>{product.compatibility.length}+ vehicles</strong></span>
                        </div>
                      )}
                    </div>

                    {/* Quantity Selector */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2">
                        Quantity
                      </label>
                      <div className="inline-flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-4 sm:px-5 py-2 sm:py-3 hover:bg-gray-100 active:bg-gray-200 transition-colors font-bold text-lg text-gray-700 touch-manipulation"
                        >
                          −
                        </button>
                        <span className="px-5 sm:px-8 py-2 sm:py-3 font-bold text-lg text-gray-900 border-x-2 border-gray-300 min-w-[50px] sm:min-w-[70px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                          disabled={quantity >= product.stock}
                          className="px-4 sm:px-5 py-2 sm:py-3 hover:bg-gray-100 active:bg-gray-200 transition-colors font-bold text-lg text-gray-700 touch-manipulation disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    {product.description && (
                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2">Description</h3>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sticky Bottom - Add to Cart */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-lg">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all touch-manipulation ${
                    product.inStock
                      ? 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-lg active:scale-[0.98]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                  {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;