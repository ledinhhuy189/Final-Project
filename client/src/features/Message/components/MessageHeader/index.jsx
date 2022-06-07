import { Avatar, Divider, HStack, Icon, Spacer, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';

MessageHeader.propTypes = {
   isChatSidebarOpen: PropTypes.bool,
   onChatSidebarToggle: PropTypes.func,
};

MessageHeader.defaultProps = {
   isChatSidebarOpen: false,
   onChatSidebarToggle: null,
};

function MessageHeader({ isChatSidebarOpen, onChatSidebarToggle }) {
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
            <Icon
               as={isChatSidebarOpen ? RiMenuUnfoldFill : RiMenuFoldFill}
               fontSize='lg'
               onClick={onChatSidebarToggle}
               cursor='pointer'
            />
         </HStack>
         <Divider my='4' />
      </>
   );
}

export default MessageHeader;
