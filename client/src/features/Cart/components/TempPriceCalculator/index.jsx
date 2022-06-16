import React from 'react';
import PropTypes from 'prop-types';
import {
   Box,
   Button,
   Container,
   Flex,
   HStack,
   Icon,
   Spacer,
   Text,
} from '@chakra-ui/react';
import { BsCheckLg } from 'react-icons/bs';
import priceFormat from '../../../../utils/priceFormat';
import { useNavigate } from 'react-router-dom';

TempPriceCalculator.propTypes = {
   selectedItems: PropTypes.array,
};

function TempPriceCalculator({ selectedItems }) {
   const navigate = useNavigate();

   const calculatePrice = selectedItems.reduce((acc, i) => {
      return (acc += i.quantity * i.price);
   }, 0);

   const onClickOrderNow = () => {
      navigate('/order/make', {
         state: selectedItems,
      });
   };

   return (
      <Box position='fixed' bottom='0px' left='0' w='full'>
         <Container maxW='1400px' h='full'>
            <Flex
               w='full'
               alignItems='center'
               bg='green.400'
               px='6'
               py='4'
               color='white'
               shadow='2xl'
               borderTopRadius='10px'
               gap='8'
            >
               <Text fontSize='xl' fontWeight='bold'>
                  Selected: {selectedItems.length}{' '}
                  {selectedItems.length > 1 ? 'foods' : 'food'}
               </Text>
               <Spacer />
               <HStack gap='2'>
                  <Text fontSize='xl'>Total Price:</Text>
                  <Text fontWeight='bold' fontSize='3xl'>
                     {priceFormat(calculatePrice)}
                  </Text>
               </HStack>
               <Button
                  colorScheme='green'
                  leftIcon={<Icon as={BsCheckLg} />}
                  onClick={onClickOrderNow}
                  disabled={Boolean(selectedItems.length === 0)}
               >
                  Order Now
               </Button>
            </Flex>
         </Container>
      </Box>
   );
}

export default TempPriceCalculator;
