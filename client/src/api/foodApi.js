import axiosClient from './axiosClient';

const foodApi = {
   getAllFood: () => {
      const url = '/food';
      return axiosClient.get(url);
   },

   getFoodOfUser: () => {
      const url = '/food/my';
      return axiosClient.get(url);
   },

   getFoodBySlug: (slug) => {
      const url = `/food/${slug}`;
      return axiosClient.get(url);
   },

   createFood: (data) => {
      const url = '/food';
      return axiosClient.post(url, data);
   },
};

export default foodApi;
