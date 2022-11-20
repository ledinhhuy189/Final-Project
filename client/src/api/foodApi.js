import axiosClient from './axiosClient';

const foodApi = {
   getAllFood: () => {
      const url = '/food';
      return axiosClient.get(url);
   },

   disableFood: (foodId, isDeleted) => {
      const url = `/food/${foodId}/disable`;
      return axiosClient.patch(url, { isDeleted });
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

   updateFood: (data) => {
      const url = '/food';
      return axiosClient.patch(url, data);
   },
};

export default foodApi;
