import {
   Box,
   Divider,
   Flex,
   HStack,
   Icon,
   Image,
   Spacer,
   StackDivider,
   Text,
   VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { BsBoxSeam } from 'react-icons/bs';
import priceFormat from '../../../../utils/priceFormat';

YourOrder.propTypes = {
   orderItemsData: PropTypes.array,
};

function YourOrder({ orderItemsData }) {
   const calculateTotalPrice = orderItemsData?.reduce((acc, item) => {
      return (acc += item.price * item.quantity);
   }, 0);

   return (
      <Box w='full'>
         <HStack w='full' fontSize='xl' gap='2'>
            <Icon as={BsBoxSeam} />
            <Text as='h1' fontWeight='bold'>
               Your Order
            </Text>
         </HStack>
         <Divider mt='4' mb='6' />
         <VStack gap='2' divider={<StackDivider />}>
            {orderItemsData?.map((item) => (
               <HStack w='full' gap='6' key={item.id}>
                  <Box flex='1'>
                     <Image src={item.photoURL} />
                  </Box>
                  <Box flex='3'>
                     <Text as='h2' fontWeight='bold' fontSize='lg'>
                        {item.name}
                     </Text>
                     <Flex mt='2' gap='6'>
                        <Text as='h3'>
                           Quantity:{' '}
                           <Text as='span' fontWeight='bold'>
                              {item.quantity}
                           </Text>
                        </Text>
                        <Text as='h3'>
                           Price:{' '}
                           <Text as='span' fontWeight='bold'>
                              {priceFormat(item.price)}
                           </Text>
                        </Text>
                     </Flex>
                  </Box>
                  <Text as='h3' fontSize='2xl' fontWeight='bold'>
                     {priceFormat(item.price * item.quantity)}
                  </Text>
               </HStack>
            ))}
            <Flex w='full' alignItems='center'>
               <Text as='h2' fontSize='xl'>
                  Total:
               </Text>
               <Spacer />
               <Text as='h2' fontSize='3xl' fontWeight='bold' color='red.500'>
                  {priceFormat(calculateTotalPrice)}
               </Text>
            </Flex>
         </VStack>
      </Box>
   );
}

export default YourOrder;
