"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import React, { FC } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const Hero: FC<Props> = () => {
  return (
    <div>
      <Swiper
        navigation={true}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]}
      >
        <SwiperSlide>
          <div
            className="h-[70vh]"
            style={{
              background: `url('https://img.freepik.com/free-vector/shopping-time-banner-with-realistic-map-cart-gift-bags-vector-illustration_548887-120.jpg?size=626&ext=jpg&uid=R106261956&ga=GA1.1.1232935632.1724221519&semt=ais_hybrid') center no-repeat`,
              backgroundSize: "cover",
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-[70vh]"
            style={{
              background: `url('https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg') center no-repeat`,
              backgroundSize: "cover",
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-[70vh]"
            style={{
              background: `url('https://m.media-amazon.com/images/I/71qcoYgEhzL._SX3000_.jpg') center no-repeat`,
              backgroundSize: "cover",
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-[70vh]"
            style={{
              background: `url('https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg') center no-repeat`,
              backgroundSize: "cover",
            }}
          ></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
