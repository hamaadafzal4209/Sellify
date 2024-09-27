"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../Products/ProductCard";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products?limit=20"); // Limit to 4 products
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="main-container py-12">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="section-heading">Featured Products</h2>
      </div>

      {/* Product Grid */}
      <div className="card-container gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;