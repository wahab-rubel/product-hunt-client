import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageSlider = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-24 rounded-3xl overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="rounded-3xl"
      >
        <SwiperSlide>
          <img src="https://i.ibb.co.com/ymkzKcpv/OIP.jpg" alt="Slide 1" className="w-full h-80 object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/JWS3ZrWS/notion-mqgy-1920.webp" alt="Slide 2" className="w-full h-80 object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/yGdbs1n/R.png" alt="Slide 3" className="w-full h-80 object-cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ImageSlider;
