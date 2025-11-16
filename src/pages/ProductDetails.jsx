// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { ShoppingCart, Package, Shield, CheckCircle, ChevronLeft } from 'lucide-react';
import { formatCurrency, calculateDiscount } from '../utils/helpers';
import Loader from '../components/common/Loader';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, isLoading } = useSelector((state) => state.products);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProduct(id));
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast.error('Product out of stock');
      return;
    }

    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url,
      partNumber: product.partNumber,
      quantity: quantity,
      stock: product.stock
    }));

    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (isLoading || !product) {
    return <Loader fullScreen />;
  }

  const discountPercent = calculateDiscount(product.originalPrice, product.price);
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50 dark:bg-dark">
      <div className="container-custom">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-red-600 mb-6 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="font-medium">Back to Products</span>
        </button>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
              <div className="aspect-square">
                <img
                  src={product.images[selectedImage]?.url || '/placeholder.png'}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-white rounded-lg p-3 border-2 transition-all hover:shadow-md ${
                      selectedImage === index 
                        ? 'border-red-600 shadow-md' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="aspect-square">
                      <img
                        src={image.url}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Information */}
          <div className="space-y-6">
            {/* Brand & Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-gray-100 text-gray-700 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide">
                {product.brand}
              </span>
              {product.specifications?.condition && (
                <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-4 py-2 rounded-full">
                  {product.specifications.condition}
                </span>
              )}
              {product.specifications?.condition === 'New' && (
                <span className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full">
                  NEW
                </span>
              )}
              {isLowStock && (
                <span className="bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full">
                  LOW STOCK
                </span>
              )}
            </div>

            {/* Part Number - Extra Large */}
            <div>
              <div className="text-sm text-gray-600 mb-1">Part Number</div>
              <div className="text-4xl font-bold text-gray-900 tracking-tight">
                {product.partNumber}
              </div>
            </div>

            {/* Product Name */}
            <h1 className="text-2xl lg:text-3xl text-gray-800 dark:text-white leading-tight">
              {product.name}
            </h1>

            {/* Price Section */}
            <div className="bg-gray-100 dark:bg-navy rounded-xl p-6">
              {product.originalPrice > product.price && (
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl text-gray-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                  <span className="bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    SAVE {discountPercent}%
                  </span>
                </div>
              )}
              <div className="text-5xl font-extrabold text-red-600">
                {formatCurrency(product.price)}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-navy rounded-xl border-2 border-gray-200 dark:border-gray-700">
              {product.inStock ? (
                <>
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-green-600">In Stock</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {product.stock} {product.stock === 1 ? 'unit' : 'units'} available
                      {isLowStock && ' - Order soon!'}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-6 w-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="h-3 w-3 bg-red-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-bold text-red-600">Out of Stock</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Contact us for availability
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Key Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-navy rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700">
                <Package className="h-6 w-6 text-red-600 mx-auto mb-2" />
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Origin</div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {product.specifications?.origin || 'Japan'}
                </div>
              </div>
              
              <div className="bg-white dark:bg-navy rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700">
                <Shield className="h-6 w-6 text-red-600 mx-auto mb-2" />
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Warranty</div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {product.warranty || '1 Year'}
                </div>
              </div>

              <div className="bg-white dark:bg-navy rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700">
                <CheckCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Fits</div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {product.compatibility?.length || 0}+ Models
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden bg-white dark:bg-navy">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold text-xl text-gray-700 dark:text-gray-300"
                  >
                    −
                  </button>
                  <span className="px-8 py-3 font-bold text-xl text-gray-900 dark:text-white min-w-[80px] text-center border-x-2 border-gray-300 dark:border-gray-600">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold text-xl text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Max: {product.stock}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600"
              >
                <ShoppingCart className="h-5 w-5" />
                ADD TO CART
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 bg-gray-900 hover:bg-black text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900"
              >
                BUY NOW
              </button>
            </div>

            {/* Description */}
            {product.description && (
              <div className="bg-white dark:bg-navy rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                  Product Details
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Compatibility */}
            {product.compatibility && product.compatibility.length > 0 && (
              <div className="bg-white dark:bg-navy rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                  Compatible Vehicles
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {product.compatibility.map((comp, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-3 text-sm py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
                    >
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong>{comp.make} {comp.model}</strong> ({comp.year})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).some(key => product.specifications[key]) && (
              <div className="bg-white dark:bg-navy rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {product.specifications.weight && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Weight:</span>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {product.specifications.weight}
                      </div>
                    </div>
                  )}
                  {product.specifications.dimensions && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Dimensions:</span>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {product.specifications.dimensions}
                      </div>
                    </div>
                  )}
                  {product.specifications.material && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Material:</span>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {product.specifications.material}
                      </div>
                    </div>
                  )}
                  {product.specifications.color && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Color:</span>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {product.specifications.color}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;