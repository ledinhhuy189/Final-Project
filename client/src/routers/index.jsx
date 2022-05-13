import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Admin from '../features/Admin';
import Auth from '../features/Auth';
import { authData } from '../features/Auth/authSlice';
import Home from '../features/Home';
import Profile from '../features/Profile';
import HomeSpinner from '../global/components/HomeSpinner';
import NotFoundPage from '../global/pages/NotFoundPage';
import Main from '../layouts/Main';
import Private from '../layouts/Private';

const Routers = () => {
   let location = useLocation();
   const { loading } = useSelector(authData);
   return (
      <>
         {loading ? (
            <HomeSpinner />
         ) : (
            <>
               {location.pathname === '/' && <Navigate to='/home' />}
               <Routes>
                  <Route path='/auth/*' element={<Auth />} />
                  <Route element={<Main />}>
                     <Route path='/home/*' element={<Home />} />
                  </Route>
                  <Route
                     element={
                        <Private>
                           <Main />
                        </Private>
                     }
                  >
                     <Route path='/profile/*' element={<Profile />} />
                     <Route path='/admin/*' element={<Admin />} />
                  </Route>
                  <Route path='*' element={<NotFoundPage />} />
               </Routes>
            </>
         )}
      </>
   );
};

export default Routers;
