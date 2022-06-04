import { Box, Button, VStack } from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import React from 'react';
import AuthInput from '../AuthInput';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

LoginForm.propTypes = {
   handleSubmitLogin: PropTypes.func.isRequired,
};

LoginForm.propTypes = {};

function LoginForm(props) {
   const { handleSubmitLogin, formLoading } = props;

   const initialValues = {
      email: '',
      password: '',
   };

   const validationSchema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
   });

   const onSubmit = (formData) => {
      handleSubmitLogin(formData);
   };

   return (
      <Box minW='400px'>
         <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
         >
            {({ handleSubmit }) => (
               <Form>
                  <VStack spacing='15px'>
                     <FastField
                        name='email'
                        placeholder='Enter your email'
                        label='Email'
                        type='email'
                        component={AuthInput}
                     />
                     <FastField
                        name='password'
                        placeholder='Enter your password'
                        label='Password'
                        type='password'
                        component={AuthInput}
                     />
                     <Button
                        isLoading={formLoading}
                        loadingText='Submitting'
                        onClick={handleSubmit}
                        w='full'
                        colorScheme='blue'
                        type='submit'
                     >
                        Login
                     </Button>
                  </VStack>
               </Form>
            )}
         </Formik>
      </Box>
   );
}

export default LoginForm;
