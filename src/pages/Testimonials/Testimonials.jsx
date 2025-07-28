import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Thumbs, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/effect-coverflow";


const testimonials = [
  {
    name: "Aashvi Tekade",
    role: "CEO & Founder",
    image: "/assets/aashu.jpeg",
    message:
      "Every visit feels like coming home. The flavors are rich, the ingredients are fresh, and the hospitality is unmatched. Easily my favorite place to dine with family and friends.",
  },
  {
    name: "Dipak Mundhe",
    role: "Designer",
    image: "/assets/dipak.png",
    message:
      "From the appetizers to the desserts, everything tastes absolutely amazing. The ambiance is warm, and the service is always top-notch!",
  },
  {
    name: "Maithili Ghodmare",
    role: "Store Owner",
    image: "/assets/me1.jpeg",
    message:
      "Authentic recipes, cozy atmosphere, and consistent quality. I recommend this place to anyone who appreciates good food and great vibes",
  },
];

const Testimonials = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <section id="testimonials" className="testimonials section bg-light py-5">
      <div className="container">
        {/* Section Title */}
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="fw-bold">Testimonials</h2>
          <p className="text-muted">
            What are they <span className="text-orange">saying about us?</span>
          </p>
        </div>

        {/* Main Swiper for Messages */}
        <Swiper
          modules={[Autoplay, Pagination, Thumbs]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper }}
          className="mb-4"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-item text-center px-4">
                <p className="fs-5 fst-italic text-secondary">
                  <i className="bi bi-quote quote-icon-left me-2 text-orange"></i>
                  {t.message}
                  <i className="bi bi-quote quote-icon-right ms-2 text-orange"></i>
                </p>
                <h4 className="mt-4 mb-1 fw-bold">{t.name}</h4>
                <p className="text-muted">{t.role}</p>
                <div className="stars text-warning mb-4">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill me-1"></i>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

       
        <Swiper
          modules={[Thumbs, EffectCoverflow]}
          onSwiper={setThumbsSwiper}
          watchSlidesProgress
          slidesPerView={3}
          spaceBetween={20}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index} className="text-center">
              <img
                src={t.image}
                alt={`testimonial-${index}`}
                className="rounded-circle img-fluid shadow"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  margin: "0 auto",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
