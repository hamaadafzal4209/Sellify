"use client";
import React from "react";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ relatedProducts = [] }) => {
  return (
    <div className="mt-12">
      <h3 className="text-lg font-semibold">Related Products</h3>
      <div className="card-container gap-4 mt-4">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-gray-600">No related products found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
