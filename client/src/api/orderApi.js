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

   getShopOrder: (params) => {
      const url = '/order/shop';
      return axiosClient.get(url, { params });
   },

   changeOrderStatus: (data) => {
      const url = '/order/status';
      return axiosClient.patch(url, data);
   },
};

export default orderApi;
