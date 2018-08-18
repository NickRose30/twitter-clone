const express = require('express');
/** We need the mergeParams flag so our functions will have access to the params in the path */
const router = express.Router({ mergeParams: true });
const { createMessage } = require('../handlers/messages');

/** We can use router.route to attach multiple http verbs to one path */
router.route('/')
  .post(createMessage);

module.exports = router;