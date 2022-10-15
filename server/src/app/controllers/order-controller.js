const { orderService } = require('../services');

const createOrder = async (req, res, next) => {
   try {
      const userInfo = req.getUserInfoByToken;

      const response = await orderService.createOrder({
         formData: req.body,
         buyer: userInfo,
      });

      return res.json(response);
   } catch (error) {
      return next(error);
   }
};

const findOrderOfUserInDb = async (req, res, next) => {
   try {
      const userInfo = req.getUserInfoByToken;
      const { orderStatusId, createdAtDirection } = req.query;

      const orderOfUserResponse = await orderService.getOrderOfUser({
         uid: userInfo.uid,
         orderStatusId,
         createdAtDirection,
      });

      return res.json(orderOfUserResponse);
   } catch (error) {
      return next(error);
   }
};

const findOrderOfShopInDb = async (req, res, next) => {
   try {
      const userInfo = req.getUserInfoByToken;

      const orderOfShopResponse = await orderService.getOrderOfShop({
         uid: userInfo.uid,
      });

      return res.json(orderOfShopResponse);
   } catch (error) {
      return next(error);
   }
};

const changeOrderStatusInDb = async (req, res, next) => {
   try {
      const { orderId, orderStatusId } = req.query;

      const changeStatusOfOrderResponse =
         await orderService.changeStatusOfOrder({
            orderId,
            orderStatusId,
         });

      return res.json(changeStatusOfOrderResponse);
   } catch (error) {
      return next(error);
   }
};

module.exports = {
   createOrder,
   findOrderOfUserInDb,
   findOrderOfShopInDb,
   changeOrderStatusInDb,
};
