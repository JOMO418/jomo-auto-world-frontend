// src/components/admin/AddProductModal.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Save, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { createProduct } from '../../redux/slices/productSlice';
import ImageUploader from './ImageUploader';
import { CATEGORIES, BRANDS, VEHICLE_MAKES, PRODUCT_CONDITIONS } from '../../utils/constants';

const AddProductModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.products);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    partNumber: '',
    price: '',
    originalPrice: '',
    stock: '',
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
      toast.error('Please fill vehicle model and year');
      return;
    }

    setFormData(prev => ({
      ...prev,
      compatibility: [...prev.compatibility, { ...vehicleInput }]
    }));

    setVehicleInput({ make: 'Toyota', model: '', year: '' });
    toast.success('Vehicle added');
  };

  const handleRemoveVehicle = (index) => {
    setFormData(prev => ({
      ...prev,
      compatibility: prev.compatibility.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.price || !formData.partNumber) {
      toast.error('Please fill all required fields');
      return;
    }

    if (formData.images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    if (formData.compatibility.length === 0) {
      toast.error('Please add at least one compatible vehicle');
      return;
    }

    // Find category ID from slug
    const selectedCategory = CATEGORIES.find(cat => cat.slug === formData.category);
    
    const productData = {
      ...formData,
      category: selectedCategory?.slug, // Send slug, backend will handle
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : 0,
      stock: parseInt(formData.stock)
    };
    // ADD THIS TO DEBUG:
  console.log('🚀 Sending product data:', productData);
  console.log('📸 Images:', productData.images);
  console.log('🚗 Compatibility:', productData.compatibility);

  

    const result = await dispatch(createProduct(productData));
    
    if (result.type === 'products/create/fulfilled') {
      toast.success('Product created successfully!');
      onClose();
    }
  };

  const nextStep = () => {
    if (step === 1 && formData.images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }
    if (step === 2 && (!formData.name || !formData.partNumber)) {
      toast.error('Please fill product name and part number');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-red-600 to-red-700">
            <div>
              <h2 className="text-2xl font-bold text-white">Add New Product</h2>
              <p className="text-sm text-red-100 mt-1">Step {step} of 3</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-gray-100">
            <div 
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
            {/* Step 1: Images */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-black mb-2">Product Photos</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload clear photos of the product. First image will be the main photo.
                  </p>
                </div>
                <ImageUploader
                  images={formData.images}
                  onChange={(images) => setFormData({ ...formData, images })}
                  maxImages={5}
                />
              </div>
            )}

            {/* Step 2: Basic Info */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-black mb-4">Basic Information</h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Brake Pads - Front Set"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Part Number *
                  </label>
                  <input
                    type="text"
                    name="partNumber"
                    value={formData.partNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., BP-12345"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent uppercase"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select...</option>
                      {CATEGORIES.map(cat => (
                        <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Brand *
                    </label>
                    <select
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    >
                      {BRANDS.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Detailed product description..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Pricing & Stock */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-black mb-4">Pricing & Details</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price (KES) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="5000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      placeholder="10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Condition
                  </label>
                  <select
                    value={formData.specifications.condition}
                    onChange={(e) => handleSpecChange('condition', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {PRODUCT_CONDITIONS.map(cond => (
                      <option key={cond.value} value={cond.value}>{cond.label}</option>
                    ))}
                  </select>
                </div>

                {/* Compatible Vehicles */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Compatible Vehicles *
                  </label>
                  
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <select
                      value={vehicleInput.make}
                      onChange={(e) => setVehicleInput({ ...vehicleInput, make: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
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
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Year"
                      value={vehicleInput.year}
                      onChange={(e) => setVehicleInput({ ...vehicleInput, year: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddVehicle}
                    className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-sm transition-colors"
                  >
                    + Add Vehicle
                  </button>

                  {formData.compatibility.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {formData.compatibility.map((vehicle, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">
                            {vehicle.make} {vehicle.model} ({vehicle.year})
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveVehicle(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Feature Toggles */}
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Featured Product</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="bestSeller"
                      checked={formData.bestSeller}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Best Seller</span>
                  </label>
                </div>
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-3 px-6 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-xl transition-colors"
                >
                  Back
                </button>
              )}
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
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