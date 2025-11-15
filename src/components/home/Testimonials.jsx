// src/components/home/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'James Kariuki',
      location: 'Eastleigh, Nairobi',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
      rating: 5,
      text: 'Found genuine brake pads for my Probox within hours. Installation was smooth, delivery even faster. Finally, a parts shop I can trust.',
      vehicle: 'Toyota Probox'
    },
    {
      id: 2,
      name: 'Mercy Wambui',
      location: 'Westlands, Nairobi',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
      rating: 5,
      text: 'They had the exact shock absorbers my mechanic recommended. Ordered online, delivered same day. Quality is unmatched.',
      vehicle: 'Honda Fit'
    },
    {
      id: 3,
      name: 'David Otieno',
      location: 'Industrial Area, Nairobi',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
      rating: 5,
      text: 'As a mechanic, I order from Jomo weekly. Parts are genuine, prices fair, and they never delay. My workshop runs smoother because of them.',
      vehicle: 'Professional Mechanic'
    },
    {
      id: 4,
      name: 'Grace Nyambura',
      location: 'Karen, Nairobi',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
      rating: 5,
      text: 'Struggled for weeks to find parts for my Belta. One call to Jomo and everything was sorted. Expert advice, genuine parts, zero stress.',
      vehicle: 'Toyota Belta'
    },
    {
      id: 5,
      name: 'Peter Kimani',
      location: 'Ngong Road, Nairobi',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200',
      rating: 5,
      text: 'Managing 12 fleet vehicles means I need reliability. Jomo delivers every time—bulk orders, competitive pricing, consistent quality.',
      vehicle: 'Fleet Manager'
    },
    {
      id: 6,
      name: 'Ann Muthoni',
      location: 'Kilimani, Nairobi',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200',
      rating: 5,
      text: 'First time buying car parts online. The team walked me through everything. Got my filters delivered in 3 hours. Impressed.',
      vehicle: 'Nissan Wingroad'
    }
  ];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

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
    <section className="py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className="text-4xl md:text-5xl font-bold text-black mb-3 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What <span className="text-red-600">Nairobi</span> Says
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Real voices. Real experiences. Real trust.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden border border-gray-200">
            {/* Decorative Quote */}
            <Quote className="absolute top-6 right-6 w-16 h-16 text-gray-100" />

            {/* Testimonial Content */}
            <div className="relative z-10">
              <div className="flex flex-col items-center text-center mb-6">
                {/* User Image */}
                <div className="relative mb-6">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="relative w-24 h-24 rounded-full object-cover border-3 border-red-600 shadow-lg"
                  />
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-red-500 text-red-500" 
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p 
                  className="text-lg md:text-xl text-gray-800 leading-relaxed mb-6 max-w-2xl"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  "{testimonials[currentIndex].text}"
                </p>

                {/* User Info */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-black">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {testimonials[currentIndex].location}
                  </p>
                  <div className="inline-block bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium border border-red-200">
                    {testimonials[currentIndex].vehicle}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 
                     bg-white p-3 rounded-full shadow-lg hover:shadow-xl border border-gray-200
                     hover:scale-110 transition-all duration-300 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-black" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 
                     bg-white p-3 rounded-full shadow-lg hover:shadow-xl border border-gray-200
                     hover:scale-110 transition-all duration-300 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-black" />
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
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;