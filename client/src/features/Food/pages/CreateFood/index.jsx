import { Box, Button, VStack } from '@chakra-ui/react';
import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import CustomBreadcrumb from '../../../../global/components/CustomBreadcrumb';
import CreateFoodDescription from '../../components/CreateFoodDescription';
import CreateFoodImage from '../../components/CreateFoodImage';
import CreateFoodOverview from '../../components/CreateFoodOverview';

const CreateFood = () => {
   const initialValues = {
      foodName: '',
      address: '',
      price: 0,
      category: '',
      stock: 0,

      shortDescription: '',
      description: '',
   };

   const validationSchema = Yup.object().shape({
      // foodName: Yup.string().email().required(),
      // address: Yup.string().required(),
      // category: Yup.string().required(),
      description: Yup.string().required(),
   });

   const onSubmit = (formValue) => {
      console.log('🚀 ~ formValue', formValue);
   };

   return (
      <Box py='4'>
         <Box pb='8'>
            <CustomBreadcrumb />
         </Box>
         <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
         >
            {({ handleSubmit }) => (
               <VStack gap='6' w='full'>
                  <CreateFoodOverview />
                  <CreateFoodDescription />
                  <CreateFoodImage />
                  <Button onClick={handleSubmit} mt='8'>
                     Submit
                  </Button>
               </VStack>
            )}
         </Formik>
      </Box>
   );
};

export default CreateFood;
