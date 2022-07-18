const { orderService } = require('../services');

const createOrder = async (req, res, next) => {
   try {
      const userInfo = req.getUserInfoByToken;

      const response = await orderService.createOrder({
         formData: req.body,
         buyer: userInfo,
      });

      return res.json(
         response
         //   {
         //    responseData: response,
         //    message: 'create_order_success',
         // }
      );
   } catch (error) {
      return next(error);
   }
};

module.exports = {
   createOrder,
};
