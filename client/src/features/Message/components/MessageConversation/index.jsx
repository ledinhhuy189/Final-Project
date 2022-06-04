import { Avatar, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

MessageConversation.propTypes = {
   isSelected: PropTypes.bool,
};

MessageConversation.defaultProps = {
   isSelected: false,
};

function MessageConversation({ isSelected }) {
   const navigate = useNavigate();

   const isSelectedStyle = isSelected && {
      bg: 'gray.100',
   };

   const onClickConversation = () => {
      navigate('/message/123');
   };

   return (
      <Flex
         {...isSelectedStyle}
         gap='5'
         w='full'
         h='full'
         cursor='pointer'
         py='3'
         px='3'
         rounded='lg'
         onClick={onClickConversation}
      >
         <Avatar
            w='50px'
            h='50px'
            src='https://billboardvn.vn/wp-content/uploads/2021/08/billboard-vn-E78eLHoVEAAQBnR.jpg'
         />

         <Flex flex='1' gap='0.5' direction='column' justifyContent='center'>
            <Text color='mainFont' as='h3' fontWeight='700' fontSize='md'>
               thanhnguyen662
            </Text>
            <Text
               as='p'
               fontSize='sm'
               color='gray.600'
               wordBreak='break-all'
               noOfLines={2}
            >
               Laborum anim irure.
            </Text>
         </Flex>

         <Flex alignItems='start' justifyContent='start'>
            <Text as='h4' fontSize='smaller' h='full'>
               3:14 am
            </Text>
         </Flex>
      </Flex>
   );
}

export default MessageConversation;
