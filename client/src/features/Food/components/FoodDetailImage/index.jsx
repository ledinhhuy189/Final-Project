import { Grid, GridItem, Image } from '@chakra-ui/react';
import React from 'react';
import {
   GRID_GAP,
   IMAGE_LAYOUT,
} from '../../../../constants/productDetailGrid';
import PropTypes from 'prop-types';

const FoodDetailImage = (props) => {
   const { photoURL } = props;

   return (
      <Grid
         templateColumns='repeat(3, 1fr)'
         templateRows='repeat(2, 1fr)'
         gap={`${GRID_GAP}px`}
         pb={12}
      >
         {photoURL?.map((image, imageIndex) => {
            const imagePosition = IMAGE_LAYOUT[photoURL.length][imageIndex];

            return (
               <GridItem
                  colSpan={imagePosition?.colSpan}
                  rowSpan={imagePosition?.rowSpan}
                  h='full'
                  key={imageIndex}
               >
                  <Image
                     src={image}
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
   );
};

FoodDetailImage.propTypes = {
   photoURL: PropTypes.array,
};

FoodDetailImage.defaultProps = {
   photoURL: [],
};

export default FoodDetailImage;
