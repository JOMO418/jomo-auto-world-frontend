// src/components/admin/ImageUploader.jsx
import React, { useState, useRef } from 'react';
import { Camera, X, Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { uploadToCloudinary, validateImageFile } from '../../services/uploadService';

const ImageUploader = ({ images = [], onChange, maxImages = 5 }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    
    if (images.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);
    const uploadedImages = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file
        try {
          validateImageFile(file);
        } catch (error) {
          toast.error(error.message);
          continue;
        }

        // Upload to Cloudinary
        const uploaded = await uploadToCloudinary(file);
        uploadedImages.push({
          url: uploaded.url,
          public_id: uploaded.publicId,
          order: images.length + uploadedImages.length
        });

        // Update progress
        setProgress(((i + 1) / files.length) * 100);
      }

      onChange([...images, ...uploadedImages]);
      toast.success(`${uploadedImages.length} image(s) uploaded successfully`);
    } catch (error) {
      toast.error('Failed to upload images');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
      setProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
    toast.success('Image removed');
  };

  const handleReorder = (fromIndex, toIndex) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    onChange(newImages.map((img, idx) => ({ ...img, order: idx })));
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || images.length >= maxImages}
          className="relative w-full h-40 border-2 border-dashed border-gray-300 rounded-2xl hover:border-red-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-50 hover:bg-red-50"
        >
          <div className="flex flex-col items-center justify-center h-full gap-3">
            {uploading ? (
              <>
                <Upload className="w-10 h-10 text-red-600 animate-bounce" />
                <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">Uploading... {Math.round(progress)}%</span>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <Camera className="w-8 h-8 text-red-600" />
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
                <div className="text-center">
                  <p className="text-base font-semibold text-gray-700">
                    Tap to Upload Photos
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Take photo or choose from gallery
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {images.length}/{maxImages} images • Max 5MB each
                </span>
              </>
            )}
          </div>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {images.length === 0 && (
          <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">First photo is the main image</p>
              <p className="text-xs text-blue-600 mt-1">Customers will see this first</p>
            </div>
          </div>
        )}
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700">
            Uploaded Photos ({images.length}/{maxImages})
          </p>
          <div className="grid grid-cols-3 gap-3">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 hover:border-red-500 transition-all group"
              >
                {/* Main Image Badge */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    MAIN
                  </div>
                )}

                {/* Image */}
                <img
                  src={image.url}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Overlay with Remove Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Order Number */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-700 shadow-md">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Reorder Instructions */}
          {images.length > 1 && (
            <p className="text-xs text-gray-500 text-center">
              First image is the main product photo
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;