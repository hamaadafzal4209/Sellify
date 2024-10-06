"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Happy Customer",
    content: "This ecommerce site has the best selection and prices. I always find what I'm looking for!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: 2,
    name: "Mike Thompson",
    role: "Loyal Shopper",
    content: "The customer service is outstanding. They went above and beyond to help me with my order.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Frequent Buyer",
    content: "I love the user-friendly interface and how easy it is to navigate through products.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    role: "Tech Enthusiast",
    content: "The range of tech products is impressive. I always find the latest gadgets here!",
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: 5,
    name: "Linda Chen",
    role: "Fashion Lover",
    content: "The fashion collection is always up-to-date. I've found my style icon in this store!",
    image: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=150&h=150&fit=crop&crop=faces",
  },
]

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setVisibleCount(3)
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2)
      } else {
        setVisibleCount(1)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="main-container">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="relative max-w-6xl mx-auto">
          <div className="flex justify-between items-center gap-6 overflow-hidden">
            {[...Array(visibleCount)].map((_, index) => {
              const testimonialIndex = (currentIndex + index) % testimonials.length
              const testimonial = testimonials[testimonialIndex]
              return (
                <Card key={testimonial.id} className="flex-shrink-0 w-full md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                      <div className="text-center">
                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <blockquote className="mt-4 text-center italic text-gray-700">
                      "{testimonial.content}"
                    </blockquote>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Testimonial;
