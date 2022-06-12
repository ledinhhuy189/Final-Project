const prisma = require('../models/prisma');

const foodModel = prisma.food;

const getFoodList = async () => {
   const find = await foodModel.findMany();
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

module.exports = {
   getFoodList,
   getFoodBySlug,
};
