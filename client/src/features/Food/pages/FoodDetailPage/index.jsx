import {
   Box,
   Button,
   Grid,
   GridItem,
   HStack,
   Icon,
   Image,
   Text,
} from '@chakra-ui/react';
import React from 'react';
import { BsFillCartFill, BsFillCheckCircleFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import {
   GRID_GAP,
   IMAGES,
   IMAGE_LAYOUT,
} from '../../../../constants/productDetailGrid';
import CustomBreadcrumb from '../../../../global/components/CustomBreadcrumb';
import priceFormat from '../../../../utils/priceFormat';

const FoodDetailPage = () => {
   const { foodSlug } = useParams();
   console.log('🚀 ~ foodSlug', foodSlug);

   return (
      <Box pt='4' pb='8'>
         <Box pb='8'>
            <CustomBreadcrumb />
         </Box>
         <Grid
            templateColumns='repeat(3, 1fr)'
            templateRows='repeat(2, 1fr)'
            gap={`${GRID_GAP}px`}
            pb={12}
         >
            {IMAGES?.map((image, imageIndex) => {
               const imagePosition = IMAGE_LAYOUT[IMAGES.length][imageIndex];

               return (
                  <GridItem
                     colSpan={imagePosition?.colSpan}
                     rowSpan={imagePosition?.rowSpan}
                     h='full'
                     key={image.src}
                  >
                     <Image
                        src={image.src}
                        alt={imageIndex}
                        w='full'
                        h={imagePosition?.height}
                        objectFit='cover'
                        rounded='lg'
                     />
                  </GridItem>
               );
            })}
         </Grid>

         <Grid templateColumns='repeat(3, 1fr)' gap={`${GRID_GAP}px`}>
            <GridItem
               colSpan={2}
               borderRightColor='gray.300'
               borderRightWidth={1}
               pr={`${GRID_GAP}px`}
               display='flex'
               flexDirection='column'
               gap={5}
            >
               <Text fontSize='3xl' fontWeight='bold'>
                  Basic Tee 6-Pack
               </Text>
               <Box>
                  The Basic Tee 6-Pack allows you to fully express your vibrant
                  personality with three grayscale options. Feeling adventurous?
                  Put on a heather gray tee. Want to be a trendsetter? Try our
                  exclusive colorway: "Black". Need to add an extra pop of color
                  to your outfit? Our white tee has you covered. Consectetur
                  officia ut sunt anim Lorem aliquip. Consectetur velit sint
                  incididunt do ut.
               </Box>
            </GridItem>

            <GridItem colSpan={1} display='flex' flexDirection='column' gap={5}>
               <Text fontSize='3xl'>{priceFormat(1200)}</Text>
               <Text>
                  Laborum tempor nisi anim nisi qui velit aliqua proident
                  proident duis fugiat qui aliqua Do nisi ut ea irure dolor
                  officia aute id irure amet nulla adipisicing ullamco culpa..
               </Text>
               <HStack w='full'>
                  <Button
                     size='lg'
                     flexGrow='1'
                     colorScheme='green'
                     leftIcon={<Icon as={BsFillCheckCircleFill} />}
                  >
                     Buy now
                  </Button>
                  <Button size='lg' colorScheme='green'>
                     <Icon as={BsFillCartFill} />
                  </Button>
               </HStack>
            </GridItem>
         </Grid>
      </Box>
   );
};

export default FoodDetailPage;
