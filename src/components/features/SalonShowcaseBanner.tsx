import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css/bundle';
import { ChevronRight, ChevronLeft, Scissors, Smile, Sparkles, Hand, Droplet, Star } from 'lucide-react';

const slides = [
  {
    id: 1,
    title1: "Your Beauty,",
    title2: "Our Priority",
    description: "Explore top-rated salons, personalized services and amazing beauty experiences near you.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
    cta: "Explore Salons",
    link: "/discover"
  },
  {
    id: 2,
    title1: "Bridal Makeup",
    title2: "Studio",
    description: "Make your special day unforgettable with our premium bridal transformations.",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=80",
    cta: "Book Now",
    link: "/discover"
  },
  {
    id: 3,
    title1: "Luxury Hair &",
    title2: "Spa Treatments",
    description: "Relax and rejuvenate with exclusive spa and hair care treatments.",
    image: "https://images.unsplash.com/photo-1516975080665-2204519859f5?auto=format&fit=crop&w=1200&q=80",
    cta: "Book Appointment",
    link: "/discover"
  },
];

const categories = [
  { name: 'Hair Care', sub: 'Haircuts, Color, Styling', icon: Scissors },
  { name: 'Skin Care', sub: 'Facials, Cleansing, More', icon: Smile },
  { name: 'Makeup', sub: 'Bridal, Party, Events', icon: Sparkles },
  { name: 'Nail Care', sub: 'Manicure, Pedicure', icon: Hand },
  { name: 'Spa & Relaxation', sub: 'Massage, Spa, More', icon: Droplet },
  { name: 'Beauty Treatments', sub: 'Laser, Waxing, More', icon: Star },
];

export function SalonShowcaseBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full mb-12"
    >
      <div className="relative group rounded-[2rem]">
        <style>{`
          .swiper-slide {
            transition: all 0.3s ease;
            transform: scale(0.9);
            opacity: 0.6;
            border-radius: 2rem;
            overflow: hidden;
          }
          .swiper-slide-active {
            transform: scale(1);
            opacity: 1;
            box-shadow: 0 20px 40px -15px rgba(0,0,0,0.1);
          }
          .swiper-slide:not(.swiper-slide-active) .slide-content {
            opacity: 0;
            pointer-events: none;
          }
          .custom-prev, .custom-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 48px;
            height: 48px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #f43f5e;
            box-shadow: 0 4px 14px rgba(0,0,0,0.1);
            z-index: 20;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .custom-prev:hover, .custom-next:hover {
            background: #fff1f2;
            transform: translateY(-50%) scale(1.05);
          }
          .custom-prev { left: 4%; }
          .custom-next { right: 4%; }
        `}</style>
        
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={16}
          slidesPerView={1.15}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
            bulletClass: 'inline-block w-2.5 h-2.5 rounded-full bg-gray-300 mx-1 cursor-pointer transition-all',
            bulletActiveClass: '!bg-rose-500 !w-8',
          }}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          breakpoints={{
            768: {
              slidesPerView: 1.25,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 1.4,
              spaceBetween: 32,
            }
          }}
          className="h-[350px] md:h-[450px] w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full bg-gray-100 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                
                {/* Text and Gradient - Hidden via CSS if not active */}
                <div className="slide-content absolute inset-0 transition-opacity duration-500">
                  <div className="absolute inset-y-0 left-0 w-full md:w-3/5 bg-gradient-to-r from-white via-white/90 to-transparent" />
                  
                  <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center items-start">
                    <div className="max-w-md relative z-10">
                      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-2">
                        {slide.title1} <br/>
                        <span className="text-rose-500 italic font-serif tracking-wide">{slide.title2}</span>
                        <span className="absolute -top-4 -right-8 text-rose-300">✦</span>
                        <span className="absolute bottom-4 -right-12 text-rose-300">✦</span>
                      </h2>
                      <p className="text-gray-600 mt-4 mb-8 text-sm md:text-base leading-relaxed">
                        {slide.description}
                      </p>
                      <Link to={slide.link}>
                        <button className="bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-6 rounded-full flex items-center gap-2 transition-all shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:-translate-y-0.5">
                          {slide.cta} <ChevronRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-prev hidden md:flex"><ChevronLeft className="w-6 h-6" /></div>
        <div className="custom-next hidden md:flex"><ChevronRight className="w-6 h-6" /></div>
      </div>

      <div className="flex justify-center mt-6">
        <div className="custom-pagination flex items-center h-4"></div>
      </div>

      <div className="mt-12 bg-white rounded-3xl p-6 shadow-sm border border-rose-100">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-rose-50 group-hover:bg-rose-100 flex items-center justify-center mb-3 transition-colors text-rose-500">
                <cat.icon className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900">{cat.name}</h4>
              <p className="text-xs text-gray-500 mt-1">{cat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
