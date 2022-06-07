const { messageService } = require('../services');

const findMessageInConversation = async (req, res, next) => {
   try {
      const response = await messageService.findMessage(req.query);
      return res.json(response);
   } catch (error) {
      return next(error);
   }
};

const createMessageToConversation = async (req, res, next) => {
   try {
      const userInfo = req.getUserInfoByToken;
      const createResponse = await messageService.createMessage({
         ...req.body,
         userId: userInfo.uid,
      });

      return res.json({ ...createResponse, message: 'create_message_success' });
   } catch (error) {
      return next(error);
   }
};

module.exports = {
   findMessageInConversation,
   createMessageToConversation,
};
