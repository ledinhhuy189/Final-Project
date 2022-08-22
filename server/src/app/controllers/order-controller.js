const { orderService } = require('../services');

const createOrder = async (req, res, next) => {
   try {
      const userInfo = req.getUserInfoByToken;
      console.log('🚀 ~ userInfo', userInfo);
      console.log('🚀 ~ req.body', req.body);

      const response = await orderService.createOrder({
         formData: req.body,
         buyer: userInfo,
      });

      return res.json(response);
   } catch (error) {
      return next(error);
   }
};

module.exports = {
   createOrder,
};
