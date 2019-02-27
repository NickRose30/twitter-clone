/**
 * This first line will load all of our environment variables into our application. They come from the '.env' file,
 * and they can be accessed using process.env.{}
 */
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');
const ip = require('ip');
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');

// The 'process.env.PORT' part was added as part of deployment to heroku. This just means that 
// if we have a PORT variable assigned to us (by heroku) we will use that one, otherwise we 
// will use 8081, like for development
const PORT = process.env.PORT || 8081;

/**
 * This is our custom error handler that we want to use. The default errors are large and hard to read.
 * Our custom handler returns nicely formatted json and only essential information.
 * @type {errorHandler}
 */
const errorHandler = require('./handlers/error');
/** Importing routes. */
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');



app.use(cors());
app.use(bodyParser.json());

/**
 * Routes are here. First param is the prefix to all the routes, and the last param is the actual routes. So the
 * second example is saying to first make sure the user is logged in, then make sure it is the correct
 * user, then use the message routes.
 */
app.use('/api/auth', authRoutes);
app.use(
  '/api/users/:id/messages',
  loginRequired,
  ensureCorrectUser,
  messagesRoutes
);
app.get('/api/messages', loginRequired, async (req, res, next) => {
  try {
    /** We wanna get all the messages in the db, sort them in descending order based on when they were created, and
     * then populate the user field with the username and profile image so we can display those things on the timeline.
     */
    const messages = await db.Message.find()
      .sort({
        createdAt: 'desc'
      })
      .populate('user', {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(messages);
  } catch (e) {
    return next(e);
  }
});


/** Default route handler. This will be hit when the route matches nothing else. */
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/** Use our custom error handler (imported and explained above). */
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on ${ip.address()}:${PORT}`);
});