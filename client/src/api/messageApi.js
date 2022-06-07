import axiosClient from './axiosClient';

const messageApi = {
   getMessages: ({ params }) => {
      const url = '/message';
      return axiosClient.get(url, { params });
   },

   createMessage: (data) => {
      const url = '/message';
      return axiosClient.post(url, data);
   },
};

export default messageApi;
