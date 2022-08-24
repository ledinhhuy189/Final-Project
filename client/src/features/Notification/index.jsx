import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SuccessPage from './pages/SuccessPage';

function Notification(props) {
   return (
      <Routes>
         <Route path='/success' element={<SuccessPage />} />
      </Routes>
   );
}

export default Notification;
