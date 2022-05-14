import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './initialize';

const loginWithEmail = async (account) => {
   const { email, password } = account;

   return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
         .then((userCredentials) => {
            resolve({
               ...userCredentials.user,
               message: 'login_firebase_successful',
            });
         })
         .catch((error) => {
            reject({
               code: error.code,
               message: error.message,
            });
         });
   });
};

export default loginWithEmail;
