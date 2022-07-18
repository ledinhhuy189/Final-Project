const userRouter = require('./user-routes');
const conversationRouter = require('./conversation-routes');
const messageRouter = require('./message-routes');
const foodRouter = require('./food-routes');
const cartRouter = require('./cart-routes');
const orderRouter = require('./order-routes');

const route = (app) => {
   app.use('/api/cart', cartRouter);
   app.use('/api/user', userRouter);
   app.use('/api/conversation', conversationRouter);
   app.use('/api/message', messageRouter);
   app.use('/api/food', foodRouter);
   app.use('/api/order', orderRouter);
};

module.exports = route;
