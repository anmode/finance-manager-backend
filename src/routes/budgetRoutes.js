const express = require('express');
const { createBudget, getBudgets } = require('../controllers/budgetController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/', authenticateToken, createBudget);
router.get('/', authenticateToken, getBudgets);

module.exports = router;
