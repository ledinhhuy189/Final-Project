import axiosClient from './axiosClient';

const conversationApi = {
   getConversations: () => {
      const url = '/conversation';
      return axiosClient.get(url);
   },

   getMessageInConversations: (conversationId) => {
      const url = `/conversation/${conversationId}`;
      return axiosClient.get(url);
   },
};

export default conversationApi;
