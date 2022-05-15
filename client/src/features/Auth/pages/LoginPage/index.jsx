import { Box, Flex, useBoolean, useToast } from '@chakra-ui/react';
import React from 'react';
import { loginWithEmail } from '../../../../firebase';
import AuthTitle from '../../components/AuthTitle';
import LoginForm from '../../components/LoginForm';

const LoginPage = () => {
   const toast = useToast();
   const [formLoading, setFormLoading] = useBoolean(false);

   const handleSubmitLogin = async (formData) => {
      try {
         setFormLoading.on();
         const loginResponse = await loginWithEmail(formData);
         if (loginResponse.message === 'login_firebase_successful') {
            setFormLoading.off();
            window.location = '/home';
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
            <AuthTitle
               title='Welcome'
               subTitle='Welcome back! Please enter your details'
            />

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
