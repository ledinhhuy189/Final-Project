const { cartService } = require('../services');

const getCartListInDb = async (req, res, next) => {
   try {
      const userInfo = req.getUserInfoByToken;
      const cartResponse = await cartService.getCart(userInfo.uid);
      return res.json(cartResponse);
   } catch (error) {
      return next(error);
   }
};

const upsertCartInDb = async (req, res, next) => {
   try {
      const cartUpsertResponse = await cartService.upsertCart({
         cartItem: req.body,
         cartId: req.params.cartId,
      });
      return res.json(cartUpsertResponse);
   } catch (error) {
      return next(error);
   }
};

module.exports = {
   getCartListInDb,
   upsertCartInDb,
};
