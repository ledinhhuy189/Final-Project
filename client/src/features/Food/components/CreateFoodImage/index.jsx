import { Box, Grid, GridItem, Heading, Input, Text } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const CreateFoodImage = () => {
   const onDrop = useCallback((acceptedFiles) => {
      // Do something with the files
   }, []);
   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
   });

   return (
      <Grid templateColumns='repeat(4, 1fr)' gap={12} w='full'>
         <GridItem colSpan='1' w='full'>
            <Heading as='h4' size='md' pb='2'>
               Images 📷
            </Heading>
            <Text fontSize='md'>
               Laboris laboris labore irure aute ad Duis quis tempor voluptate
               ullamco aute sint non anim aliqua adipisicing ullamco ut dolor
               amet..
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
               <Box
                  {...getRootProps()}
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  minH='36'
               >
                  <Input {...getInputProps()} />
                  {isDragActive ? (
                     <p>Drop the files here ...</p>
                  ) : (
                     <p>
                        Drag 'n' drop some images here, or click to select
                        images
                     </p>
                  )}
               </Box>
            </Box>
         </GridItem>
      </Grid>
   );
};

CreateFoodImage.propTypes = {};

export default CreateFoodImage;
