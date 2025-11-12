// src/components/common/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ size = 'md', showText = true, className = '' }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-20 w-20'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <Link 
      to="/" 
      className={`flex items-center gap-3 group ${className}`}
    >
      {/* Logo Image */}
      <div className="relative">
        <img 
          src="/logo.png" 
          alt="Jomo Auto World" 
          className={`${sizes[size]} object-contain transition-transform group-hover:scale-110`}
        />
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
      </div>

      {/* Text */}
      {showText && (
        <div>
          <h1 className={`font-impact ${textSizes[size]} text-white tracking-wider leading-tight`}>
            JOMO AUTO WORLD
          </h1>
          <p className="text-xs text-gray-400">Your Trusted Parts Partner</p>
        </div>
      )}
    </Link>
  );
};

export default Logo;