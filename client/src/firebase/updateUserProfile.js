import { updateProfile } from 'firebase/auth';
import { auth } from './initialize';

const updateUserProfile = (account) => {
   const { name, photoURL } = account;

   return new Promise((resolve, reject) => {
      updateProfile(auth.currentUser, {
         displayName: name,
         photoURL: photoURL || null,
      })
         .then(() => {
            resolve({
               message: 'update_profile_success',
            });
         })
         .catch(() => {
            reject({
               message: 'update_profile_fail',
            });
         });
   });
};

export default updateUserProfile;
