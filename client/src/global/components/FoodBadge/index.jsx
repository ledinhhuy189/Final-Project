import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@chakra-ui/react';

const FoodBadge = (props) => {
   const { categoryName, ...rest } = props;

   const isCategoryColor = () => {
      if (categoryName === 'Vegetable') return 'green';
      if (categoryName === 'Fruit') return 'orange';
      return 'gray';
   };

   return (
      <Badge
         w='fit-content'
         rounded='xl'
         colorScheme={isCategoryColor()}
         px='2'
         py='0.5'
         {...rest}
      >
         {categoryName}
      </Badge>
   );
};

FoodBadge.propTypes = {
   categoryName: PropTypes.node,
};

FoodBadge.defaultProps = {
   categoryName: '',
};

export default FoodBadge;
