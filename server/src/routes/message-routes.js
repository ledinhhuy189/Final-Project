const express = require('express');
const router = express.Router();
const { messageController } = require('../app/controllers');
const { tokenVerify } = require('../firebase');

router.post('/', tokenVerify, messageController.createMessageToConversation);
router.get('/', tokenVerify, messageController.findMessageInConversation);

module.exports = router;
