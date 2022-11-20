import axiosClient from './axiosClient';

const categoryApi = {
   getCategory: () => {
      const url = '/category';
      return axiosClient.get(url);
   },

   getFoodInCategory: (params) => {
      const url = '/category/food';
      return axiosClient.get(url, { params });
   },
};

export default categoryApi;
