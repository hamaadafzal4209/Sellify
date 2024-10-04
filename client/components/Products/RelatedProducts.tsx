"use client";
import React from 'react';
import ProductCard from './ProductCard'; 

const RelatedProducts = ({ relatedProducts }) => {
  return (
    <div className="mt-12">
      <h3 className="text-lg font-semibold">Related Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {relatedProducts ? (
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