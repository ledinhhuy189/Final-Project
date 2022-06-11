import { storage } from './initialize';
import { ref, listAll } from 'firebase/storage';

const listFiles = (directory, callback) => {
   const listRef = ref(storage, directory);

   listAll(listRef)
      .then(callback)
      .catch((error) => {
         console.log(error);
      });
};

export default listFiles;
