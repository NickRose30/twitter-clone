const express = require('express');
/** We need the mergeParams flag so our functions will have access to the params in the path */
const router = express.Router({ mergeParams: true });
const { createMessage, getMessage, deleteMessage } = require('../handlers/messages');

/** We can use router.route to attach multiple http verbs to one path */
router.route('/').post(createMessage);
router.route('/:message_id')
  .get(getMessage)
  .delete(deleteMessage);

module.exports = router;