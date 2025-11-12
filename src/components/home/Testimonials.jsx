// src/components/home/Testimonials.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'John Kamau',
      role: 'Toyota Probox Owner',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
      rating: 5,
      text: 'Excellent service! I found all the parts I needed for my Probox at great prices. The quality is outstanding and delivery was super fast. Highly recommended!',
      vehicle: 'Toyota Probox'
    },
    {
      id: 2,
      name: 'Mary Wanjiku',
      role: 'Car Enthusiast',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
      rating: 5,
      text: 'Jomo Auto World is my go-to place for genuine parts. The staff is knowledgeable and always helps me find exactly what I need. Best auto parts shop in Nairobi!',
      vehicle: 'Honda Fit'
    },
    {
      id: 3,
      name: 'David Ochieng',
      role: 'Mechanic',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150',
      rating: 5,
      text: 'As a mechanic, I need reliable parts suppliers. Jomo Auto World never disappoints! Quality parts, competitive prices, and excellent customer service.',
      vehicle: 'Multiple Vehicles'
    },
    {
      id: 4,
      name: 'Grace Akinyi',
      role: 'Toyota Belta Owner',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150',
      rating: 5,
      text: 'I was struggling to find parts for my Belta until I discovered Jomo Auto World. They had everything in stock! The online ordering process was smooth and delivery was prompt.',
      vehicle: 'Toyota Belta'
    },
    {
      id: 5,
      name: 'Peter Mwangi',
      role: 'Fleet Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150',
      rating: 5,
      text: 'Managing a fleet of vehicles, I need a dependable parts supplier. Jomo Auto World has been exceptional with bulk orders and their prices are unbeatable!',
      vehicle: 'Fleet Operations'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Our <span className="text-red-600">Customers Say</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-5xl mx-auto relative">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <Quote className="absolute top-6 right-6 w-16 h-16 text-red-100 dark:text-red-900/20" />

            {/* Testimonial Content */}
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
                {/* User Image */}
                <div className="flex-shrink-0">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-red-600 shadow-lg"
                  />
                </div>

                {/* User Info & Rating */}
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {testimonials[currentIndex].role}
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="inline-block bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 
                                px-3 py-1 rounded-full text-sm font-medium">
                    {testimonials[currentIndex].vehicle}
                  </div>
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic mb-8">
                "{testimonials[currentIndex].text}"
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 
                     bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-red-600 
                     hover:text-white transition-all duration-300 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-white" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 
                     bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-red-600 
                     hover:text-white transition-all duration-300 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-white" />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-red-600'
                    : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-red-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">1000+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">5.0</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">95%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;