import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '../../global/pages/NotFoundPage';
import HomePage from './pages/HomePage';

const Home = () => {
   return (
      <Routes>
         <Route path='/' element={<HomePage />} />
         <Route path='*' element={<NotFoundPage />} />
      </Routes>
   );
};

export default Home;
