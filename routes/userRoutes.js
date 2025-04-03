const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getAllGroceries, placeOrder } = require('../controllers/userController');

router.get('/groceries', getAllGroceries);
router.post('/orders', authMiddleware, placeOrder);

module.exports = router;
