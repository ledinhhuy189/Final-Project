const io = require('socket.io')(9100, {
   cors: {
      origin: 'http://localhost:3000',
   },
});

module.exports = io;
