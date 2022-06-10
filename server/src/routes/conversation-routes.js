const express = require('express');
const router = express.Router();
const { conversationController } = require('../app/controllers');
const { tokenVerify } = require('../firebase');

router.get(
   '/search',
   tokenVerify,
   conversationController.searchConversationByName
);
router.get(
   '/:conversationId',
   tokenVerify,
   conversationController.findMessageInConversation
);
router.get('/', tokenVerify, conversationController.findConversationOfUser);

module.exports = router;
