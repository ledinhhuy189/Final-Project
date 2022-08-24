import {
   Badge,
   Box,
   Button,
   Flex,
   Icon,
   Image,
   Link,
   Text,
} from '@chakra-ui/react';
import React from 'react';
import { BsBagFill } from 'react-icons/bs';
import priceFormat from '../../../../utils/priceFormat';
import PropTypes from 'prop-types';
import { cartActions } from '../../../Cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import cartApi from '../../../../api/cartApi';
import { authCartId } from '../../../Auth/authSlice';
import { useNavigate } from 'react-router-dom';

FoodCard.propTypes = {
   photoURL: PropTypes.string,
   name: PropTypes.string,
   shortDescription: PropTypes.string,
   price: PropTypes.number,
   categoryName: PropTypes.string,
   foodSlug: PropTypes.string,
   foodId: PropTypes.number,
};

FoodCard.defaultProps = {
   photoURL: '',
   name: '',
   shortDescription: '',
   price: 0,
   categoryName: '',
   foodSlug: '',
};

function FoodCard({
   photoURL,
   name,
   shortDescription,
   price,
   categoryName,
   foodId,
   foodSlug,
}) {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const cartId = useSelector(authCartId);

   const isCategoryColor = (categoryName) => {
      if (categoryName === 'Vegetable') return 'green';
      if (categoryName === 'Fruit') return 'orange';
      return 'gray';
   };

   const onNavigateToFoodDetail = () => {
      navigate(`/food/${foodSlug}/detail`);
   };

   const handleClickCart = async () => {
      try {
         const upsertCartItemResponse = await cartApi.upsertCart({
            cartId,
            data: {
               foodId,
            },
         });
         const addToCartAction = cartActions.addToCart(upsertCartItemResponse);
         dispatch(addToCartAction);
      } catch (error) {
         console.log(error);
      }
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

               <Link
                  onClick={onNavigateToFoodDetail}
                  as='h1'
                  fontWeight='bold'
                  fontSize='lg'
                  flex='1'
                  noOfLines={2}
                  mb='2'
               >
                  {name}
               </Link>

               <Text as='p' color='gray.500' noOfLines={2} fontSize='sm'>
                  {shortDescription}
               </Text>
            </Box>
            <Text as='h2' fontSize='2xl' fontWeight='bold' mb='4'>
               {priceFormat(price)}
            </Text>
            <Flex gap='3'>
               <Button
                  colorScheme='green'
                  w='full'
                  onClick={onNavigateToFoodDetail}
               >
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
