const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/get-user-id/:id', userController.getUserById);
router.get('/get-all-user', userController.getAllUsers);
router.put('/update-user-id/:id', userController.updateUser);

module.exports = router;
