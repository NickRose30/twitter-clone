const db = require('../models');

exports.createMessage = async (req, res, next) => {
  try {
    /** Create a new message. Our route will contain the user id in it, so we can extract it for the user field of the message. */
    const message = await db.Message.create({
      text: req.body.text,
      user: req.params.id
    });
    /** Find the user based on the id from the route */
    const foundUser = await db.User.findById(req.params.id);
    /** Push this message id to the user's message array */
    foundUser.messages.push(message.id);
    await foundUser.save();

    /** We want to find the message we just added, but we want to populate the user field of that message with
     * some more data about the user.
     */
    const foundMessage = await db.Message.findById(message._id).populate('user', {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(foundMessage);
  } catch (e) {
    return next(e);
  }
};

exports.getMessage = async (req, res, next) => {
  try {
    const message = await db.Message.find(req.params.message_id);
    return res.status(200).json(message);
  } catch (e) {
    return next(e);
  }
};

exports.deleteMessage = async (req, res, next) => {
  try {
    /** There is a mongoose method called findByIdAndRemove, which would normally be good here, but we have a pre-remove
     * hook in our message model, which does not work with findByIdAndRemove, so we have to find, then remove.
     */
    const foundMessage = await db.Message.findById(req.params.message_id);
    await foundMessage.remove();
    return res.status(200).json(foundMessage);
  } catch (e) {
    return next(e);
  }
};