const io = require('./initialize');
const {
   addUsersToSocket,
   removeUsersFromSocket,
} = require('./handlers/userHandler');
const { sendMessageToSocket } = require('./handlers/messageHandler');

const onConnection = (socket) => {
   socket.on('users:add', addUsersToSocket);
   socket.on('messages:send', sendMessageToSocket);
   socket.on('disconnect', removeUsersFromSocket);
};

io.on('connection', onConnection);
