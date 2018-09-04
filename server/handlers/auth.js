/**
 * When you pass a directory to the 'require' function, it will automatically look for an index.js
 * file in that directory. So this is actually equivalent to 'require('../models/index/')'.
 */
const db = require('../models');
const jwt = require('jsonwebtoken');
/** The amount of time the jwt tokens will be valid for. */
const tokenExpiration = '10m';

exports.authenticate = async (req, res, next) => {
  try {
    /** Find a user in the database based on the email passed in to the request */
    const user = await db.User.findOne({
      email: req.body.email
    });
    const { id, username, profileImageUrl } = user;
    /**
     * Check if the password passed into the request matches the hashed password stored in the database.
     * @type {Promise<*>}
     */
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      /**
       * This is how you create a jwt token. A secret key needs to be passed in to make the auth token unique
       */
      const token = jwt.sign(
        {
          id,
          username,
          profileImageUrl
        },
        process.env.SECRET_KEY,
        { expiresIn: tokenExpiration }
      );
      /**
       * Return a 200 if it gets to this point and everything is good. It is helpful to
       * send this information back as part of the json response.
       */
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      });
    } else {
      return next({
        status: 400,
        message: 'Invalid Email/Password'
      });
    }
  } catch (e) {
    return next({
      status: 400,
      message: 'Invalid Email/Password'
    });
  }
};

exports.signup = async (req, res, next) => {
  try {
    const user = await db.User.create(req.body);
    const { id, username, profileImageUrl } = user;
    /**
     * This is how you create a jwt token. A secret key needs to be passed in to make the auth token unique
     */
    const token = jwt.sign(
      {
        id,
        username,
        profileImageUrl
      },
      process.env.SECRET_KEY,
      { expiresIn: tokenExpiration }
    );
    /**
     * Return a 200 if it gets to this point and everything is good. It is helpful to
     * send this information back as part of the json.
     */
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    })
  } catch(err) {
    /**
     * This is a validation failure. Mongoose's error code for a validation failure is 11000. This is just
     * something you have to know. The default mongoose response for this error is messy and cryptic, so we
     * return a nicer response here that will be easier for frontend developers to understand quickly.
     */
    if (err.code === 11000) {
      err.message = 'Sorry, that username and/or email is taken.';
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.validate = async (req, res, next) => {
  try {
    const token = req.body.token;
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if(decoded) {
        const { id, username } = decoded;
        return res.status(200).json({id, username, token});
      } else {
        return res.status(200).json({});
      }
    });
  } catch(err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.refresh = async (req, res, next) => {
  try {
    let newToken;
    if (req.body.token) {
      const accessToken = req.body.token;
      jwt.verify(accessToken, process.env.SECRET_KEY, (err, decoded) => {
        if(decoded) {
          const { id, username, profileImageUrl } = decoded;
          newToken = jwt.sign(
            {
              id,
              username,
              profileImageUrl
            },
            process.env.SECRET_KEY,
            { expiresIn: tokenExpiration }
          );
        }
      });
    }
    return res.status(200).json(newToken ? { token: newToken } : {});
  } catch(err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};