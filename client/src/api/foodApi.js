import axiosClient from './axiosClient';

const foodApi = {
   getAllFood: () => {
      const url = '/food';
      return axiosClient.get(url);
   },

   getFoodById: (slug) => {
      const url = `/food/${slug}`;
      return axiosClient.get(url);
   },
};

export default foodApi;
