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

   getMeLocal: (params) => {
      const url = 'http://localhost:9000/api/user/me/local';
      return axiosClient.get(url, { params });
   },
};

export default authApi;
