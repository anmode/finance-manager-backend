const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getMonthlyReport = async (req, res) => {
  const { month, year } = req.query;

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.user.userId,
        date: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
    });

    const totalIncome = transactions
      .filter(t => t.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0);

    res.json({ totalIncome, totalExpenses });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getCategoryWiseReport = async (req, res) => {
  const { month, year } = req.query;

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.user.userId,
        date: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
        type: 'EXPENSE',
      },
      include: {
        category: true,
      },
    });

    const expensesByCategory = transactions.reduce((acc, transaction) => {
      const category = transaction.category.name;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += transaction.amount;
      return acc;
    }, {});

    res.json(expensesByCategory);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { getMonthlyReport, getCategoryWiseReport };
