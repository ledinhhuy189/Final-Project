import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import FoodBadge from '../../../../global/components/FoodBadge';

const FoodDetailDescription = (props) => {
   const { foodName, foodDescription, foodShortDescription, categoryName } =
      props;

   return (
      <>
         <Box>
            <Box mb='2'>
               <FoodBadge categoryName={categoryName} fontSize='sm' />
            </Box>
            <Text fontSize='3xl' fontWeight='bold'>
               {foodName}
            </Text>
         </Box>
         <Text fontSize='lg' decoration='underline'>
            {foodShortDescription}
         </Text>
         <Box>{parse(foodDescription)}</Box>
      </>
   );
};

FoodDetailDescription.propTypes = {
   foodName: PropTypes.string,
   foodDescription: PropTypes.string,
   foodShortDescription: PropTypes.string,
   categoryName: PropTypes.string,
};

FoodDetailDescription.defaultProps = {
   foodName: '',
   foodDescription: '',
   foodShortDescription: '',
   categoryName: '',
};

export default FoodDetailDescription;
