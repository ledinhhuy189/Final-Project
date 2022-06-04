import { Avatar, Divider, HStack, Icon, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';

function MessageHeader(props) {
   return (
      <>
         <HStack gap='4' fontWeight='bold' fontSize='lg' color='mainFont'>
            <Avatar
               w='50px'
               h='50px'
               src='https://billboardvn.vn/wp-content/uploads/2021/08/billboard-vn-E78eLHoVEAAQBnR.jpg'
            />
            <Text as='h2'>thanhnguyen662</Text>
            <Spacer />
            <Icon as={BsThreeDots} fontSize='lg' />
         </HStack>
         <Divider my='4' />
      </>
   );
}

export default MessageHeader;
