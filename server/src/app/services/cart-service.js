const prisma = require('../models/prisma');

const cartModel = prisma.cart;
const cartItemModel = prisma.cartItem;

const getCart = async (userId) => {
   const find = await cartModel.findUnique({
      where: {
         userId,
      },
      include: {
         cartItems: {
            include: {
               food: {
                  include: {
                     user: true,
                  },
               },
            },
            orderBy: {
               createdAt: 'desc',
            },
         },
      },
   });
   return find;
};

const upsertCart = async ({ cartItem, cartId }) => {
   const upsertType = cartItem.type === 'decrease' ? -1 : 1;

   const findCartItem = await cartItemModel.findFirst({
      where: {
         AND: [
            {
               foodId: Number(cartItem.foodId),
            },
            {
               cartId: Number(cartId),
            },
         ],
      },
   });

   if (findCartItem) {
      const updateCartItem = await cartItemModel.update({
         where: {
            id: findCartItem.id,
         },
         data: {
            quantity: Number(findCartItem?.quantity) + upsertType,
         },
         include: {
            food: {
               include: {
                  user: true,
               },
            },
         },
      });

      return updateCartItem;
   }

   const createCartItem = await cartItemModel.create({
      data: {
         cartId: Number(cartId),
         foodId: Number(cartItem.foodId),
      },
      include: {
         food: {
            include: {
               user: true,
            },
         },
      },
   });

   return createCartItem;
};

const deleteCartItem = async (cartItemId) => {
   const remove = await cartItemModel.delete({
      where: {
         id: Number(cartItemId),
      },
      include: {
         food: {
            include: {
               user: true,
            },
         },
      },
   });
   return remove;
};

module.exports = {
   getCart,
   upsertCart,
   deleteCartItem,
};
