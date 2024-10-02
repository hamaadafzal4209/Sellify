"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../Products/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/app/redux/Features/product/productAction";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { allProducts, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <section className="main-container py-12">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="section-heading">Featured Products</h2>
      </div>

      {/* Product Grid */}
      <div className="card-container gap-6">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;