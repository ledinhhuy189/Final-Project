import { useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import MessageToast from '../../../features/Message/components/MessageToast';
import {
   incomingMessage,
   isSeenMessage,
   messageActions,
} from '../../../features/Message/messageSlice';

function MessageToastReceiveSideEffect(props) {
   const dispatch = useDispatch();
   const toast = useToast();
   let location = useLocation();

   const incomingMessageRedux = useSelector(incomingMessage);
   const isSeenMessageRedux = useSelector(isSeenMessage);

   useEffect(() => {
      if (Object.keys(incomingMessageRedux).length <= 0 || isSeenMessageRedux)
         return;

      const isSeenMessageAction = messageActions.seenMessage();
      dispatch(isSeenMessageAction);

      if (
         location.pathname.split('/').length > 2 &&
         location.pathname.split('/')[1] === 'message'
      )
         return;

      toast({
         title: incomingMessageRedux.content,
         isClosable: true,
         position: 'top-right',
         render: () => (
            <MessageToast
               photoURL={incomingMessageRedux.from.photoURL}
               content={
                  incomingMessageRedux.type === 'text'
                     ? incomingMessageRedux.content
                     : 'Image'
               }
               name={incomingMessageRedux.from.name}
               conversationId={incomingMessageRedux.conversationId}
            />
         ),
      });
   }, [incomingMessageRedux, location, toast, isSeenMessageRedux, dispatch]);

   return <></>;
}

export default MessageToastReceiveSideEffect;
