import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import qs from 'query-string';

import image1 from '../../../../assets/category/category1.jpg';
import image2 from '../../../../assets/category/category2.jpg';
import image3 from '../../../../assets/category/category3.jpg';
import { useNavigate } from 'react-router-dom';

const HomeCategory = ({ data }) => {
   const imageList = [image1, image2, image3];
   const navigate = useNavigate();

   return (
      <Swiper
         spaceBetween={20}
         slidesPerView={3}
         style={{ borderRadius: 10 }}
         loop={true}
      >
         {data?.map((d) => (
            <SwiperSlide key={d.id}>
               <Flex
                  h='100px'
                  rounded='xl'
                  w='full'
                  overflow='hidden'
                  cursor='pointer'
                  onClick={() =>
                     navigate({
                        pathname: `/category`,
                        search: qs.stringify({
                           name: d.name,
                           id: d.id,
                        }),
                     })
                  }
               >
                  <Box flex='1' h='full'>
                     <Image
                        w='full'
                        h='full'
                        objectFit='cover'
                        src={
                           imageList[
                              Math.floor(Math.random() * imageList.length)
                           ]
                        }
                     />
                  </Box>
                  <Flex
                     alignItems='start'
                     justifyContent='center'
                     bg='white'
                     flex='3'
                     border='1px solid #E2E8F0'
                     borderTopRightRadius='xl'
                     borderBottomRightRadius='xl'
                     px='3'
                     flexDirection='column'
                  >
                     <Text fontWeight='bold' fontSize='18px' pb='0.5'>
                        {d.name}
                     </Text>
                     <Text noOfLines={2} fontSize='14px' color='gray.500'>
                        {d.description}
                     </Text>
                  </Flex>
               </Flex>
            </SwiperSlide>
         ))}
      </Swiper>
   );
};

export default HomeCategory;
