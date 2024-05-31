const express = require("express");
const {
  generateMonthlyReport,
  generateCategoryReport,
} = require("../controllers/reportController");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

router.get("/monthly", authenticateToken, generateMonthlyReport);
router.get("/category", authenticateToken, generateCategoryReport);

module.exports = router;
