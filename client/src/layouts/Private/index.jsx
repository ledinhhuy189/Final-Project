// import PropTypes from 'prop-types';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useUserLogged from '../../hooks/useUserLogged';

Private.propTypes = {};

Private.defaultProps = {};

function Private({ children }) {
   let location = useLocation();
   const userLogged = useUserLogged();

   if (!userLogged) {
      return <Navigate to='/auth/login' state={{ from: location }} replace />;
   }

   return children;
}

export default Private;
