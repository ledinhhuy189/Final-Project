import {
   Avatar,
   Box,
   Flex,
   HStack,
   Icon,
   IconButton,
   StackDivider,
   Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { BsFillChatFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authUserData } from '../../../Auth/authSlice';

const FoodDetailUser = (props) => {
   const {
      authorUserPhotoURL,
      authorUserEmail,
      authorUserName,
      authorUserId,
      onClickSendMessageToShop,
   } = props;

   const navigate = useNavigate();

   const currentUser = useSelector(authUserData);

   const goToUserProfile = () => navigate(`/profile/${authorUserEmail}`);

   return (
      <HStack gap='4' alignItems='center' divider={<StackDivider />}>
         <Box fontWeight='thin'>
            <Text fontSize='sm'>Food</Text>
            <Text fontSize='sm'>From</Text>
         </Box>
         <Flex
            flex='1'
            alignItems='center'
            gap='4'
            cursor='pointer'
            onClick={goToUserProfile}
         >
            <Avatar src={authorUserPhotoURL} />
            <Box>
               <Text fontWeight='bold'>{authorUserName}</Text>
               <Text fontSize='sm'>{authorUserEmail}</Text>
            </Box>
         </Flex>

         {currentUser.uid !== authorUserId && (
            <IconButton
               icon={<Icon as={BsFillChatFill} />}
               aria-label='Message'
               colorScheme='linkedin'
               onClick={onClickSendMessageToShop}
            />
         )}
      </HStack>
   );
};

FoodDetailUser.propTypes = {
   authorUserPhotoURL: PropTypes.string,
   authorUserEmail: PropTypes.string,
   authorUserName: PropTypes.string,
};

FoodDetailUser.defaultProps = {
   authorUserPhotoURL: '',
   authorUserEmail: '',
   authorUserName: '',
};

export default FoodDetailUser;
