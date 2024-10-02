"use client";
import React, { useEffect } from "react";
import ProductCard from "../Products/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/app/redux/Features/product/productAction";

const BestSellingProducts = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Sort products by ratings in descending order
  const sortedProducts = [...allProducts].sort((a, b) => b.sold_out - a.sold_out).slice(0,8);

  return (
    <section className="main-container py-12">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="section-heading">Featured Products</h2>
      </div>

      {/* Product Grid */}
      <div className="card-container gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSellingProducts;