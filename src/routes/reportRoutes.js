const express = require('express');
const { getMonthlyReport, getCategoryWiseReport } = require('../controllers/reportController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.get('/monthly', authenticateToken, getMonthlyReport);
router.get('/category-wise', authenticateToken, getCategoryWiseReport);

module.exports = router;
