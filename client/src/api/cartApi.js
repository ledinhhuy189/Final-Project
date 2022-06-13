import axiosClient from './axiosClient';

const cartApi = {
   getCart: () => {
      const url = '/cart';
      return axiosClient.get(url);
   },

   upsertCart: ({ data, cartId }) => {
      const url = `/cart/${cartId}`;
      return axiosClient.patch(url, data);
   },
};

export default cartApi;
