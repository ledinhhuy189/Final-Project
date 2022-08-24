const prisma = require('../models/prisma');

const categoryModel = prisma.category;

const getCategoryList = async () => {
   const find = await categoryModel.findMany();

   return find;
};

module.exports = {
   getCategoryList,
};
