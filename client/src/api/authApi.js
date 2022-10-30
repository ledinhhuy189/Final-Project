import axiosClient from './axiosClient';

const authApi = {
   isLogin: () => {
      return new Promise((resolve) => {
         setTimeout(() => {
            resolve({
               name: 'The Thanh',
               phone: '0762634797',
               gender: 'male',
               email: 'thethanhnguyen.662@gmail.com',
            });
         }, 1000);
      });
   },

   checkUserAccount: (params) => {
      const url = '/user/lock';
      return axiosClient.get(url, { params });
   },

   getMeLocal: () => {
      const url = '/user/me/local';
      return axiosClient.get(url);
   },

   upsertAccount: (data) => {
      const url = '/user/upsert';
      return axiosClient.post(url, data);
   },
};

export default authApi;
