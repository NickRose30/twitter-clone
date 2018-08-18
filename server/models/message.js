const mongoose = require('mongoose');
const User = require('./user');


/**
 * We are creating another mongoose model for a message that has a text field and a user field. The user field
 * specifies the user that is associated to the message. Whatever you type in the 'ref' field for the user
 * object has to be exactly what we called the user schema. For example, if we typed 'user' with a lowercase
 * 'u' everything would break.
 */
const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    require: true,
    maxLength: 160
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});


/**
 * This will run before removing a message from the database. This is a mongoose feature. We
 * could pass in 'remove', or 'save' or whatever else mongoose allows for.
 */
messageSchema.pre('remove', async function(next) {
  try {
    /** Find a user based on the user field from the particular message we are trying to remove */
    const user = User.findById(this.user);
    /** Remove this message's id from the user's messages array */
    user.messages.remove(this.id);
    /** Save that user and don't continue until it is finished being saved */
    await user.save();
    return next();
  } catch(err) {
    next(err);
  }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;