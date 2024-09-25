const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.createAuth);
router.get('/login', authController.loginAuth);

module.exports = router;
