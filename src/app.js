const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors middleware
const authRoutes = require("./routes/authRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const reportRoutes = require("./routes/reportRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Use cors middleware to enable CORS
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/auth", authRoutes);
app.use("/budgets", budgetRoutes);
app.use("/transactions", transactionRoutes);
app.use("/reports", reportRoutes);
app.use("/categories", categoryRoutes);

module.exports = app;
