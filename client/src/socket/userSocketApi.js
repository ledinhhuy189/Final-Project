import socket from './initialize';

const socketUserApi = {
   emitMyInfo: (userData) => socket.emit('users:add', userData),
   emitMessage: (messageData) => socket.emit('messages:send', messageData),
   onReceive: (callback) => socket.on('messages:receive', callback),
};

export default socketUserApi;
