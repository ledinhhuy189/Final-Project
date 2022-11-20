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
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import foodApi from '../../../../api/foodApi';
import CustomBreadcrumb from '../../../../global/components/CustomBreadcrumb';
import CreateFoodDescription from '../../components/CreateFoodDescription';
import CreateFoodImage from '../../components/CreateFoodImage';
import CreateFoodOverview from '../../components/CreateFoodOverview';

const CreateFoodPage = () => {
   const toast = useToast();
   const navigate = useNavigate();
   const location = useLocation();

   const editFoodData =
      location.pathname.split('/').some((p) => p === 'edit') && location.state;
   console.log('🚀 ~ editFoodData', editFoodData);

   const editFoodDataImages = Boolean(editFoodData)
      ? editFoodData.photoURL.map((p, index) => ({
           id: index,
           preview: p,
        }))
      : [];

   const initialValues = editFoodData
      ? {
           foodName: editFoodData.name,
           price: editFoodData.price,
           category: editFoodData.category.id,
           stock: editFoodData.stock,

           shortDescription: editFoodData.shortDescription,
           description: editFoodData.description,
           images: editFoodDataImages,
        }
      : {
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
      stock: Yup.number().integer().min(0),

      description: Yup.string().required(),
      shortDescription: Yup.string().required(),
      images: Yup.array().required().min(1).max(4),
   });

   const onSubmit = async (formValue) => {
      try {
         const { foodName, images } = formValue;

         const formatFormData = {
            ...formValue,
            name: foodName,
            photoURL: images.map((i) => i.preview),
         };

         let response;

         if (!editFoodData) {
            response = await foodApi.createFood(formatFormData);
         } else {
            response = await foodApi.updateFood({
               ...formatFormData,
               id: editFoodData.id,
            });
         }

         if (response) {
            toast({
               title: `${
                  Boolean(editFoodData) ? 'Update' : 'Create'
               } food success. Thank you!`,
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
                  <CreateFoodImage editFoodDataImage={editFoodDataImages} />
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
                           {Boolean(editFoodData) ? 'Update' : 'Create'} Product
                        </Button>
                     </GridItem>
                  </Grid>
               </VStack>
            )}
         </Formik>
      </Box>
   );
};

export default CreateFoodPage;
