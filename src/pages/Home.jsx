// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Hero from '../components/home/Hero';
import VehicleShowcase from '../components/home/VehicleShowcase';
import { getFeaturedProducts, getBestSellers } from '../redux/slices/productSlice';
import { scrollToTop } from '../utils/helpers';
import PartsCategories from '../components/home/PartsCategories';
import BestSellers from '../components/home/BestSellers';
import About from '../components/home/About';
import Testimonials from '../components/home/Testimonials';
import Contact from '../components/home/Contact';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    scrollToTop('auto');
    dispatch(getFeaturedProducts());
    dispatch(getBestSellers());
  }, [dispatch]);

  return (
    <div className="animate-fade-in">
      <Hero />
      <VehicleShowcase />
   <PartsCategories/>
   <BestSellers/>
   <About/>
   <Testimonials/>
   <Contact/>

      
     
    </div>
  );
};

export default Home;