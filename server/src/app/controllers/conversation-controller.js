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

const searchConversationByName = async (req, res, next) => {
   try {
      const userInfo = req.getUserInfoByToken;
      const searchResponse = await conversationService.findConversationByMember(
         {
            memberName: req.query.memberName,
            email: userInfo.email,
            userId: userInfo.uid,
         }
      );

      return res.json(searchResponse);
   } catch (error) {
      return next(error);
   }
};

const createConversation = async (req, res, next) => {
   try {
      const userInfo = req.getUserInfoByToken;

      const createConversationResult =
         await conversationService.createConversation({
            from: userInfo.uid,
            to: req.body.userId,
         });

      return res.json(createConversationResult);
   } catch (error) {
      return next(error);
   }
};

module.exports = {
   findConversationOfUser,
   findMessageInConversation,
   searchConversationByName,
   createConversation,
};
