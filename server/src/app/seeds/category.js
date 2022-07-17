const prisma = require('../models/prisma');

const CATEGORY_SEED_DATA = [
   {
      id: 1,
      name: 'Meat',
      description:
         'Irure incididunt ea fugiat laborum minim Lorem non voluptate irure sint do amet proident.',
      createdAt: new Date(),
      updatedAt: new Date(),
   },
   {
      id: 2,
      name: 'Vegetable',
      description:
         'Nostrud tempor exercitation commodo dolore aliquip incididunt.',
      createdAt: new Date(),
      updatedAt: new Date(),
   },
   {
      id: 3,
      name: 'Fruit',
      description:
         'Fugiat aliqua est adipisicing amet amet laborum aliquip aliquip officia dolore et eu dolore.',
      createdAt: new Date(),
      updatedAt: new Date(),
   },
   {
      id: 4,
      name: 'Rice',
      description: 'Pariatur duis eiusmod ea ea dolore enim laboris ut.',
      createdAt: new Date(),
      updatedAt: new Date(),
   },
   {
      id: 5,
      name: 'Seafood',
      description: 'Ea ex duis sint pariatur et est velit sunt.',
      createdAt: new Date(),
      updatedAt: new Date(),
   },
];

const categorySeeder = async () => {
   CATEGORY_SEED_DATA.forEach(async (element) => {
      await prisma.category.upsert({
         where: {
            id: element.id,
         },
         create: element,
         update: element,
      });
   });
};

module.exports = categorySeeder;
