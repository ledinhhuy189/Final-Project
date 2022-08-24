import {
   Box,
   Button,
   Grid,
   GridItem,
   useToast,
   VStack,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import React from 'react';
import { BsFillCartFill } from 'react-icons/bs';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { authData } from '../../../Auth/authSlice';

import CustomBreadcrumb from '../../../../global/components/CustomBreadcrumb';
import CreateFoodDescription from '../../components/CreateFoodDescription';
import CreateFoodImage from '../../components/CreateFoodImage';
import CreateFoodOverview from '../../components/CreateFoodOverview';
import { uploadFile } from '../../../../firebase';
import foodApi from '../../../../api/foodApi';

const CreateFood = () => {
   const toast = useToast();
   const navigate = useNavigate();
   const {
      userData: { email },
   } = useSelector(authData);

   const initialValues = {
      foodName: '',
      price: 0,
      category: '',
      stock: 0,

      shortDescription: '',
      description: '',
      images: [],
   };

   const validationSchema = Yup.object().shape({
      foodName: Yup.string().required(),
      category: Yup.string().required(),
      stock: Yup.number().integer().min(1),

      description: Yup.string().required(),
      shortDescription: Yup.string().required(),
      images: Yup.array().required().min(1).max(5),
   });

   const onSubmit = async (formValue) => {
      try {
         const { foodName, images } = formValue;

         const uploadImagePromises = images.map(async (image) => {
            const uploadImageURL = await uploadFile({
               email,
               file: image,
               baseDirectory: `foods`,
            });

            return uploadImageURL;
         });

         const uploadImageResult = await Promise.all(uploadImagePromises);

         const formatFormData = {
            ...formValue,
            name: foodName,
            photoURL: uploadImageResult,
         };

         delete formatFormData.images;

         const createFoodResponse = await foodApi.createFood(formatFormData);

         if (createFoodResponse) {
            toast({
               title: 'Create food success. Thank you!',
               status: 'success',
               position: 'top-right',
            });

            navigate('/home');
         }
      } catch (error) {
         toast({
            title: 'Something when wrong!',
            status: 'error',
            position: 'top-right',
         });
      }
   };

   return (
      <Box pt='4' pb='8'>
         <Box pb='8'>
            <CustomBreadcrumb />
         </Box>
         <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
         >
            {({ handleSubmit, isSubmitting }) => (
               <VStack gap='6' w='full'>
                  <CreateFoodOverview />
                  <CreateFoodDescription />
                  <CreateFoodImage />
                  <Grid
                     templateColumns='repeat(4, 1fr)'
                     gap={12}
                     w='full'
                     mt='8'
                  >
                     <GridItem colStart='2' colEnd='3'>
                        <Button
                           onClick={handleSubmit}
                           size='lg'
                           colorScheme='blue'
                           h='14'
                           w='full'
                           leftIcon={<BsFillCartFill />}
                           isLoading={isSubmitting}
                           loadingText='Creating...'
                        >
                           Create Product
                        </Button>
                     </GridItem>
                  </Grid>
               </VStack>
            )}
         </Formik>
      </Box>
   );
};

export default CreateFood;
