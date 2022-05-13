import { useSelector } from 'react-redux';
import { authData } from '../features/Auth/authSlice';

const useUserLogged = () => {
   const { userData } = useSelector(authData);

   if (Object.keys(userData).length === 0) {
      return false;
   }

   return true;
};

export default useUserLogged;
