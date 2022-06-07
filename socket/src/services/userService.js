let users = require('../store/user');

const findUser = (userData) => {
   return users.find((user) => user.userId === userData.userId);
};

const findUserIndex = (userData) => {
   return users.findIndex((user) => user.userId === userData.userId);
};

const addUser = (userData) => {
   const indexOfUserId = findUserIndex(userData);
   if (indexOfUserId === -1) {
      users.push(userData);
      return console.log('Adding...', users);
   }

   users[indexOfUserId] = userData;
   return console.log('Adding...', users);
};

const removeUser = (userData) => {
   users = users.filter((user) => user.socketId !== userData.socketId);
   return;
};

module.exports = { addUser, findUser, removeUser };
