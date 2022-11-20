import {
   Avatar,
   Box,
   Button,
   Flex,
   Heading,
   Icon,
   Spacer,
   Text,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import { BsChatFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { authData } from '../../../Auth/authSlice';

const ProfileHeader = ({ data, onClickMessage }) => {
   const {
      userData: { email },
   } = useSelector(authData);

   return (
      <VStack>
         <Box textAlign='center'>
            <Avatar src={data.photoURL} size='lg' />
            <Flex
               pt='4'
               direction='column'
               justifyContent='center'
               alignItems='center'
            >
               <Heading size='md' pb={1}>
                  {data.name}
               </Heading>
               <Text>{data.email}</Text>
            </Flex>
         </Box>
         <Spacer />
         {email !== data.email && (
            <Box>
               <Button
                  size='lg'
                  colorScheme='blue'
                  leftIcon={<Icon as={BsChatFill} />}
                  onClick={onClickMessage}
               >
                  Message
               </Button>
            </Box>
         )}
      </VStack>
   );
};

export default ProfileHeader;
