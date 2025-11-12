// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT_INFO, SOCIAL_MEDIA } from '../../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Quick Links': [
      { name: 'Home', path: '/' },
      { name: 'Shop Parts', path: '/parts' },
      { name: 'Vehicles', path: '/vehicles' },
      { name: 'About Us', path: '/#about' }
    ],
    'Customer Service': [
      { name: 'Contact Us', path: '/#contact' },
      { name: 'Shipping Info', path: '/shipping' },
      { name: 'Returns', path: '/returns' },
      { name: 'Track Order', path: '/orders' }
    ],
    'Account': [
      { name: 'My Account', path: '/profile' },
      { name: 'Order History', path: '/orders' },
      { name: 'Wishlist', path: '/wishlist' },
      { name: 'Help Center', path: '/help' }
    ]
  };

  return (
    <footer className="bg-dark pt-16 pb-8">
      <div className="container-custom">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo.png" 
                alt="Jomo Auto World" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h3 className="font-impact text-xl text-primary">JOMO AUTO WORLD</h3>
                <p className="text-xs text-gray-400">Your Trusted Parts Partner</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-4 text-sm">
              Premium auto parts from Japan. Quality guaranteed, tested thoroughly, 
              and delivered to your doorstep with same-day service across Nairobi.
            </p>
            <div className="flex space-x-4">
              <a 
                href={SOCIAL_MEDIA.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href={SOCIAL_MEDIA.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href={SOCIAL_MEDIA.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-bold mb-4 text-sm">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-semibold text-sm mb-1">Call Us</p>
                <a 
                  href={`tel:${CONTACT_INFO.phone}`} 
                  className="text-gray-400 hover:text-primary text-sm"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-semibold text-sm mb-1">Email Us</p>
                <a 
                  href={`mailto:${CONTACT_INFO.email}`} 
                  className="text-gray-400 hover:text-primary text-sm"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-semibold text-sm mb-1">Visit Us</p>
                <p className="text-gray-400 text-sm">
                  {CONTACT_INFO.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} Jomo Auto World. All rights reserved.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link to="/privacy" className="text-gray-400 hover:text-primary text-sm">
              Privacy Policy
            </Link>
            <span className="text-gray-600">|</span>
            <Link to="/terms" className="text-gray-400 hover:text-primary text-sm">
              Terms of Service
            </Link>
            <span className="text-gray-600">|</span>
            <p className="text-gray-400 text-sm">
              Powered by <span className="text-white font-semibold">Brandy Software Solutions</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;