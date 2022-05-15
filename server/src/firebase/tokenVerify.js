const { auth } = require('./initialize');

const tokenVerify = (req, res, next) => {
   const headerToken = req.headers.authorization;

   if (!headerToken) {
      return res.status(401).send({ message: 'no_token_provided' });
   }

   if (headerToken && headerToken.split(' ')[0] !== 'Bearer') {
      res.status(401).send({ message: 'invalid_token' });
   }

   const token = headerToken.split(' ')[1];

   auth
      .verifyIdToken(token)
      .then((decodedToken) => {
         req.getUserInfoByToken = decodedToken;
         return next();
      })
      .catch(() => {
         res.status(403).json({
            message: 'not_authorize',
         });
      });
};

module.exports = tokenVerify;
