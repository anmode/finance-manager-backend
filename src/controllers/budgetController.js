const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createBudget = async (req, res) => {
  const { amount, month, year } = req.body;

  try {
    const budget = await prisma.budget.create({
      data: {
        amount,
        month,
        year,
        userId: req.user.userId,
      },
    });
    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

const getBudgets = async (req, res) => {
  try {
    const budgets = await prisma.budget.findMany({
      where: {
        userId: req.user.userId,
      },
    });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { createBudget, getBudgets };
