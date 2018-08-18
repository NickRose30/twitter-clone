const express = require('express');
const router = express.Router();
const { signup, authenticate } = require('../handlers/auth');

router.post('/signup', signup);
router.post('/authenticate', authenticate);

module.exports = router;