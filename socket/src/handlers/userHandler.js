const { addUser, removeUser } = require('../services/userService');
const io = require('../initialize');

const addUsersToSocket = function (payload) {
   const socket = this;
   addUser({ ...payload, socketId: socket.id });
};

const removeUsersFromSocket = function () {
   const socket = this;
   removeUser({ socketId: socket.id });
};

module.exports = {
   addUsersToSocket,
   removeUsersFromSocket,
};
