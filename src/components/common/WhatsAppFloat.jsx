// src/components/common/WhatsAppFloat.jsx
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../../utils/constants';

const WhatsAppFloat = () => {
  const handleClick = () => {
    const message = encodeURIComponent('Hi! I would like to inquire about auto parts.');
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      
      {/* Pulse Animation */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
      
      {/* Badge */}
      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
        1
      </span>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
        <div className="bg-dark text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap shadow-lg">
          Chat with us on WhatsApp
          <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-dark"></div>
        </div>
      </div>
    </button>
  );
};

export default WhatsAppFloat;