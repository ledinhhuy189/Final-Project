import { Box, Flex, Spacer, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import conversationApi from '../../../../api/conversationApi';
import messageApi from '../../../../api/messageApi';
import { uploadFile } from '../../../../firebase';
import scrollbar from '../../../../global/styles/scrollbar';
import socketUserApi from '../../../../socket/userSocketApi';
import { authData } from '../../../Auth/authSlice';
import { incomingMessage } from '../../messageSlice';
import MessageChatBubble from '../MessageChatBubble';
import MessageChatSidebar from '../MessageChatSidebar';
import MessageHeader from '../MessageHeader';
import MessageImageModal from '../MessageImageModal';
import MessageInput from '../MessageInput';
import MessageLoader from '../MessageLoader';

function MessageChat(props) {
   const navigate = useNavigate();
   const toast = useToast();
   const divRef = useRef(null);
   const { conversationId } = useParams();

   const [messageList, setMessageList] = useState([]);
   const [senderInfo, setSenderInfo] = useState({});
   const [textInput, setTextInput] = useState('');
   const [loading, setLoading] = useState(true);
   const [modalImageSrc, setImageModalSrc] = useState('');

   const { isOpen: isChatSidebarOpen, onToggle: onChatSidebarToggle } =
      useDisclosure();

   const {
      isOpen: isImageOpen,
      onClose: onImageClose,
      onOpen: onImageOpen,
   } = useDisclosure();

   const [updateLatestMessageToConversations] = useOutletContext();

   const {
      userData: { id: userId, name, photoURL, email },
   } = useSelector(authData);
   const incomingMessageRedux = useSelector(incomingMessage);

   useEffect(() => {
      divRef.current.scrollIntoView({ behavior: 'auto' });
   }, [messageList]);

   useEffect(() => {
      setLoading(true);
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

   const handleSendMessage = async (type = 'text', imageURL) => {
      try {
         if (type === 'text' && textInput === '') return;

         const newMessage = {
            id: uuidv4(),
            type,
            userId,
            conversationId: Number(conversationId),
            createdAt: new Date().toISOString(),
            content: type === 'text' ? textInput : imageURL,
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

   const onDrop = async (file) => {
      if (
         file[0].type !== 'image/jpg' &&
         file[0].type !== 'image/png' &&
         file[0].type !== 'image/jpeg'
      )
         return toast({
            title: 'Only accept .jpg, .jpeg, and .png',
            status: 'error',
            position: 'top-right',
         });

      const uploadImageURL = await uploadFile({
         email,
         file: file[0],
         baseDirectory: `messages/${conversationId}`,
      });

      handleSendMessage('image', uploadImageURL);
   };

   const handleChangeTextInput = (inputValue) => {
      setTextInput(inputValue);
   };

   const handleOpenImageModal = useCallback((url) => {
      setImageModalSrc(url);
      onImageOpen(true);
      // eslint-disable-next-line
   }, []);

   const handleClickSenderInfo = useCallback(() => {
      navigate(`/profile/${senderInfo.email}`);
      // eslint-disable-next-line
   }, [senderInfo.email]);

   return (
      <>
         <Flex h='full' w='full' gap='6'>
            <Flex
               h='full'
               w='full'
               direction='column'
               flex='2.8'
               overflow='auto'
            >
               <MessageHeader
                  onChatSidebarToggle={onChatSidebarToggle}
                  isChatSidebarOpen={isChatSidebarOpen}
                  senderInfo={senderInfo}
                  handleClickSenderInfo={handleClickSenderInfo}
               />
               <Flex
                  direction='column'
                  maxH='calc(68vh - 1vh)'
                  overflow='auto'
                  gap='2'
                  css={scrollbar}
               >
                  <MessageLoader loading={loading}>
                     {messageList?.map((message) => (
                        <MessageChatBubble
                           sentBy={message.userId === userId ? 'right' : 'left'}
                           key={message.id}
                           message={message}
                           handleOpenImageModal={handleOpenImageModal}
                        />
                     ))}
                  </MessageLoader>

                  <Box ref={divRef} />
               </Flex>
               <Spacer />
               <MessageInput
                  textInput={textInput}
                  handleChangeTextInput={handleChangeTextInput}
                  handleSendMessage={handleSendMessage}
                  onDrop={onDrop}
               />
            </Flex>

            <Flex
               h='full'
               w='full'
               flex='1'
               display={isChatSidebarOpen ? 'flex' : 'none'}
            >
               <MessageChatSidebar
                  senderInfo={senderInfo}
                  handleOpenImageModal={handleOpenImageModal}
                  handleClickSenderInfo={handleClickSenderInfo}
               />
            </Flex>
         </Flex>
         <MessageImageModal
            isOpen={isImageOpen}
            onClose={onImageClose}
            imageSrc={modalImageSrc}
         />
      </>
   );
}

export default MessageChat;
