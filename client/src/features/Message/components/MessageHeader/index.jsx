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
         >
            <Avatar
               w='50px'
               h='50px'
               src={senderInfo?.photoURL}
               onClick={handleClickSenderInfo}
            />
            <Text as='h2' onClick={handleClickSenderInfo}>
               {senderInfo?.name}
            </Text>
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
