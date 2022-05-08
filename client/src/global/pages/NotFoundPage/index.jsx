import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
   const navigate = useNavigate();

   const onClickGoToHome = () => {
      navigate('/home');
   };

   return (
      <VStack
         h='100vh'
         flexDirection='column'
         alignItems='center'
         justifyContent='center'
         spacing='12px'
      >
         <Heading
            as='h2'
            fontSize='100px'
            bgGradient='linear(to-r, teal.400, teal.600)'
            backgroundClip='text'
         >
            404
         </Heading>
         <Text fontSize='18px'>Page Not Found</Text>
         <Text color={'gray.500'}>
            The page you're looking for does not seem to exist
         </Text>
         <Button
            colorScheme='teal'
            bgGradient='linear(to-r, teal.400, teal.500, teal.600)'
            color='white'
            variant='solid'
            onClick={onClickGoToHome}
         >
            Go to Home
         </Button>
      </VStack>
   );
};

export default NotFoundPage;
