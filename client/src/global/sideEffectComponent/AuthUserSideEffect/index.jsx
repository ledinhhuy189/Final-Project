import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   authActions,
   authData,
   userProfileLocal,
} from '../../../features/Auth/authSlice';
import { getUserCart } from '../../../features/Cart/cartSlice';
import { auth } from '../../../firebase/initialize';

function AuthUserSideEffect(props) {
   const dispatch = useDispatch();
   const { userData } = useSelector(authData);

   useEffect(() => {
      if (!userData.email || !userData.displayName) return;
      const getUserData = async () => {
         try {
            const userAction = userProfileLocal();
            dispatch(userAction);

            const cartAction = getUserCart();
            dispatch(cartAction);
         } catch (error) {
            console.log(error);
         }
      };
      getUserData();
   }, [dispatch, userData.email, userData.displayName]);

   useEffect(() => {
      const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
         if (!user) {
            const action = authActions.userProfileFirebaseFail();
            return dispatch(action);
         }
         const action = authActions.userProfileFirebaseSuccess({
            displayName: user.displayName,
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
         });

         dispatch(action);
         localStorage.setItem('providerData', true);
      });

      return () => unregisterAuthObserver();
   }, [dispatch]);

   return <></>;
}

export default AuthUserSideEffect;
