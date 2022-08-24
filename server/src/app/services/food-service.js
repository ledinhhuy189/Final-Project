const prisma = require('../models/prisma');
const slugify = require('slugify');
const { v4: uuidv4 } = require('uuid');

const foodModel = prisma.food;

const getFoodList = async () => {
   const find = await foodModel.findMany({
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

module.exports = {
   getFoodList,
   getFoodBySlug,
   createFood,
};
