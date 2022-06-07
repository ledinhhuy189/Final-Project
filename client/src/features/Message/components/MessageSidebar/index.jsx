import { HStack, Icon, Spacer, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MessageConversation from '../MessageConversation';
import MessageSearch from '../MessageSearch';
import { BiMessageSquareAdd } from 'react-icons/bi';
import PropTypes from 'prop-types';

MessageSidebar.propTypes = {
   conversationList: PropTypes.array,
};

MessageSidebar.defaultProps = {
   conversationList: [],
};

function MessageSidebar({ conversationList }) {
   const navigate = useNavigate();
   const { conversationId } = useParams();

   return (
      <VStack gap='4' alignItems='flex-start'>
         <HStack w='full'>
            <Text
               as='h2'
               fontWeight='bold'
               fontSize='2xl'
               onClick={() => navigate('/message')}
               cursor='pointer'
               lineHeight='1'
            >
               Messages
            </Text>
            <Spacer />
            <Icon
               as={BiMessageSquareAdd}
               cursor='pointer'
               fontSize='xl'
               lineHeight='1'
               color='gray.600'
            />
         </HStack>
         <MessageSearch />
         <VStack w='full' gap='1' alignItems='flex-start'>
            {conversationList?.map((conversation) => (
               <MessageConversation
                  key={conversation.id}
                  id={conversation.id}
                  latestMessage={conversation.messages[0]}
                  sender={conversation.members[0].user}
                  isSelected={Boolean(
                     Number(conversationId) === Number(conversation.id)
                  )}
               />
            ))}
         </VStack>
      </VStack>
   );
}

export default MessageSidebar;
