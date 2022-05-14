import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useUserLogged from '../../hooks/useUserLogged';
import Main from '../Main';

function Private({ children }) {
   let location = useLocation();
   const userLogged = useUserLogged();

   if (!userLogged) {
      return <Navigate to='/auth/login' state={{ from: location }} replace />;
   }

   return <Main />;
}

export default Private;
