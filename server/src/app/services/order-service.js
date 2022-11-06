const prisma = require('../models/prisma');

const foodModel = prisma.food;
const orderModel = prisma.order;
const cartItemModel = prisma.cartItem;
const cartModel = prisma.cart;

const createOrder = async (orderFormData) => {
   const {
      formData: { orderItemsData },
      buyer,
   } = orderFormData;

   // Check user is owner of food to avoid spam order for shop
   const checkUserOfOrder = orderItemsData?.find(
      (orderItem) => orderItem.user?.id === buyer.uid
   );

   if (checkUserOfOrder)
      return {
         message: 'user_is_owner_of_food',
      };

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
            orderItems: {
               include: {
                  food: true,
               },
            },
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

   promiseResult[0]?.orderItems?.map(async (foodItem) => {
      // Delete Food in cart of user when order success
      await cartItemModel.deleteMany({
         where: {
            cartId: Number(getCartIdOfUser.id),
            foodId: Number(foodItem.foodId),
         },
      });

      // Update quantity of food
      await foodModel.update({
         where: {
            id: Number(foodItem.foodId),
         },
         data: {
            stock: Number(foodItem.food.stock) - Number(foodItem.quantity),
         },
      });
   });

   return promiseResult;
};

const getOrderOfUser = async ({ uid, orderStatusId, createdAtDirection }) => {
   const find = await orderModel.findMany({
      where: {
         userId: uid,
         orderStatusId: orderStatusId ? Number(orderStatusId) : undefined,
      },
      include: {
         orderItems: {
            include: {
               food: {
                  include: {
                     user: true,
                  },
               },
            },
         },
         orderStatus: true,
         user: true,
      },
      orderBy: {
         createdAt: createdAtDirection || 'desc',
      },
   });

   return find;
};

const getOrderOfShop = async ({ uid, createdAtDirection }) => {
   const find = await orderModel.findMany({
      where: {
         orderItems: {
            some: {
               food: {
                  userId: uid,
               },
            },
         },
      },
      include: {
         orderItems: {
            include: {
               food: {
                  include: {
                     user: true,
                  },
               },
            },
         },
         orderStatus: true,
         user: true,
      },
      orderBy: {
         createdAt: createdAtDirection || 'desc',
      },
   });

   return find;
};

const changeStatusOfOrder = async ({ orderStatusId, orderId }) => {
   const find = await orderModel.update({
      where: {
         id: Number(orderId),
      },
      data: {
         orderStatusId: Number(orderStatusId),
      },
   });

   return find;
};

module.exports = {
   createOrder,
   getOrderOfUser,
   getOrderOfShop,
   changeStatusOfOrder,
};
