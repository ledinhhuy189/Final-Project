// import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import authApi from '../../api/authApi';
import { Center, Spinner } from '@chakra-ui/react';

Private.propTypes = {};

Private.defaultProps = {};

function Private({ children }) {
   let location = useLocation();

   const [isUserLoggedIn, setIsUserLoggedIn] = useState('loading');

   useEffect(() => {
      const checkIsUserLoggedIn = async () => {
         const response = await authApi.isLogin();
         setIsUserLoggedIn(response ? 'loggedIn' : 'redirect');
      };
      checkIsUserLoggedIn();
   }, []);

   if (isUserLoggedIn === 'loading') {
      return <CustomSpinner />;
   }

   if (isUserLoggedIn === 'redirect') {
      return <Navigate to='/auth/login' state={{ from: location }} replace />;
   }

   return children;
}

const CustomSpinner = () => (
   <Center h='100vh'>
      <Spinner size='xl' emptyColor='gray.200' color='blue.500' />
   </Center>
);

export default Private;
