import {
   Box,
   Button,
   Center,
   Flex,
   Heading,
   Icon,
   Text,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import React from 'react';
import { BsEmojiHeartEyesFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
   const navigate = useNavigate();

   const onClickGoHome = () => navigate('/');

   return (
      <Center h='100vh'>
         <Flex direction='column' alignItems='center'>
            <CheckCircleIcon boxSize={'50px'} color={'green.500'} mb='5' />
            <Heading as='h2' size='xl' mb='3'>
               Your order is complete!
            </Heading>
            <Text color='gray.500' w='60%' textAlign='center' mb='5'>
               Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
               nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
               erat, sed diam voluptua.
            </Text>

            <Button
               colorScheme='teal'
               color='white'
               variant='solid'
               leftIcon={<Icon as={BsEmojiHeartEyesFill} />}
               onClick={onClickGoHome}
            >
               Back to home
            </Button>
         </Flex>
      </Center>
   );
};

export default SuccessPage;
