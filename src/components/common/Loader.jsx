// src/components/common/Loader.jsx
import React from 'react';

const Loader = ({ fullScreen = false, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-3',
    lg: 'h-16 w-16 border-4'
  };

  const loader = (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white dark:bg-navy p-8 rounded-xl shadow-2xl">
          {loader}
          <p className="text-dark dark:text-white mt-4 text-sm font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return loader;
};

export default Loader;