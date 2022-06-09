import { Box, Flex, Spacer, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useOutletContext } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import conversationApi from '../../../../api/conversationApi';
import messageApi from '../../../../api/messageApi';
import scrollbar from '../../../../global/styles/scrollbar';
import socketUserApi from '../../../../socket/userSocketApi';
import { authData } from '../../../Auth/authSlice';
import MessageChatBubble from '../MessageChatBubble';
import MessageChatSidebar from '../MessageChatSidebar';
import MessageHeader from '../MessageHeader';
import MessageInput from '../MessageInput';
import { incomingMessage } from '../../messageSlice';
import MessageLoader from '../MessageLoader';

function MessageChat(props) {
   const divRef = useRef(null);
   const { conversationId } = useParams();

   const [messageList, setMessageList] = useState([]);
   const [senderInfo, setSenderInfo] = useState({});
   const [textInput, setTextInput] = useState('');
   const [loading, setLoading] = useState(true);

   const { isOpen: isChatSidebarOpen, onToggle: onChatSidebarToggle } =
      useDisclosure();

   const [updateLatestMessageToConversations] = useOutletContext();

   const {
      userData: { id: userId, name, photoURL },
   } = useSelector(authData);
   const incomingMessageRedux = useSelector(incomingMessage);

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
            setLoading(false);
         } catch (error) {
            console.log(error);
            setLoading(false);
         }
      };
      getMessageInDb();
   }, [conversationId, userId]);

   useEffect(() => {
      const isObjectEmpty = Object.keys(incomingMessageRedux).length <= 0;
      const isCorrectConversation = Boolean(
         incomingMessageRedux.conversationId !== Number(conversationId)
      );

      if (isObjectEmpty || isCorrectConversation) return;

      // Restructure for correct Object form with object at messageList
      const restructureObject = {
         ...incomingMessageRedux,
         user: incomingMessageRedux.from,
      };

      setMessageList((prev) => [...prev, restructureObject]);
      // eslint-disable-next-line
   }, [incomingMessageRedux]);

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

         socketUserApi.emitMessage({
            ...newMessage,
            from: {
               name,
               photoURL,
               userId,
            },
            to: {
               name: senderInfo.name,
               photoURL: senderInfo.photoURL,
               userId: senderInfo.id,
            },
         });

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
      <Flex h='full' w='full' gap='6'>
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
               <MessageLoader loading={loading}>
                  {messageList?.map((message) => {
                     return (
                        <MessageChatBubble
                           sentBy={message.userId === userId ? 'right' : 'left'}
                           key={message.id}
                           message={message}
                        />
                     );
                  })}
               </MessageLoader>

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
