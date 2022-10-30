import axiosClient from './axiosClient';

const adminApi = {
   getUserList: (params) => {
      const url = '/admin/users';
      return axiosClient.get(url, { params });
   },

   lockUser: (data) => {
      const url = '/admin/user/lock';
      return axiosClient.patch(url, data);
   },
};

export default adminApi;
