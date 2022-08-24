const prisma = require('../models/prisma');

const orderModel = prisma.order;
const cartItemModel = prisma.cartItem;
const cartModel = prisma.cart;

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
         include: {
            orderItems: true,
         },
      });

      return create;
   });

   const promiseResult = await Promise.all(createOrderByShop);

   const getCartIdOfUser = await cartModel.findUnique({
      where: {
         userId: buyer.uid,
      },
      select: {
         id: true,
      },
   });

   promiseResult[0].orderItems.map(async (foodItem) => {
      await cartItemModel.deleteMany({
         where: {
            cartId: Number(getCartIdOfUser.id),
            foodId: Number(foodItem.foodId),
         },
      });
   });

   return promiseResult;
};

module.exports = {
   createOrder,
};
