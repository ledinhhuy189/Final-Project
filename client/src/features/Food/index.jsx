import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateFood from './pages/CreateFood';

function Order() {
   return (
      <Routes>
         <Route path='/create' element={<CreateFood />} />
      </Routes>
   );
}

export default Order;
