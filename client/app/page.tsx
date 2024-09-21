import BestSellingProducts from "@/components/Home/BestSelling";
import CategoriesSection from "@/components/Home/Categories";
import Hero from "@/components/Home/Hero";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <CategoriesSection />
      <BestSellingProducts />
    </div>
  );
};

export default Home;
