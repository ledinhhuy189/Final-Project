import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';

const Category = () => {
   return (
      <Routes>
         <Route path='/' element={<CategoryPage />} />
      </Routes>
   );
};

export default Category;
