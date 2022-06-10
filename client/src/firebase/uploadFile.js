import { storage } from './initialize';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const metadata = {
   contentType: 'image/jpeg',
};

const uploadFile = async (options) => {
   return new Promise((resolve, reject) => {
      const { email, file, directory, baseDirectory } = options;

      const uniqueName = uuidv4();

      const fileDirectory = baseDirectory
         ? `${baseDirectory}/${uniqueName}`
         : `${directory}/${email}/${uniqueName}`;

      const storageRef = ref(storage, fileDirectory);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
         'state_changed',
         (snapshot) => {
            const progress =
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
         },
         (error) => {
            console.log(error);
            reject();
         },
         async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
         }
      );
   });
};

export default uploadFile;
