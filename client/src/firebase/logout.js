import { signOut } from 'firebase/auth';
import { auth } from './initialize';

const logout = async () => {
   return new Promise((resolve, reject) => {
      signOut(auth)
         .then(() => {
            resolve({
               message: 'logout_success',
            });
         })
         .catch((error) => {
            reject({
               message: 'logout_fail',
            });
         });
   });
};

export default logout;
