// src/services/uploadService.js
import imageCompression from 'browser-image-compression';

const CLOUDINARY_CLOUD_NAME = 'dzusdhcd2';
const CLOUDINARY_UPLOAD_PRESET = 'jomo_auto_products';

// Validate image file
export const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.');
  }

  if (file.size > maxSize) {
    throw new Error('File size too large. Maximum size is 5MB.');
  }

  return true;
};

// Compress image before upload
export const compressImage = async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error('Image compression error:', error);
    throw error;
  }
};

// OPTION 1: Try with fetch (your current method)
export const uploadToCloudinary = async (file) => {
  try {
    validateImageFile(file);
    
    console.log('🚀 Attempting upload to:', CLOUDINARY_CLOUD_NAME);
    console.log('📋 Using preset:', CLOUDINARY_UPLOAD_PRESET);
    
    const compressedFile = await compressImage(file);
    console.log('✅ Compressed:', compressedFile.size, 'bytes');

    const formData = new FormData();
    formData.append('file', compressedFile);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'jomo-auto-parts');

    console.log('📤 Uploading...');
    console.log('URL:', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    const data = await response.json();
    
    console.log('📥 Response status:', response.status);
    console.log('📥 Response data:', data);

    if (!response.ok) {
      console.error('❌ Full error response:', data);
      
      // Provide specific error messages
      if (data.error?.message?.includes('Invalid upload preset')) {
        throw new Error(
          'Upload preset not found. Please create "jomo_auto_products" preset in Cloudinary dashboard (Settings → Upload → Add upload preset). Make sure Signing Mode is set to "Unsigned".'
        );
      }
      
      if (data.error?.message?.includes('API key')) {
        throw new Error(
          `Cloudinary cloud name "${CLOUDINARY_CLOUD_NAME}" not found. Please verify your cloud name in Cloudinary dashboard.`
        );
      }
      
      throw new Error(data.error?.message || `Upload failed: ${response.status}`);
    }

    console.log('✅ Upload successful!');
    return {
      url: data.secure_url,
      publicId: data.public_id
    };
  } catch (error) {
    console.error('❌ Upload error:', error);
    throw error;
  }
};

// OPTION 2: Upload using XMLHttpRequest (alternative method)
export const uploadToCloudinaryXHR = async (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      validateImageFile(file);
      const compressedFile = await compressImage(file);

      const formData = new FormData();
      formData.append('file', compressedFile);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', 'jomo-auto-parts');

      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);

      xhr.onload = function() {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          console.log('✅ XHR Upload successful:', data.secure_url);
          resolve({
            url: data.secure_url,
            publicId: data.public_id
          });
        } else {
          const error = JSON.parse(xhr.responseText);
          console.error('❌ XHR Upload failed:', error);
          reject(new Error(error.error?.message || 'Upload failed'));
        }
      };

      xhr.onerror = function() {
        reject(new Error('Network error occurred'));
      };

      xhr.send(formData);
    } catch (error) {
      reject(error);
    }
  });
};

// Upload multiple images
export const uploadMultipleImages = async (files) => {
  const results = [];
  
  for (let i = 0; i < files.length; i++) {
    try {
      console.log(`📤 Uploading ${i + 1}/${files.length}`);
      const result = await uploadToCloudinary(files[i]);
      results.push(result);
    } catch (error) {
      console.error(`❌ Failed to upload ${files[i].name}:`, error);
      throw error;
    }
  }
  
  return results;
};