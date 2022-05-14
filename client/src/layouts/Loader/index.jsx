import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { authData } from '../../features/Auth/authSlice';
import HomeSpinner from '../../global/components/HomeSpinner';

const Loader = (props) => {
   const { children } = props;

   let location = useLocation();
   const { loading } = useSelector(authData);

   return (
      <>
         {loading ? (
            <HomeSpinner />
         ) : (
            <>
               {location.pathname === '/' && <Navigate to='/home' />}
               {children}
            </>
         )}
      </>
   );
};

export default Loader;
