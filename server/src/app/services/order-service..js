const prisma = require('../models/prisma');

const orderModel = prisma.order;

const createOrder = async (orderFormData) => {
   const {
      formData: { orderItemsData },
      buyer,
   } = orderFormData;

   const divideFoodByShop = orderItemsData.reduce((acc, orderItem) => {
      let shopUserId = orderItem.userId;
      let foundShopInAcc = acc.findIndex((a) => a.shop.id === shopUserId);

      if (foundShopInAcc !== -1) {
         acc[foundShopInAcc].food.push(orderItem);
         acc[foundShopInAcc].totalPrice += orderItem.price * orderItem.quantity;
      } else {
         acc.push({
            shop: orderItem.user,
            food: [{ ...orderItem }],
            totalPrice: orderItem.price * orderItem.quantity,
         });
      }

      return acc;
   }, []);

   const createOrderByShop = divideFoodByShop.map(async (shop) => {
      const create = await orderModel.create({
         data: {
            totalPrice: shop.totalPrice,
            userId: buyer.uid,
            orderStatusId: 1,
            orderItems: {
               createMany: {
                  data: shop.food.map((f) => {
                     return {
                        foodId: f.id,
                        quantity: f.quantity,
                     };
                  }),
               },
            },
         },
      });

      return create;
   });

   const promiseResult = await Promise.all(createOrderByShop);

   return promiseResult;
};

module.exports = {
   createOrder,
};
