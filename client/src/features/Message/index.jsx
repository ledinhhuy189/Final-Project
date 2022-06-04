import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MessageChat from './components/MessageChat';
import MessagePage from './pages/MessagePage';

function Message(props) {
   return (
      <Routes>
         <Route path='/' element={<MessagePage />}>
            <Route path=':conversationId' element={<MessageChat />} />
         </Route>
      </Routes>
   );
}

export default Message;
