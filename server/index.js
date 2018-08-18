/**
 * This first line will load all of our environment variables into our application. They come from the '.env' file,
 * and they can be accessed using process.env.{}
 * */
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const ip = require('ip');
const PORT = 8081;
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
 * Routes are here. First param is the prefix to all the routes and then the second param is
 * the actual routes, which are required above.
 */
app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages', messagesRoutes);


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