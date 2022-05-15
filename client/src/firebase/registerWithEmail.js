import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './initialize';

const registerWithEmail = (account) => {
   const { email, password } = account;

   return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            resolve({
               ...userCredential.user,
               message: 'register_firebase_successful',
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

export default registerWithEmail;
