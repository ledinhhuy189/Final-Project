import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MakeOrderPage from './pages/MakeOrderPage';
import ShopManageOrderPage from './pages/ShopManageOrderPage';
import UserManageOrderPage from './pages/UserManageOrderPage';

function Order(props) {
   return (
      <Routes>
         <Route path='/make' element={<MakeOrderPage />} />
         <Route path='/user' element={<UserManageOrderPage />} />
         <Route path='/shop' element={<ShopManageOrderPage />} />
      </Routes>
   );
}

export default Order;
