const express = require('express');
const router = express.Router();
const { signup, authenticate, validate, refresh } = require('../handlers/auth');

router.post('/signup', signup);
router.post('/authenticate', authenticate);
router.post('/validateToken', validate);
router.post('/refreshToken', refresh);

module.exports = router;