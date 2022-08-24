const prisma = require('../models/prisma');

const CATEGORY_SEED_DATA = [
   {
      name: 'Meat',
      description:
         'Irure incididunt ea fugiat laborum minim Lorem non voluptate irure sint do amet proident.',
      createdAt: new Date(),
      updatedAt: new Date(),

      foods: [
         {
            slug: 'salad-sdcnd',
            name: 'Fresh Salad',
            description: 'Magna id amet ex sit ut commodo proident.',
            price: 320,
            photoURL:
               'https://www.foodconfidence.com/wp-content/uploads/2018/03/Winter-Fruit-Vegetable-Salad-2-of-3-500x500.jpg',
            stock: 1,
            userId: 'DPDikOoqdDN65shE7d66Wwn2bjy2',
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: null,
         },
      ],
   },
   {
      name: 'Vegetable',
      description:
         'Nostrud tempor exercitation commodo dolore aliquip incididunt.',
      createdAt: new Date(),
      updatedAt: new Date(),

      foods: [
         {
            slug: 'beef-dmvn',
            name: 'Beef',
            description: 'Nisi esse in mollit dolor excepteur.',
            price: 200,
            photoURL:
               'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2017/12/27/0/FNM_010118-Flank-Steak-with-Roasted-Root-Vegetables_s4x3.jpg.rend.hgtvcom.616.462.suffix/1514417813938.jpeg',
            stock: 64,
            userId: 'DPDikOoqdDN65shE7d66Wwn2bjy2',
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: null,
         },
      ],
   },
   {
      name: 'Fruit',
      description:
         'Fugiat aliqua est adipisicing amet amet laborum aliquip aliquip officia dolore et eu dolore.',
      createdAt: new Date(),
      updatedAt: new Date(),

      foods: [
         {
            slug: 'rice-dmvn',
            name: 'Rice',
            description: 'Non officia laborum velit occaecat ullamco.',
            price: 54,
            photoURL:
               'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/7a50544f-7025-484c-ab9c-b68d9a138242/Derivates/2dbce5cd-ed5d-48be-8ef5-6eb1c7b42078.jpg',
            stock: 100,
            userId: 'DPDikOoqdDN65shE7d66Wwn2bjy2',
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: null,
         },
      ],
   },
   {
      name: 'Rice',
      description: 'Pariatur duis eiusmod ea ea dolore enim laboris ut.',
      createdAt: new Date(),
      updatedAt: new Date(),

      foods: [
         {
            slug: 'salad-woef',
            name: 'Salad with meat',
            description: 'Fugiat officia anim nostrud.',
            price: 140,
            photoURL:
               'https://img.buzzfeed.com/video-api-prod/assets/b117b68b750b495db5663b5fc300edaa/BFV44744_RoastedVeggieSummerSaladWithChimichurriDressing-Thumb.jpg?resize=300:*&output-format=jpg&output-quality=auto',
            stock: 5,
            userId: 'jli6FN16VgO3a1jKQRnfqe98qSn1',
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: null,
         },
      ],
   },
   {
      name: 'Seafood',
      description: 'Ea ex duis sint pariatur et est velit sunt.',
      createdAt: new Date(),
      updatedAt: new Date(),

      foods: [
         {
            slug: 'fish-dmvn',
            name: 'Fish',
            description: 'Do sint amet consectetur mollit veniam minim.',
            price: 62,
            photoURL:
               'https://media.istockphoto.com/photos/baked-salmon-steak-with-tomato-onion-mix-of-green-leaves-salad-in-a-picture-id846068022?k=20&m=846068022&s=612x612&w=0&h=45A6s6WrxMSZS0FWJYb-vuIJ3SGGbdBIFDNCwvl0HkE=',
            stock: 100,
            userId: 'jli6FN16VgO3a1jKQRnfqe98qSn1',
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: null,
         },
      ],
   },
];

const categorySeeder = async () => {
   CATEGORY_SEED_DATA.forEach(async (element) => {
      await prisma.category.create({
         data: {
            name: element.name,
            description: element.description,
            createdAt: element.createdAt,
            updatedAt: element.updatedAt,
            foods: {
               createMany: {
                  data: element.foods,
               },
            },
         },
      });
   });
};

module.exports = categorySeeder;
