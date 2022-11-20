import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateFoodPage from './pages/CreateFoodPage';
import FoodDetailPage from './pages/FoodDetailPage';

function Order() {
   return (
      <Routes>
         <Route path='/:foodSlug/detail' element={<FoodDetailPage />} />
         <Route path='/:foodSlug/edit' element={<CreateFoodPage />} />
         <Route path='/create' element={<CreateFoodPage />} />
      </Routes>
   );
}

export default Order;
