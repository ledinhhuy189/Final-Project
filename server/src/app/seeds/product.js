const prisma = require('../models/prisma');

const FOOD_SEED_DATA = [
   {
      id: 1,
      slug: 'salad-sdcnd',
      name: 'Fresh Salad',
      description: 'Magna id amet ex sit ut commodo proident.',
      price: 320,
      photoURL:
         'https://www.foodconfidence.com/wp-content/uploads/2018/03/Winter-Fruit-Vegetable-Salad-2-of-3-500x500.jpg',
      stock: 1,
      categoryId: 2,
      userId: 'gqV5SB5htHUztnoUIdDX2qhNgtt1',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: null,
   },
   {
      id: 2,
      slug: 'salad-woef',
      name: 'Salad with meat',
      description: 'Fugiat officia anim nostrud.',
      price: 140,
      photoURL:
         'https://img.buzzfeed.com/video-api-prod/assets/b117b68b750b495db5663b5fc300edaa/BFV44744_RoastedVeggieSummerSaladWithChimichurriDressing-Thumb.jpg?resize=300:*&output-format=jpg&output-quality=auto',
      stock: 5,
      categoryId: 1,
      userId: 'IUAh502XkVV9NHPk9dSLVC49HlS2',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: null,
   },
   {
      id: 3,
      slug: 'beef-dmvn',
      name: 'Beef',
      description: 'Nisi esse in mollit dolor excepteur.',
      price: 200,
      photoURL:
         'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2017/12/27/0/FNM_010118-Flank-Steak-with-Roasted-Root-Vegetables_s4x3.jpg.rend.hgtvcom.616.462.suffix/1514417813938.jpeg',
      stock: 64,
      categoryId: 1,
      userId: 'gqV5SB5htHUztnoUIdDX2qhNgtt1',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: null,
   },
   {
      id: 4,
      slug: 'rice-dmvn',
      name: 'Rice',
      description: 'Non officia laborum velit occaecat ullamco.',
      price: 54,
      photoURL:
         'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/7a50544f-7025-484c-ab9c-b68d9a138242/Derivates/2dbce5cd-ed5d-48be-8ef5-6eb1c7b42078.jpg',
      stock: 100,
      categoryId: 4,
      userId: 'gqV5SB5htHUztnoUIdDX2qhNgtt1',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: null,
   },
   {
      id: 5,
      slug: 'fish-dmvn',
      name: 'Fish',
      description: 'Do sint amet consectetur mollit veniam minim.',
      price: 62,
      photoURL:
         'https://media.istockphoto.com/photos/baked-salmon-steak-with-tomato-onion-mix-of-green-leaves-salad-in-a-picture-id846068022?k=20&m=846068022&s=612x612&w=0&h=45A6s6WrxMSZS0FWJYb-vuIJ3SGGbdBIFDNCwvl0HkE=',
      stock: 100,
      categoryId: 5,
      userId: 'IUAh502XkVV9NHPk9dSLVC49HlS2',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: null,
   },
];

const foodSeeder = async () => {
   FOOD_SEED_DATA.forEach(async (element) => {
      await prisma.food.upsert({
         where: {
            id: element.id,
         },
         create: element,
         update: element,
      });
   });
};

module.exports = foodSeeder;
