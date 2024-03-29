import axios from 'axios';
import queryString from 'query-string';
import { auth } from '../firebase/initialize';

const getFirebaseToken = async () => {
   const currentUser = auth.currentUser;

   if (!localStorage.getItem('providerData')) return null;
   if (currentUser) return currentUser.getIdToken();

   return new Promise((resolve, reject) => {
      const waitTimer = setTimeout(() => {
         reject(null);
      }, 10000);

      const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
         if (!user) {
            reject(null);
         }

         const token = await user.getIdToken();
         resolve(token);

         unregisterAuthObserver();
         clearTimeout(waitTimer);
      });
   });
};

const axiosClient = axios.create({
   withCredentials: true,
   baseURL: process.env.REACT_APP_BACKEND_SERVER,
   headers: {
      'content-type': 'application/json',
   },
   paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
   const token = await getFirebaseToken();
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }

   return config;
});

axiosClient.interceptors.response.use((response) => {
   if (response && response.data) {
      return response.data;
   }

   return response;
});

export default axiosClient;
