import { Swiper, SwiperSlide } from "swiper/react";
import image1 from "../images/image.png";
import image2 from "../images/s1.jpg";
import image3 from "../images/s2.jpg";
import image4 from "../images/s3.jpg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* Image Slides */}
        <SwiperSlide>
          <img
            src={image1}
            alt="Slide 1"
            className="w-full h-[400px] object-contain rounded-lg"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={image2}
            alt="Slide 2"
            className="w-full h-[400px] object-contain rounded-lg"
          />
        </SwiperSlide>

        {/* Video Slide */}
        <SwiperSlide>
          <img
            src={image3}
            className="w-full h-[400px] object-contain rounded-lg"
          />
        </SwiperSlide>

        {/* More slides */}
        <SwiperSlide>
          <img
            src={image4}
            alt="Slide 3"
            className="w-full h-[400px] object-contain rounded-lg"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
