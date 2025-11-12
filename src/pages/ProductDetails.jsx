// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { ShoppingCart, Heart, Star, Check, Truck, Shield, Package, Minus, Plus } from 'lucide-react';
import { formatCurrency, calculateDiscount, getStockStatus } from '../utils/helpers';
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
  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-dark">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Images */}
          <div>
            {/* Main Image */}
            <div className="card p-4 mb-4">
              <img
                src={product.images[selectedImage]?.url || '/placeholder.png'}
                alt={product.name}
                className="w-full h-96 object-contain"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`card p-2 hover:shadow-lg transition-all ${
                      selectedImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Details */}
          <div>
            {/* Brand & Part Number */}
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-secondary/10 text-secondary dark:text-primary text-sm font-bold rounded-full">
                {product.brand}
              </span>
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                Part #: {product.partNumber}
              </span>
            </div>

            {/* Name */}
            <h1 className="heading-lg text-dark dark:text-white mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating || 0)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {product.rating?.toFixed(1)} ({product.numReviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              {product.originalPrice > product.price && (
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl text-gray-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                  <span className="px-3 py-1 bg-yellow-500 text-black text-sm font-bold rounded-full">
                    Save {discountPercent}%
                  </span>
                </div>
              )}
              <span className="text-4xl font-bold text-primary">
                {formatCurrency(product.price)}
              </span>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
                stockStatus.color === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                stockStatus.color === 'orange' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                <Check className="h-4 w-4" />
                {stockStatus.label}
              </span>
            </div>

            {/* Description */}
            <div className="mb-6 p-4 bg-gray-100 dark:bg-navy rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-dark dark:text-white mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {product.stock} available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 btn bg-secondary hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
              <button className="btn-outline px-4">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { icon: Truck, label: 'Same Day Delivery' },
                { icon: Shield, label: `${product.warranty} Warranty` },
                { icon: Package, label: 'Secure Packaging' }
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="flex flex-col items-center p-4 bg-gray-100 dark:bg-navy rounded-lg text-center">
                    <Icon className="h-6 w-6 text-primary mb-2" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{feature.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Compatibility */}
            {product.compatibility && product.compatibility.length > 0 && (
              <div className="card p-4">
                <h3 className="font-bold text-dark dark:text-white mb-3">
                  Compatible Vehicles
                </h3>
                <div className="space-y-2">
                  {product.compatibility.slice(0, 5).map((comp, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {comp.make} {comp.model} ({comp.year})
                      </span>
                    </div>
                  ))}
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