import { Avatar, Divider, HStack, Icon, Spacer, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';

MessageHeader.propTypes = {
   isChatSidebarOpen: PropTypes.bool,
   onChatSidebarToggle: PropTypes.func,
   handleClickSenderInfo: PropTypes.func,
   senderInfo: PropTypes.object,
};

MessageHeader.defaultProps = {
   isChatSidebarOpen: false,
   onChatSidebarToggle: null,
   handleClickSenderInfo: null,
};

function MessageHeader({
   isChatSidebarOpen,
   onChatSidebarToggle,
   senderInfo,
   handleClickSenderInfo,
}) {
   return (
      <>
         <HStack
            cursor='pointer'
            gap='4'
            fontWeight='bold'
            fontSize='lg'
            color='mainFont'
            onClick={handleClickSenderInfo}
         >
            <Avatar w='50px' h='50px' src={senderInfo?.photoURL} />
            <Text as='h2'>{senderInfo?.name}</Text>
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
