/** Include all of our environment variables again and jwt. We are gonna need these things to decode web tokens */
require('dotenv').load();
const jwt = require('jsonwebtoken');

/** This is not an asynchronous function because the jwt library still uses callbacks, it is not promise based.
 * But we still wrap everything in a try catch because on our first line in the try, when we try to get the Bearer
 * token, if it is empty or undefined, we will get an error;
 */
exports.loginRequired = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    /** This is how we decode the token, using our secret key */
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if(decoded) {
        /** If 'decoded' returns something that means the user is logged in, so we are good.
         * We return next() to just continue on.
         */
        return next();
      } else {
        /** If 'decoded' didn't return anything that means that the user
         * was not logged in so we return a 401 unauthorized.
         */
        return next({
          status: 401,
          message: 'Please log in first'
        });
      }
    });
  } catch(e) {
    next({
      status: 401,
      message: 'Please log in first'
    });
  }
};

exports.ensureCorrectUser = (req, res, next) => {

};