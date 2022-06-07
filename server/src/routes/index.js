const userRouter = require('./user-routes');
const conversationRouter = require('./conversation-routes');
const messageRouter = require('./message-routes');

const route = (app) => {
   app.use('/api/user', userRouter);
   app.use('/api/conversation', conversationRouter);
   app.use('/api/message', messageRouter);
};

module.exports = route;
