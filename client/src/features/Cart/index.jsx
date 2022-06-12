import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';

function Cart(props) {
   return (
      <Routes>
         <Route path='/' element={<CartPage />} />
      </Routes>
   );
}

export default Cart;
