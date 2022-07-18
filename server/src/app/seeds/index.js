const categorySeeder = require('./category');
const foodSeeder = require('./product');
const userSeeder = require('./user');
const orderStatusSeeder = require('./orderStatus');

const loader = async () => {
   await userSeeder();
   await categorySeeder();
   await foodSeeder();
   await orderStatusSeeder();
};

loader();
