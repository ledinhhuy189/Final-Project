import { Image } from '@chakra-ui/react';
import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import image1 from '../../../../assets/banner/1.webp';
import image2 from '../../../../assets/banner/2.jpg';
import image3 from '../../../../assets/banner/3.webp';

const HomeBanner = () => {
   return (
      <Swiper
         spaceBetween={20}
         slidesPerView={1}
         loop={true}
         style={{ borderRadius: 10, zIndex: 0 }}
      >
         <SwiperSlide>
            <Image src={image2} rounded='xl' />
         </SwiperSlide>
         <SwiperSlide>
            <Image src={image3} rounded='xl' />
         </SwiperSlide>
         <SwiperSlide>
            <Image src={image1} rounded='xl' />
         </SwiperSlide>
      </Swiper>
   );
};

export default HomeBanner;
