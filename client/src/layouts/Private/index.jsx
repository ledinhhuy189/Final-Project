// import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { authData } from '../../features/Auth/authSlice';

Private.propTypes = {};

Private.defaultProps = {};

function Private({ children }) {
   let location = useLocation();

   const { userData } = useSelector(authData);

   if (Object.keys(userData).length === 0) {
      return <Navigate to='/auth/login' state={{ from: location }} replace />;
   }

   return children;
}

export default Private;
