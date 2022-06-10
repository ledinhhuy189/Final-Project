import { Box, Icon, Input } from '@chakra-ui/react';
import React, { memo } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsImage } from 'react-icons/bs';

function MessageUpload({ onDrop }) {
   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      maxFiles: 1,
      noDrag: true,
      multiple: false,
   });

   return (
      <Box
         {...getRootProps()}
         cursor='pointer'
         fontSize='2xl'
         lineHeight='1'
         color='gray.500'
      >
         <Input {...getInputProps()} />
         <Icon as={BsImage} />
      </Box>
   );
}

export default memo(MessageUpload);
