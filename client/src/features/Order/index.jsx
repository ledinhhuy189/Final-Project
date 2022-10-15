import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MakeOrderPage from './pages/MakeOrderPage';
import UserManageOrderPage from './pages/UserManageOrderPage';

function Order(props) {
   return (
      <Routes>
         <Route path='/make' element={<MakeOrderPage />} />
         <Route path='/user' element={<UserManageOrderPage />} />
      </Routes>
   );
}

export default Order;
