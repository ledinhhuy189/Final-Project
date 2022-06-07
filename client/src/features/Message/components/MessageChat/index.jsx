import { Box, Flex, Spacer, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useOutletContext } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import conversationApi from '../../../../api/conversationApi';
import messageApi from '../../../../api/messageApi';
import scrollbar from '../../../../global/styles/scrollbar';
import { authData } from '../../../Auth/authSlice';
import MessageChatBubble from '../MessageChatBubble';
import MessageChatSidebar from '../MessageChatSidebar';
import MessageHeader from '../MessageHeader';
import MessageInput from '../MessageInput';

function MessageChat(props) {
   const [messageList, setMessageList] = useState([]);
   const [senderInfo, setSenderInfo] = useState({});
   const [textInput, setTextInput] = useState('');

   const [updateLatestMessageToConversations] = useOutletContext();
   const divRef = useRef(null);
   const { conversationId } = useParams();
   const {
      userData: { id: userId },
   } = useSelector(authData);
   const { isOpen: isChatSidebarOpen, onToggle: onChatSidebarToggle } =
      useDisclosure();

   useEffect(() => {
      divRef.current.scrollIntoView({ behavior: 'smooth' });
   }, [messageList]);

   useEffect(() => {
      const getMessageInDb = async () => {
         try {
            const messageResponse =
               await conversationApi.getMessageInConversations(conversationId);

            setMessageList(messageResponse.messages);
            setSenderInfo(
               messageResponse.members.find(
                  (member) => member.user.id !== userId
               ).user
            );
         } catch (error) {
            console.log(error);
         }
      };
      getMessageInDb();
   }, [conversationId, userId]);

   const handleSendMessage = async () => {
      try {
         if (textInput === '') return;

         const newMessage = {
            id: uuidv4(),
            userId,
            conversationId: Number(conversationId),
            createdAt: new Date().toISOString(),
            content: textInput,
         };

         const createMessageInDb = await messageApi.createMessage(newMessage);

         if (createMessageInDb.message !== 'create_message_success') return;

         updateLatestMessageToConversations(newMessage);
         setMessageList([...messageList, newMessage]);
         setTextInput('');
      } catch (error) {
         console.log(error);
      }
   };

   const handleChangeTextInput = (e) => {
      setTextInput(e.target.value);
   };

   return (
      <Flex h='full' w='full' gap='6' transition='all 0.5s ease-out'>
         <Flex h='full' w='full' direction='column' flex='2.8'>
            <MessageHeader
               onChatSidebarToggle={onChatSidebarToggle}
               isChatSidebarOpen={isChatSidebarOpen}
               senderInfo={senderInfo}
            />
            <Flex
               direction='column'
               maxH='calc(68vh - 1vh)'
               overflow='auto'
               gap='2'
               css={scrollbar}
            >
               {messageList?.map((message) => {
                  let sentBy = message.userId === userId ? 'right' : 'left';
                  return (
                     <MessageChatBubble
                        sentBy={sentBy}
                        key={message.id}
                        message={message}
                     />
                  );
               })}

               <Box ref={divRef} />
            </Flex>
            <Spacer />
            <MessageInput
               textInput={textInput}
               handleChangeTextInput={handleChangeTextInput}
               handleSendMessage={handleSendMessage}
            />
         </Flex>

         <Flex
            h='full'
            w='full'
            flex='1'
            display={isChatSidebarOpen ? 'flex' : 'none'}
         >
            <MessageChatSidebar senderInfo={senderInfo} />
         </Flex>
      </Flex>
   );
}

export default MessageChat;
