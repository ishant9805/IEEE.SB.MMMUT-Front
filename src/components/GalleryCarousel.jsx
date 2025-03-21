import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const Carousel = () => {
  const carouselData = [
    {
      image: "image1.JPG",
      title: "Glimps of Hackfest'23",
      description: "Winners getting prizes."
    },
    {
      image: "image2.JPG",
      title: "Glimps of Hackfest'23",
      description: "Students Participating in the event"
    },
    {
      image: "image3.JPG",
      title: "Glimps of Hackfest'23",
      description: "....."
    },
    {
      image: "image4.JPG",
      title: "Glimps of Hackfest'23",
      description: "......"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="mySwiper"
      >
        {carouselData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Image on the left */}
              <div className="w-full md:w-1/2 h-64 md:h-96">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title and description on the right */}
              <div className="w-full md:w-1/2 p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  {slide.title}
                </h2>
                <p className="text-gray-600 text-base md:text-lg">
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;