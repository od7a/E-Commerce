import sliderImage1 from "../../assets/imgs/slider-image-1.jpeg";
import sliderImage2 from "../../assets/imgs/slider-image-2.jpeg";
import sliderImage3 from "../../assets/imgs/slider-image-3.jpeg";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
import "swiper/css";

export default function HomeSlider() {
  return (
    <>
      <section className="grid grid-cols-12 mb-8">
        <div className="col-span-8">
          <Swiper
            slidesPerView={1}
            loop={true}
            className="w-full h-full object-cover"
            modules={[Autoplay]}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
          >
            <SwiperSlide>
              <img
                className="w-full h-full object-cover"
                src={sliderImage1}
                alt="Slider Image 1"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full h-full object-cover"
                src={sliderImage1}
                alt="Slider Image 1"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full h-full object-cover"
                src={sliderImage1}
                alt="Slider Image 1"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="col-span-4">
          <Swiper>
            <SwiperSlide>
              <img
                src={sliderImage2}
                className="w-full h-full object-cover"
                alt="Slider Image 2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={sliderImage2}
                className="w-full h-full object-cover"
                alt="Slider Image 2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={sliderImage2}
                className="w-full h-full object-cover"
                alt="Slider Image 2"
              />
            </SwiperSlide>
          </Swiper>
          <Swiper>
            <SwiperSlide>
              <img
                src={sliderImage3}
                className="w-full h-full object-cover"
                alt="Slider Image 3"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={sliderImage3}
                className="w-full h-full object-cover"
                alt="Slider Image 3"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={sliderImage3}
                className="w-full h-full object-cover"
                alt="Slider Image 3"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
}
