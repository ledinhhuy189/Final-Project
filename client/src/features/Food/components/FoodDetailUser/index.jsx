import React from 'react';
import PropTypes from 'prop-types';
import {
   Avatar,
   Box,
   Flex,
   HStack,
   StackDivider,
   Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const FoodDetailUser = (props) => {
   const { authorUserPhotoURL, authorUserEmail, authorUserName } = props;

   const navigate = useNavigate();

   const goToUserProfile = () => navigate(`/profile/${authorUserEmail}`);

   return (
      <HStack gap='4' alignItems='center' divider={<StackDivider />}>
         <Box fontWeight='thin'>
            <Text fontSize='sm'>Food</Text>
            <Text fontSize='sm'>From</Text>
         </Box>
         <Flex
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
