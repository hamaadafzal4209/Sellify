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
      image: "/assets/user-1.png",
      feedback:
        "This product has completely transformed my business. The results are beyond my expectations!",
    },
    {
      name: "Jane Smith",
      image: "/assets/user-1.png",
      feedback:
        "Incredible service and fantastic quality. I’ve never worked with such a dedicated team before.",
    },
    {
      name: "Alex Johnson",
      image: "/assets/user-1.png",
      feedback:
        "I would highly recommend their services. They are professional, attentive, and deliver excellent results.",
    },
    {
      name: "Emily Brown",
      image: "/assets/user-1.png",
      feedback:
        "Amazing experience! The quality and service were top-notch. I will definitely come back again.",
    },
  ];

  return (
    <section className="py-16 main-container">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">
          What Our Clients Say
        </h2>
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 3000,
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
                slidesPerView: 2,
              },
            }}
            loop={true}
            className="swiper-wrapper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-center mb-6">
                    <Image
                      width={1000}
                      height={1000}
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full border-4 border-primary-500 object-cover"
                    />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg italic mb-4">
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
          <div className="flex justify-center gap-6 mt-8">
            <button className="custom-prev bg-primary-500 text-white p-3 rounded-full hover:bg-primary-600 transition duration-300 shadow-lg">
              <AiOutlineLeft size={24} />
            </button>
            <button className="custom-next bg-primary-500 text-white p-3 rounded-full hover:bg-primary-600 transition duration-300 shadow-lg">
              <AiOutlineRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
