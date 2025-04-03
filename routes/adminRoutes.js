const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { addGrocery, updateGrocery, deleteGrocery, getAllGroceries } = require('../controllers/adminController');

router.post('/groceries', authMiddleware, addGrocery);
router.put('/groceries/:id', authMiddleware, updateGrocery);
router.delete('/groceries/:id', authMiddleware, deleteGrocery);
router.get('/groceries', authMiddleware, getAllGroceries);

module.exports = router;
