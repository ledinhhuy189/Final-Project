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

   createConversation: (data) => {
      const url = '/conversation';
      return axiosClient.post(url, data);
   },
};

export default conversationApi;
