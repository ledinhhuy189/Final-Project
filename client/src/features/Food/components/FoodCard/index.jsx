import { Badge, Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { BsBagFill } from 'react-icons/bs';
import priceFormat from '../../../../utils/priceFormat';
import PropTypes from 'prop-types';
import { cartActions } from '../../../Cart/cartSlice';
import { useDispatch } from 'react-redux';

FoodCard.propTypes = {
   photoURL: PropTypes.string,
   name: PropTypes.string,
   description: PropTypes.string,
   price: PropTypes.number,
   categoryName: PropTypes.string,
   foodDetail: PropTypes.object,
};

FoodCard.defaultProps = {
   photoURL: '',
   name: '',
   description: '',
   price: 0,
   categoryName: '',
};

function FoodCard({
   photoURL,
   name,
   description,
   price,
   categoryName,
   foodDetail,
}) {
   const dispatch = useDispatch();

   const isCategoryColor = (categoryName) => {
      if (categoryName === 'Vegetable') return 'green';
      if (categoryName === 'Fruit') return 'orange';
      return 'gray';
   };

   const handleClickCart = () => {
      const addToCartAction = cartActions.addToCart(foodDetail);
      dispatch(addToCartAction);
   };

   return (
      <Flex
         direction='column'
         w='full'
         h='full'
         bg='white'
         rounded='xl'
         shadow='xl'
         minH='400px'
         overflow='hidden'
      >
         <Image w='full' h='200px' objectFit='cover' src={photoURL} />
         <Flex direction='column' flex='1' px='6' py='7'>
            <Box flex='1' mb='4'>
               <Badge
                  rounded='xl'
                  colorScheme={isCategoryColor(categoryName)}
                  mb='2'
                  px='2'
                  py='0.5'
               >
                  {categoryName}
               </Badge>

               <Text
                  as='h1'
                  fontWeight='bold'
                  fontSize='lg'
                  flex='1'
                  noOfLines={2}
                  mb='2'
               >
                  {name}
               </Text>

               <Text as='p' color='gray.500' noOfLines={2} fontSize='sm'>
                  {description}
               </Text>
            </Box>
            <Text as='h2' fontSize='2xl' fontWeight='bold' mb='4'>
               {priceFormat(price)}
            </Text>
            <Flex gap='3'>
               <Button colorScheme='green' w='full'>
                  Buy now
               </Button>
               <Button onClick={handleClickCart}>
                  <Icon as={BsBagFill} fontSize='md' color='green.600' />
               </Button>
            </Flex>
         </Flex>
      </Flex>
   );
}

export default FoodCard;
