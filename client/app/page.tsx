import BestSellingProducts from "@/components/Home/BestSelling";
import CategoriesSection from "@/components/Home/Categories";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import Hero from "@/components/Home/Hero";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <CategoriesSection />
      <BestSellingProducts />
      <FeaturedProducts/>
    </div>
  );
};

export default Home;
