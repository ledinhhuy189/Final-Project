import { Box, Grid, GridItem, Heading, Text, VStack } from '@chakra-ui/react';
import { FastField } from 'formik';
import React from 'react';
import CustomInput from '../../../../global/customField/CustomInput';
import CustomTextEditor from '../../../../global/customField/CustomTextEditor';

const CreateFoodDescription = () => {
   return (
      <Grid templateColumns='repeat(4, 1fr)' gap={12} w='full'>
         <GridItem colSpan='1' w='full'>
            <Heading as='h4' size='md' pb='2'>
               Description 👨‍💻
            </Heading>
            <Text fontSize='md'>
               Id minim ullamco tempor est eu Anim exercitation mollit nisi ea.
            </Text>
         </GridItem>
         <GridItem colSpan='3'>
            <Box
               px='6'
               py='7'
               bg='white'
               rounded='xl'
               border='1px'
               borderColor='gray.100'
            >
               <Box>
                  <VStack gap='3' w='full'>
                     <FastField
                        name='shortDescription'
                        placeholder='Enter your short description'
                        label='Short description'
                        component={CustomInput}
                        textHelper='Eiusmod officia adipisicing aute sint velit veniam ea cupidatat ad non.'
                     />
                     <FastField
                        name='description'
                        placeholder='Enter your description'
                        label='Description'
                        component={CustomTextEditor}
                        textHelper='Eiusmod officia adipisicing aute sint velit veniam ea cupidatat ad non.'
                     />
                  </VStack>
               </Box>
            </Box>
         </GridItem>
      </Grid>
   );
};

CreateFoodDescription.propTypes = {};

export default CreateFoodDescription;
