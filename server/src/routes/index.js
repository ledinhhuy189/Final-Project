const userRouter = require('./user-routes');

const route = (app) => {
   app.use('/api/user', userRouter);
};

module.exports = route;
