import Hero from '@/components/Home/Hero'
import ProductCard from '@/components/Products/ProductCard'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Hero/>
      <div className="max-w-sm m-20">
      <ProductCard/>
      </div>
    </div>
  )
}

export default Home
