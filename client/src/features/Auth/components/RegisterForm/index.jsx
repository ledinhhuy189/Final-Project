import { Box, Button, VStack } from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import AuthInput from '../AuthInput';
import PropTypes from 'prop-types';

RegisterForm.propTypes = {
   handleSubmit: PropTypes.func.isRequired,
};

function RegisterForm(props) {
   const { handleSubmit, formLoading } = props;

   const initialValues = {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
   };

   const validationSchema = Yup.object().shape({
      email: Yup.string().email().required(),
      name: Yup.string().required(),
      password: Yup.string().required(),
      confirmPassword: Yup.string()
         .oneOf([Yup.ref('password'), null], 'Passwords must match')
         .required(),
   });

   const onSubmit = (formData) => {
      handleSubmit(formData);
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
                        name='name'
                        placeholder='Enter your name'
                        label='Name'
                        component={AuthInput}
                     />
                     <FastField
                        name='email'
                        placeholder='Enter your email'
                        label='Email'
                        component={AuthInput}
                     />
                     <FastField
                        name='password'
                        placeholder='Enter your password'
                        label='Password'
                        type='password'
                        component={AuthInput}
                     />
                     <FastField
                        name='confirmPassword'
                        placeholder='Confirm your password'
                        label='Confirm Password'
                        type='password'
                        component={AuthInput}
                     />
                     <Button
                        w='full'
                        colorScheme='blue'
                        onClick={handleSubmit}
                        isLoading={formLoading}
                        loadingText='Submitting'
                        type='submit'
                     >
                        Create account!
                     </Button>
                  </VStack>
               </Form>
            )}
         </Formik>
      </Box>
   );
}

export default RegisterForm;
