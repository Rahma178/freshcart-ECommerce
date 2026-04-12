
"use client" 
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



// Import Swiper styles
import 'swiper/css';

import Image from 'next/image';

export default function MySlider({slidesPerView,pageList,}: {slidesPerView: number;pageList: string[];
}) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      loop
      slidesPerView={slidesPerView}
       navigation
       pagination={{
        clickable: true,
        renderBullet: (index, className) => {
          return `<span class="${className} bg-white! w-5! h-3! rounded-3xl!"></span>`
        },
        bulletActiveClass: 'bg-white! opacity-100! w-10! rounded-3xl!'
      }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {pageList.map((img) => (
        <SwiperSlide key={img}>
  <div className="relative">
    <Image 
      src={img} 
      alt="pic" 
      width={1200} 
  height={500} 
      className="w-full h-70 object-cover" 
    />

   
    <div className="absolute inset-0 bg-green-500/50"></div>
  </div>
</SwiperSlide>
      ))}
    </Swiper>
  );
}