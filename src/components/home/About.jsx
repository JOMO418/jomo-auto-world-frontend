// src/components/home/About.jsx
import React from 'react';
import { Shield, Award, Users, TrendingUp } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Shield, label: 'Years Experience', value: '1+', color: 'text-red-600' },
    { icon: Award, label: 'Quality Parts', value: '500+', color: 'text-blue-600' },
    { icon: Users, label: 'Happy Customers', value: '1000+', color: 'text-green-600' },
    { icon: TrendingUp, label: 'Growth Rate', value: '95%', color: 'text-purple-600' }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="text-red-600">Jomo Auto World</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your trusted partner for genuine auto parts and accessories since 2025
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div className="space-y-6 animate-slide-in-left">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              Home of Genuine Parts
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              At Jomo Auto World, we specialize in providing high-quality, genuine auto parts 
              for a wide range of vehicles. Our commitment to excellence has made us the 
              go-to destination for car owners and mechanics across Kenya.
            </p>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We pride ourselves on our extensive inventory, competitive prices, and 
              exceptional customer service. Whether you're looking for engine parts, 
              body accessories, or maintenance supplies, we have everything you need 
              to keep your vehicle running smoothly.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    100% Genuine Parts
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    All our products are sourced directly from authorized distributors
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Award className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Quality Guaranteed
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Every part comes with a warranty and quality assurance
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Expert Support
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Our team is always ready to help you find the right parts
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800"
                alt="Auto Parts Workshop"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-red-600 text-white p-6 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="text-4xl font-bold">1+</div>
                <div className="text-sm font-medium">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl 
                         transition-all duration-300 hover:-translate-y-2 text-center group"
              >
                <Icon className={`w-12 h-12 ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;