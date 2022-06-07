const { conversationService } = require('../services');

const findConversationOfUser = async (req, res, next) => {
   try {
      const userInfo = req.getUserInfoByToken;
      const response = await conversationService.findConversation({
         userId: userInfo.uid,
      });

      return res.json(response);
   } catch (error) {
      return next(error);
   }
};

const findMessageInConversation = async (req, res, next) => {
   try {
      const response = await conversationService.findMessageInConversation({
         ...req.params,
      });
      return res.json(response);
   } catch (error) {
      return next(error);
   }
};

module.exports = {
   findConversationOfUser,
   findMessageInConversation,
};
