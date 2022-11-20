const prisma = require('../models/prisma');

const categoryModel = prisma.category;

const getCategoryList = async () => {
   const find = await categoryModel.findMany();

   return find;
};

const getFoodInCategory = async ({ categoryId, name }) => {
   const find = await prisma.food.findMany({
      where: {
         AND: [
            {
               category: {
                  id: Number(categoryId),
               },
            },
            {
               name: {
                  contains: name,
                  mode: 'insensitive',
               },
            },
         ],
      },
      include: {
         category: true,
         user: true,
      },
   });

   return find;
};

module.exports = {
   getCategoryList,
   getFoodInCategory,
};
