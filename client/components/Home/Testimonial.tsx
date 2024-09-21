"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Navigation } from "swiper/modules";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Image from "next/image";

const Testimonial = () => {
  const testimonials = [
    {
      name: "John Doe",
      image: "/path/to/image1.jpg",
      feedback:
        "This product has completely transformed my business. The results are beyond my expectations!",
    },
    {
      name: "Jane Smith",
      image: "/path/to/image2.jpg",
      feedback:
        "Incredible service and fantastic quality. I’ve never worked with such a dedicated team before.",
    },
    {
      name: "Alex Johnson",
      image: "/path/to/image3.jpg",
      feedback:
        "I would highly recommend their services. They are professional, attentive, and deliver excellent results.",
    },
    {
      name: "Emily Brown",
      image: "/path/to/image4.jpg",
      feedback:
        "Amazing experience! The quality and service were top-notch. I will definitely come back again.",
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
          What Our Clients Say
        </h2>
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            pagination={{ clickable: true }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2, // Display two slides on larger screens
              },
            }}
            loop={true}
            className="swiper-wrapper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="flex justify-center mb-4">
                    <Image
                        width={1000}
                        height={1000}
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full border-4 border-primary-500 object-cover"
                    />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-lg italic mb-4">
                    "{testimonial.feedback}"
                  </p>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows Below the Testimonial */}
          <div className="flex justify-center gap-4 mt-6">
            <button className="custom-prev bg-primary-500 text-white p-3 rounded-full hover:bg-primary-600 transition">
              <AiOutlineLeft size={20} />
            </button>
            <button className="custom-next bg-primary-500 text-white p-3 rounded-full hover:bg-primary-600 transition">
              <AiOutlineRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
