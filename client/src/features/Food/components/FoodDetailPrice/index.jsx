import React from 'react';
// import PropTypes from 'prop-types';
import {
   Box,
   Button,
   Flex,
   HStack,
   Icon,
   IconButton,
   Text,
   Tooltip,
} from '@chakra-ui/react';
import {
   BsFillCartFill,
   BsFillCheckCircleFill,
   BsStarFill,
} from 'react-icons/bs';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import priceFormat from '../../../../utils/priceFormat';

const FoodDetailPrice = (props) => {
   const { foodPrice, onClickCart, isAddButtonLoading } = props;

   const navigate = useNavigate();

   const goToCart = () => navigate('/cart');

   return (
      <Flex display='flex' flexDirection='column' gap={7}>
         <Box>
            <Text fontSize='3xl' pb={3}>
               {priceFormat(foodPrice)}
            </Text>
            <Tooltip
               label='Will implement in future'
               placement='top'
               hasArrow
               w='fit-content'
            >
               <Flex
                  gap='2'
                  fontSize='xl'
                  color='yellow.300'
                  w='fit-content'
                  alignItems='center'
               >
                  <Icon as={BsStarFill} cursor='pointer' />
                  <Icon as={BsStarFill} cursor='pointer' />
                  <Icon as={BsStarFill} cursor='pointer' />
                  <Icon as={BsStarFill} cursor='pointer' />
                  <Icon as={BsStarFill} cursor='pointer' color='gray.400' />

                  <Text pl='2' color='green.600' fontSize='md'>
                     117 reviews
                  </Text>
               </Flex>
            </Tooltip>
         </Box>
         <Text>
            Laborum tempor nisi anim nisi qui velit aliqua proident proident
            duis fugiat qui aliqua Do nisi ut ea irure dolor officia aute id
            irure amet nulla adipisicing ullamco culpa.
         </Text>
         <HStack w='full'>
            <Button
               size='lg'
               flexGrow='1'
               colorScheme='green'
               onClick={onClickCart}
               leftIcon={<Icon as={BsFillCheckCircleFill} />}
               isLoading={isAddButtonLoading}
               loadingText='Adding...'
            >
               Add to cart
            </Button>

            <IconButton
               colorScheme='green'
               size='lg'
               onClick={goToCart}
               icon={<Icon as={BsFillCartFill} />}
            />
         </HStack>
      </Flex>
   );
};

FoodDetailPrice.propTypes = {
   foodPrice: PropTypes.number,
   onClickCart: PropTypes.func,
   isAddButtonLoading: PropTypes.bool,
};

FoodDetailPrice.defaultProps = {
   foodPrice: 0,
   onClickCart: null,
   isAddButtonLoading: false,
};

export default FoodDetailPrice;
