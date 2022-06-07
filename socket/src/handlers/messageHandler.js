const { findUser } = require('../services/userService');
const io = require('../initialize');

const sendMessageToSocket = function (payload) {
   const findReceiver = findUser({
      userId: payload.to.userId,
   });

   if (!findReceiver) return;

   io.to(findReceiver.socketId).emit('messages:receive', {
      ...payload,
   });
};

module.exports = {
   sendMessageToSocket,
};
