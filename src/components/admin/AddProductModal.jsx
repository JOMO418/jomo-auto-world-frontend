// src/components/admin/AddProductModal.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Save, Loader, AlertCircle, Check, ChevronRight, ChevronLeft, Camera, Tag, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { createProduct } from '../../redux/slices/productSlice';
import ImageUploader from './ImageUploader';
import { CATEGORIES, BRANDS, VEHICLE_MAKES, PRODUCT_CONDITIONS } from '../../utils/constants';

const AddProductModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.products);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    partNumber: '',
    price: '',
    originalPrice: '',
    stock: '1',
    brand: 'Genuine',
    category: '',
    images: [],
    compatibility: [],
    specifications: {
      condition: 'New',
      origin: 'Japan',
      warranty: '1 Year'
    },
    featured: false,
    bestSeller: false
  });

  const [vehicleInput, setVehicleInput] = useState({
    make: 'Toyota',
    model: '',
    year: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Auto-generate part number if empty
  const generatePartNumber = () => {
    const brand = formData.brand.substring(0, 3).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${brand}-${random}`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSpecChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [field]: value
      }
    }));
  };

  const handleAddVehicle = () => {
    if (!vehicleInput.model || !vehicleInput.year) {
      setErrors(prev => ({ ...prev, vehicle: 'Please enter model and year' }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      compatibility: [...prev.compatibility, { ...vehicleInput }]
    }));

    setVehicleInput({ make: 'Toyota', model: '', year: '' });
    setErrors(prev => ({ ...prev, vehicle: '' }));
    toast.success('Vehicle added successfully');
  };

  const handleRemoveVehicle = (index) => {
    setFormData(prev => ({
      ...prev,
      compatibility: prev.compatibility.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 2) {
      if (!formData.name.trim()) {
        newErrors.name = 'Product name is required - customers need to know what this is';
      }
      if (!formData.category) {
        newErrors.category = 'Please select a category to help customers find this product';
      }
    }

    if (currentStep === 3) {
      if (!formData.price || parseFloat(formData.price) <= 0) {
        newErrors.price = 'Please set a price - how much should customers pay?';
      }
      if (!formData.stock || parseInt(formData.stock) < 0) {
        newErrors.stock = 'Stock quantity is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all steps
    if (!validateStep(2) || !validateStep(3)) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    // Auto-generate part number if empty
    const finalPartNumber = formData.partNumber.trim() || generatePartNumber();

    // Find category ID from slug
    const selectedCategory = CATEGORIES.find(cat => cat.slug === formData.category);
    
    const productData = {
      ...formData,
      partNumber: finalPartNumber,
      category: selectedCategory?.slug,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : 0,
      stock: parseInt(formData.stock)
    };

    console.log('🚀 Sending product data:', productData);

    const result = await dispatch(createProduct(productData));
    
    if (result.type === 'products/create/fulfilled') {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  if (!isOpen) return null;

  // Success Modal
  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl p-6 sm:p-8 text-center max-w-md w-full shadow-2xl animate-scale-in">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">
            Product Added! 🎉
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            {formData.name} is now live and ready for customers
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal - Full screen on mobile, centered on desktop */}
      <div className="fixed inset-0 flex items-end sm:items-center justify-center sm:p-4">
        <div className="relative bg-white w-full sm:max-w-3xl sm:rounded-2xl rounded-t-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]">
          
          {/* Header */}
          <div className="relative bg-gradient-to-r from-red-600 to-red-700 px-4 sm:px-6 py-4 sm:py-5">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors touch-manipulation"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            
            <div className="pr-12">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">Add New Product</h2>
              <p className="text-xs sm:text-sm text-red-100 mt-1">
                Step {step} of 3 • {step === 1 ? 'Photos' : step === 2 ? 'Basic Info' : 'Pricing & Details'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 sm:h-2 bg-gray-100">
            <div 
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          {/* Error Summary Banner */}
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-600 p-3 sm:p-4 m-4 rounded-r-lg">
              <div className="flex items-start gap-2 sm:gap-3">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-bold text-red-900 text-sm sm:text-base mb-1">
                    Please fix these issues:
                  </h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-red-800">
                    {Object.entries(errors).map(([field, message]) => (
                      <li key={field}>• {message}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Content - Scrollable */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              
              {/* STEP 1: Images (Optional) */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Camera className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-blue-900">
                      <p className="font-semibold mb-1">Photos are optional but recommended</p>
                      <p className="text-blue-800">Products with photos sell 3x faster. You can add them later if needed.</p>
                    </div>
                  </div>
                  
                  <ImageUploader
                    images={formData.images}
                    onChange={(images) => setFormData({ ...formData, images })}
                    maxImages={5}
                  />
                </div>
              )}

              {/* STEP 2: Basic Info */}
              {step === 2 && (
                <div className="space-y-4 sm:space-y-5">
                  
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Product Name <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('name')}
                        placeholder="e.g., NGK Spark Plugs - Set of 4"
                        className={`w-full px-4 py-3 sm:py-3.5 border-2 rounded-xl text-sm sm:text-base transition-colors ${
                          touched.name && errors.name 
                            ? 'border-red-300 bg-red-50' 
                            : touched.name && formData.name 
                            ? 'border-green-300 bg-green-50' 
                            : 'border-gray-300'
                        } focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      />
                      {touched.name && formData.name && !errors.name && (
                        <Check className="absolute right-3 top-3 sm:top-3.5 h-5 w-5 text-green-600" />
                      )}
                    </div>
                    {touched.name && errors.name && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Category & Brand */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Category <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('category')}
                        className={`w-full px-4 py-3 sm:py-3.5 border-2 rounded-xl text-sm sm:text-base ${
                          touched.category && errors.category 
                            ? 'border-red-300 bg-red-50' 
                            : 'border-gray-300'
                        } focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      >
                        <option value="">Select category...</option>
                        {CATEGORIES.map(cat => (
                          <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                        ))}
                      </select>
                      {touched.category && errors.category && (
                        <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.category}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Brand
                      </label>
                      <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        {BRANDS.map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Part Number */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Part Number <span className="text-gray-500 text-xs font-normal">(Optional - auto-generated)</span>
                    </label>
                    <input
                      type="text"
                      name="partNumber"
                      value={formData.partNumber}
                      onChange={handleInputChange}
                      placeholder="Leave empty to auto-generate"
                      className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-red-500 focus:border-transparent uppercase"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">
                      💡 We'll create a unique part number for you if left empty
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Description <span className="text-gray-500 text-xs font-normal">(Optional)</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Describe the product features, benefits, and specifications..."
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Pricing & Stock */}
              {step === 3 && (
                <div className="space-y-4 sm:space-y-5">
                  
                  {/* Price & Stock */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Price (KES) <span className="text-red-600">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 sm:top-3.5 text-gray-500 text-sm sm:text-base">KES</span>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('price')}
                          placeholder="5,000"
                          className={`w-full pl-16 pr-4 py-3 sm:py-3.5 border-2 rounded-xl text-sm sm:text-base ${
                            touched.price && errors.price 
                              ? 'border-red-300 bg-red-50' 
                              : 'border-gray-300'
                          } focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                          min="0"
                          step="0.01"
                        />
                      </div>
                      {touched.price && errors.price && (
                        <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.price}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        placeholder="10"
                        className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Original Price (for discount) */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Original Price <span className="text-gray-500 text-xs font-normal">(Optional - for showing discounts)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 sm:top-3.5 text-gray-500 text-sm sm:text-base">KES</span>
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        placeholder="7,000"
                        className="w-full pl-16 pr-4 py-3 sm:py-3.5 border-2 border-gray-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    {formData.originalPrice && parseFloat(formData.originalPrice) > parseFloat(formData.price) && (
                      <p className="text-green-600 text-xs mt-1.5 flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)}% discount will be shown
                      </p>
                    )}
                  </div>

                  {/* Condition */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Condition
                    </label>
                    <select
                      value={formData.specifications.condition}
                      onChange={(e) => handleSpecChange('condition', e.target.value)}
                      className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      {PRODUCT_CONDITIONS.map(cond => (
                        <option key={cond.value} value={cond.value}>{cond.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Compatible Vehicles */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Compatible Vehicles <span className="text-gray-500 text-xs font-normal">(Optional)</span>
                    </label>
                    
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <select
                        value={vehicleInput.make}
                        onChange={(e) => setVehicleInput({ ...vehicleInput, make: e.target.value })}
                        className="px-3 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        {VEHICLE_MAKES.map(make => (
                          <option key={make} value={make}>{make}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="Model"
                        value={vehicleInput.model}
                        onChange={(e) => setVehicleInput({ ...vehicleInput, model: e.target.value })}
                        className="px-3 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Year"
                        value={vehicleInput.year}
                        onChange={(e) => setVehicleInput({ ...vehicleInput, year: e.target.value })}
                        className="px-3 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleAddVehicle}
                      className="w-full py-2.5 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-sm transition-colors touch-manipulation"
                    >
                      + Add Vehicle
                    </button>

                    {errors.vehicle && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.vehicle}
                      </p>
                    )}

                    {formData.compatibility.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {formData.compatibility.map((vehicle, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                            <span className="text-xs sm:text-sm font-medium text-gray-900">
                              {vehicle.make} {vehicle.model} ({vehicle.year})
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveVehicle(index)}
                              className="text-red-600 hover:text-red-700 touch-manipulation"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Feature Toggles */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <label className="flex items-center gap-2 cursor-pointer p-3 border-2 border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                      />
                      <span className="text-sm font-medium text-gray-900">Featured Product</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer p-3 border-2 border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                      <input
                        type="checkbox"
                        name="bestSeller"
                        checked={formData.bestSeller}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                      />
                      <span className="text-sm font-medium text-gray-900">Best Seller</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </form>

          {/* Footer - Sticky Buttons */}
          <div className="border-t border-gray-200 bg-gray-50 p-4 sm:p-6">
            <div className="flex gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 sm:flex-none sm:px-6 py-3 sm:py-3.5 border-2 border-gray-300 hover:border-gray-400 bg-white text-gray-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 touch-manipulation text-sm sm:text-base"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Back</span>
                </button>
              )}
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 py-3 sm:py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg touch-manipulation text-sm sm:text-base"
                >
                  <span>Continue</span>
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 sm:py-3.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg touch-manipulation text-sm sm:text-base"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-4 w-4 sm:w-5 sm:h-5 animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 w-4 sm:w-5 sm:h-5" />
                      <span>Create Product</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;