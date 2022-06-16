import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MakeOrderPage from './pages/MakeOrderPage';

function Order(props) {
   return (
      <Routes>
         <Route path='/make' element={<MakeOrderPage />} />
      </Routes>
   );
}

export default Order;
