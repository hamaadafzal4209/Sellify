"use client";
import React from "react";
import ProductCard from "../Products/ProductCard";

const BestSellingProducts = () => {
  return (
    <section className="main-container pb-12">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="section-heading">Best Deals</h2>
      </div>

      {/* Product Grid */}
      <div className="card-container gap-6">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
};

export default BestSellingProducts;
