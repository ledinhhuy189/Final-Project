const prisma = require('../models/prisma');
const slugify = require('slugify');
const { v4: uuidv4 } = require('uuid');

const foodModel = prisma.food;

const getFoodOfUser = async ({ uid }) => {
   const find = await foodModel.findMany({
      where: {
         userId: uid,
      },
      include: {
         user: true,
         category: true,
      },
   });
   return find;
};

const disableFood = async ({ foodId, isDeleted = null }) => {
   const disable = await foodModel.update({
      where: {
         id: Number(foodId),
      },
      data: {
         isDeleted: isDeleted ? new Date() : null,
      },
   });

   return disable;
};

const getFoodList = async () => {
   const find = await foodModel.findMany({
      where: {
         AND: {
            isDeleted: null,
         },
      },
      include: {
         user: true,
         category: true,
      },
   });
   return find;
};

const getFoodBySlug = async ({ slug }) => {
   const findById = await foodModel.findUnique({
      where: {
         slug,
      },
      include: {
         user: true,
         category: true,
      },
   });
   return findById;
};

const createFood = async ({ foodFormData, userData }) => {
   const {
      category,
      price,
      stock,
      description,
      shortDescription,
      name,
      photoURL,
   } = foodFormData;

   const create = await foodModel.create({
      data: {
         userId: userData.uid,
         categoryId: Number(category),
         price: parseFloat(price),
         stock: Number(stock),
         slug: `${slugify(name)}-${uuidv4()}`,

         description,
         shortDescription,
         name,
         photoURL,
      },
   });

   return create;
};

const updateFood = async ({ foodFormData, userData }) => {
   const {
      id,
      category,
      price,
      stock,
      description,
      shortDescription,
      name,
      photoURL,
   } = foodFormData;

   const update = await foodModel.update({
      where: {
         id: Number(id),
      },
      data: {
         categoryId: Number(category),
         price: parseFloat(price),
         stock: Number(stock),
         slug: `${slugify(name)}-${uuidv4()}`,

         description,
         shortDescription,
         name,
         photoURL,
      },
   });

   return update;
};

module.exports = {
   getFoodList,
   getFoodBySlug,
   createFood,
   getFoodOfUser,
   disableFood,
   updateFood,
};
