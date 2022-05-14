import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '../../global/pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const Auth = () => {
   return (
      <Routes>
         <Route path='/login' element={<LoginPage />} />
         <Route path='/register' element={<RegisterPage />} />
         <Route path='*' element={<NotFoundPage />} />
      </Routes>
   );
};

export default Auth;
