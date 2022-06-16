import {
   Box,
   Button,
   Divider,
   HStack,
   Icon,
   Text,
   VStack,
} from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import { BsCheckLg, BsPersonCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import InformationInput from './InformationInput';

function InformationForm(props) {
   const navigate = useNavigate();

   const initialValues = {
      firstName: '',
      lastName: '',
      address: '',
      district: '',
      ward: '',
      city: '',
      phoneNumber: '',
   };

   const validationSchema = Yup.object().shape({
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
      address: Yup.string().required(),
      district: Yup.string().required(),
      ward: Yup.string().required(),
      city: Yup.string().required(),
      phoneNumber: Yup.string().required(),
   });

   const onSubmit = (formData) => {
      console.log('🚀 ~ formData', formData);
   };

   const onCancel = (formData) => {
      navigate(-1);
   };

   return (
      <Box w='full'>
         <HStack w='full' fontSize='xl' gap='2'>
            <Icon as={BsPersonCircle} />
            <Text as='h1' fontWeight='bold'>
               Confirm Information
            </Text>
         </HStack>
         <Divider mt='4' mb='6' />
         <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
         >
            {({ handleSubmit }) => (
               <Form>
                  <VStack spacing='15px'>
                     <HStack w='full' gap='4'>
                        <FastField
                           name='firstName'
                           placeholder='Enter your first name'
                           label='First Name'
                           component={InformationInput}
                        />
                        <FastField
                           name='lastName'
                           placeholder='Enter your last name'
                           label='Last Name'
                           component={InformationInput}
                        />
                     </HStack>
                     <FastField
                        name='address'
                        placeholder='Enter your address'
                        label='Address'
                        component={InformationInput}
                     />
                     <FastField
                        name='city'
                        placeholder='Enter your city'
                        label='City'
                        component={InformationInput}
                     />
                     <HStack w='full' gap='4'>
                        <FastField
                           name='district'
                           placeholder='Enter your district'
                           label='District'
                           component={InformationInput}
                        />
                        <FastField
                           name='ward'
                           placeholder='Enter your ward'
                           label='Ward'
                           component={InformationInput}
                        />
                     </HStack>
                     <HStack w='full' pt='4'>
                        <Button
                           colorScheme='green'
                           leftIcon={<Icon as={BsCheckLg} />}
                           onClick={handleSubmit}
                        >
                           Make order and delivery here!
                        </Button>
                        <Button onClick={onCancel}>Cancel</Button>
                     </HStack>
                  </VStack>
               </Form>
            )}
         </Formik>
      </Box>
   );
}

export default InformationForm;
