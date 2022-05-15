import { Box, Flex, useBoolean, useToast } from '@chakra-ui/react';
import React from 'react';
import authApi from '../../../../api/authApi';
import { registerWithEmail, updateUserProfile } from '../../../../firebase';
import AuthTitle from '../../components/AuthTitle';
import RegisterForm from '../../components/RegisterForm';

const RegisterPage = () => {
   const toast = useToast();
   const [formLoading, setFormLoading] = useBoolean(false);

   const handleSubmit = async (formData) => {
      setFormLoading.on();

      try {
         const registerResponse = await registerWithEmail({
            email: formData.email,
            password: formData.password,
         });

         if (registerResponse.message === 'register_firebase_successful') {
            const updateProfileResponse = await updateUserProfile({
               name: formData.name,
            });

            if (updateProfileResponse.message === 'update_profile_success') {
               const upsertAccountResponse = await authApi.upsertAccount(
                  formData
               );

               if (upsertAccountResponse) {
                  setFormLoading.off();
                  return (window.location = '/home');
               }
            }
         }
      } catch (error) {
         setFormLoading.off();

         toast({
            status: 'error',
            title: 'Error',
            description: 'Email already exist',
            duration: 5000,
            position: 'top',
         });
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
               title='Create new account'
               subTitle={`Already a member? Login In`}
            />

            <Box>
               <RegisterForm
                  handleSubmit={handleSubmit}
                  formLoading={formLoading}
               />
            </Box>
         </Flex>
      </Flex>
   );
};

export default RegisterPage;
