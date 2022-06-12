import { Badge, Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { BsBagFill } from 'react-icons/bs';
import priceFormat from '../../../../utils/priceFormat';

function FoodCard({ photoURL, name, description, price }) {
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
               <Flex mb='2' alignItems='center'>
                  <Text
                     as='h1'
                     fontWeight='bold'
                     fontSize='lg'
                     flex='1'
                     noOfLines={2}
                  >
                     {name}
                  </Text>

                  <Badge rounded='xl' px='2' py='1' colorScheme='green'>
                     Vegetable
                  </Badge>
               </Flex>
               <Text as='p' color='gray.500' noOfLines={3}>
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
               <Button>
                  <Icon as={BsBagFill} fontSize='md' color='green.600' />
               </Button>
            </Flex>
         </Flex>
      </Flex>
   );
}

export default FoodCard;
