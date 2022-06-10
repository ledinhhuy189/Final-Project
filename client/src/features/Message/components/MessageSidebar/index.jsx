import { HStack, Icon, Spacer, Text, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import MessageConversation from '../MessageConversation';
import MessageLoader from '../MessageLoader';
import MessageSearch from '../MessageSearch';

MessageSidebar.propTypes = {
   conversationList: PropTypes.array,
   loading: PropTypes.bool,
   handleChangeSearch: PropTypes.func,
};

MessageSidebar.defaultProps = {
   conversationList: [],
   loading: false,
   handleChangeSearch: null,
};

function MessageSidebar({ conversationList, loading, handleChangeSearch }) {
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
         <MessageSearch onChangeSearch={handleChangeSearch} />
         <MessageLoader loading={loading}>
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
         </MessageLoader>
      </VStack>
   );
}

export default MessageSidebar;
