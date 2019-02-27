const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;
/**
 * If we have a MONGODB_URI assigned to us (by heroku) use that url, otherwise use our local 
 * mongo url, like for develoopment
 */
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/twitter-clone', {
  keepAlive: true,
  useNewUrlParser: true
}).catch(() => console.log(`Cannot connect to database. 
If this is running locally don't forget to start mongodb by running 'mongod'.`));

/**
 * Export all the different models so they can all be accessed just by requiring this one index.js file.
 */
module.exports.User = require('./user');
module.exports.Message = require('./message');