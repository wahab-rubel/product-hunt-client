import React from 'react';
import Navbar from "../../components/Navbar"
import { Outlet } from 'react-router-dom';
import Slider from "./ImageSlider"
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
const Home = () => {
 return (
  <div>
   <Navbar />
   <Slider />
   <FeaturedProducts />
   <Outlet />
  </div>
 );
};

export default Home;