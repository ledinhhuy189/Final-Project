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

   searchConversationByName: (params) => {
      const url = '/conversation/search';
      return axiosClient.get(url, { params });
   },
};

export default conversationApi;
