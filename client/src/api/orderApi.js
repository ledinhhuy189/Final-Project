import axiosClient from './axiosClient';

const orderApi = {
   makeOrder: (data) => {
      const url = '/order';
      return axiosClient.post(url, data);
   },

   getUserOrder: (params) => {
      const url = '/order/me';
      return axiosClient.get(url, { params });
   },
};

export default orderApi;
