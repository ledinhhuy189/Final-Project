import axiosClient from './axiosClient';

const orderApi = {
   makeOrder: (data) => {
      const url = '/order';
      return axiosClient.post(url, data);
   },
};

export default orderApi;
