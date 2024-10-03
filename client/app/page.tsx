import BestSellingProducts from "@/components/Home/BestSelling";
import CategoriesSection from "@/components/Home/Categories";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import Hero from "@/components/Home/Hero";
import NewArrivalProducts from "@/components/Home/NewArrivals";
import Testimonial from "@/components/Home/Testimonial";
import ProductDetailPopup from "@/components/Products/ProductDetailsPopup";
import React from "react";

const Home = () => {
  return (
    <div>
      <ProductDetailPopup/>
      <Hero />
      <CategoriesSection />
      <FeaturedProducts/>
      <NewArrivalProducts/>
      <BestSellingProducts />
      <Testimonial/>
    </div>
  );
};

export default Home;
