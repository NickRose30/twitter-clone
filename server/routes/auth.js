const express = require('express');
const router = express.Router();
const { signup, authenticate, validate } = require('../handlers/auth');

router.post('/signup', signup);
router.post('/authenticate', authenticate);
router.post('/validateToken', validate);

module.exports = router;