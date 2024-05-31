const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const generateMonthlyReport = async (req, res) => {
  const { userId } = req.user;
  const { month, year } = req.query;

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate monthly report" });
  }
};

const generateCategoryReport = async (req, res) => {
  const { userId } = req.user;
  const { categoryId } = req.query;

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        categoryId: parseInt(categoryId),
      },
      include: { category: true },
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate category report" });
  }
};

module.exports = {
  generateMonthlyReport,
  generateCategoryReport,
};
