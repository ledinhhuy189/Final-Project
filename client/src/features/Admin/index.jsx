import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';

const Admin = () => {
   return (
      <Routes>
         <Route path='/' element={<AdminPage />} />
      </Routes>
   );
};

export default Admin;
