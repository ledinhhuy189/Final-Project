const test = async (req, res, next) => {
   const testJSON = {
      message: 'Hello world',
   };

   return res.json(testJSON);
};

module.exports = {
   test,
};
