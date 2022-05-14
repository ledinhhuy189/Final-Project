import {
   Box,
   Flex,
   Text,
   useBoolean,
   useToast,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import { loginWithEmail } from '../../../../firebase';
import LoginForm from '../../components/LoginForm';

const LoginPage = () => {
   const [formLoading, setFormLoading] = useBoolean(false);
   const toast = useToast();

   const handleSubmitLogin = async (formData) => {
      try {
         setFormLoading.on();
         const loginResponse = await loginWithEmail(formData);
         if (loginResponse.message === 'login_firebase_successful') {
            setFormLoading.off();
         }
      } catch (error) {
         toast({
            title: 'Error.',
            description: 'Incorrect username or password.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top',
         });
         setFormLoading.off();
      }
   };

   return (
      <Flex gap='20px'>
         <Box
            flex={2}
            bgImage="url('https://cdn.dribbble.com/users/2386616/screenshots/9799837/illustration_d_4x.png')"
            bgPosition='center'
            bgRepeat='no-repeat'
            h='100vh'
         />
         <Flex
            flex={1}
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
         >
            <VStack
               minW='400px'
               justifyContent='start'
               alignItems='start'
               mb='30px'
            >
               <Text fontSize='35px' fontWeight='bold'>
                  Login
               </Text>
               <Text color='gray.600'>
                  Welcome back! Please enter your details
               </Text>
            </VStack>
            <Box>
               <LoginForm
                  handleSubmitLogin={handleSubmitLogin}
                  formLoading={formLoading}
               />
            </Box>
         </Flex>
      </Flex>
   );
};

export default LoginPage;
