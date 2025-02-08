import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
import "swiper/css";

export default function CategorySlider({ categories }) {
  return (
    <>
      <section className="mb-8">
        <h2 className="text-lg mb-5 font-semibold text-gray-800 text-nowrap">
          Shop Popular Categories
        </h2>
        <Swiper
          slidesPerView={1}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            300: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 7,
            },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id}>
              <div className="h-64">
                <img
                  className="w-full h-full object-cover"
                  src={category.image}
                  alt={category.name}
                />
              </div>
              <h3 className="text-center text-lg font-medium">
                {category.name}
              </h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
