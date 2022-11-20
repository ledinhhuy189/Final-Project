import {
   Box,
   Flex,
   Grid,
   GridItem,
   Heading,
   Icon,
   Image,
   Input,
   Text,
   useToast,
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsFillXCircleFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { authData } from '../../../Auth/authSlice';
import { uploadFile } from '../../../../firebase';
import { useSelector } from 'react-redux';

const ACCEPT_FILE_TYPE = ['image/jpg', 'image/png', 'image/jpeg'];

const CreateFoodImage = ({ editFoodDataImage }) => {
   const toast = useToast();

   const {
      userData: { email },
   } = useSelector(authData);

   // Formik in features/Food/CreateFood component
   const { setFieldValue, errors, touched, setFieldTouched, isSubmitting } =
      useFormikContext();

   const [previewImageList, setPreviewImageList] = useState(
      editFoodDataImage || []
   );

   const onDrop = useCallback(async (file) => {
      if (!ACCEPT_FILE_TYPE.includes(file[0].type))
         return toast({
            title: 'Only accept .jpg, .jpeg, and .png',
            status: 'error',
            position: 'top-right',
         });

      const uploadImageURL = await uploadFile({
         email,
         file: file[0],
         baseDirectory: `foods`,
      });

      const fileWithPreview = {
         id: uuidv4(),
         preview: uploadImageURL,
      };

      setPreviewImageList((prev) => [...prev, fileWithPreview]);
      //eslint-disable-next-line
   }, []);

   useEffect(() => {
      setFieldValue('images', previewImageList);
   }, [previewImageList, setFieldValue]);

   const onClickDeleteImage = (imageId) => {
      setPreviewImageList((prev) => {
         const foundDeleteImageIndex = prev.findIndex((i) => i.id === imageId);
         if (foundDeleteImageIndex === -1) return prev;

         return prev.splice(foundDeleteImageIndex, 1);
      });
   };

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      multiple: false,
      disabled: isSubmitting,
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
               border='2px'
               borderColor='gray.100'
               borderStyle='dashed'
            >
               <Box
                  {...getRootProps()}
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  minH='36'
               >
                  <Input
                     {...getInputProps()}
                     multiple={false}
                     onBlur={() => setFieldTouched('images')}
                  />
                  {isDragActive ? (
                     <p>Drop the files here ...</p>
                  ) : (
                     <p>
                        Drag 'n' drop some images here, or click to select
                        images
                     </p>
                  )}
               </Box>
               {touched?.images && errors?.images && (
                  <Text fontSize='14px' color='red.500'>
                     {errors?.images}
                  </Text>
               )}

               <Flex gap='6'>
                  {previewImageList?.map((image) => (
                     <Box
                        key={image.id}
                        position='relative'
                        rounded='xl'
                        cursor='pointer'
                        maxW='44'
                     >
                        <Icon
                           as={BsFillXCircleFill}
                           position='absolute'
                           fontSize='20'
                           top='3'
                           right='3'
                           color='white'
                           display='block'
                           zIndex='10'
                           onClick={() => onClickDeleteImage(image.id)}
                        />
                        <Image
                           src={image.preview}
                           objectFit='cover'
                           rounded='xl'
                        />
                     </Box>
                  ))}
               </Flex>
            </Box>
         </GridItem>
      </Grid>
   );
};

CreateFoodImage.propTypes = {};

export default CreateFoodImage;
