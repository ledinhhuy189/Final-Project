import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Auth from '../features/Auth';
import Home from '../features/Home';
import NotFoundPage from '../global/pages/NotFoundPage';
import Main from '../layouts/Main';
import Private from '../layouts/Private';

const Routers = () => {
   let location = useLocation();

   return (
      <>
         {location.pathname === '/' && <Navigate to='/home' />}
         <Routes>
            <Route path='/auth/*' element={<Auth />} />
            <Route
               element={
                  <Private>
                     <Main />
                  </Private>
               }
            >
               <Route path='/home/*' element={<Home />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
         </Routes>
      </>
   );
};

export default Routers;
