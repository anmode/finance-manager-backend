const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTransaction = async (req, res) => {
  const { amount, type, categoryId } = req.body;
  console.log(req.body, "Request body");

  try {
    // Check if categoryId exists
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!categoryExists) {
      return res.status(404).json({ error: "Category not found" });
    }

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        type,
        categoryId,
        userId: req.user.userId,
        date: new Date(),
      },
    });
    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ error: "Invalid data or database constraints failed" });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: req.user.userId },
      include: { category: true },
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { amount, type, categoryId } = req.body;

  try {
    const transaction = await prisma.transaction.update({
      where: { id: Number(id) },
      data: {
        amount,
        type, // Ensure `type` is either 'INCOME' or 'EXPENSE'
        categoryId,
      },
    });
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.transaction.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};
