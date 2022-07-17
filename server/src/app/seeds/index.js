const categorySeeder = require('./category');
const foodSeeder = require('./product');
const userSeeder = require('./user');

const loader = async () => {
   await userSeeder();
   await categorySeeder();
   await foodSeeder();
};

loader();
