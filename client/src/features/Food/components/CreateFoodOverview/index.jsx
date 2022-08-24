import { Box, Grid, GridItem, Heading, Text, VStack } from '@chakra-ui/react';
import { FastField } from 'formik';
import React, { useState } from 'react';
import { useEffect } from 'react';
import categoryApi from '../../../../api/categoryApi';
import CustomInput from '../../../../global/customField/CustomInput';
import CustomSelect from '../../../../global/customField/CustomSelect';

const CreateFoodOverview = (props) => {
   const [categoryList, setCategoryList] = useState([]);

   useEffect(() => {
      const getCategoryListInDb = async () => {
         try {
            const categoryResponse = await categoryApi.getCategory();
            setCategoryList(
               categoryResponse.map((category) => ({
                  label: category.name,
                  value: category.id,
               }))
            );
         } catch (error) {
            console.log(error);
         }
      };
      getCategoryListInDb();
   }, []);

   return (
      <Grid templateColumns='repeat(4, 1fr)' gap={12} w='full'>
         <GridItem colSpan='1'>
            <Heading as='h4' size='md' pb='2'>
               Overview ✨
            </Heading>
            <Text fontSize='md'>
               Adipisicing qui mollit consequat sunt fugiat occaecat sunt fugiat
               anim irure elit.
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
                        name='foodName'
                        placeholder='Enter your Food name'
                        label='Food'
                        component={CustomInput}
                     />
                     <FastField
                        name='price'
                        placeholder='Enter your Price'
                        label='Price'
                        type='number'
                        component={CustomInput}
                     />

                     <FastField
                        name='stock'
                        placeholder='Enter your Stock'
                        label='Stock'
                        type='number'
                        component={CustomInput}
                     />

                     {categoryList.length > 0 && (
                        <FastField
                           name='category'
                           placeholder='Enter your Category'
                           label='Category'
                           component={CustomSelect}
                           optionList={categoryList}
                           disabled={categoryList.length === 0}
                        />
                     )}
                  </VStack>
               </Box>
            </Box>
         </GridItem>
      </Grid>
   );
};

CreateFoodOverview.propTypes = {};

export default CreateFoodOverview;
