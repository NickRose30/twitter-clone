const mongoose = require('mongoose');

/**
 * bcrypt is the module we use to hash passwords so that user passwords are never save in plain text
 */
const bcrypt = require('bcrypt');


/**
 * This is our regular schema that we do in every mongoose app. We have an array field containing all the
 * messages for a user that is referencing out other 'message' schema.
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  ]
});


/**
 * This will run right before the new document is saved to the database.
 * This is where we hash the password, so the password never gets stored to the database is plain text.
  */
userSchema.pre('save', async function(next) {
  try {
    if(!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});


/**
 * This method is essentially a method on the user 'object' and we can use it when a user logs in to compare
 * his hashed password in the database to the hashed version of the password he typed in.
 * @param candidatePassword
 * @param next
 * @returns {Promise<*>}
 */
userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch
  } catch (err) {
    return next(err);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;