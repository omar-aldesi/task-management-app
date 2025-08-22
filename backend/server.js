const express = require("express");
const cors = require("cors");
const { testConnection, sequelize } = require("./src/config/database");
const logger = require("./src/middlewares/logger"); // Add this

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(logger);

// With this
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const authRoutes = require("./src/routes/auth");
const taskRoutes = require("./src/routes/tasks");
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend is working! 🚀",
    timestamp: new Date().toISOString(),
  });
});

// Database test route
app.get("/api/db-test", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ message: "Database connection successful! 🎯" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Database connection failed", details: error.message });
  }
});

const startServer = async () => {
  await testConnection();

  // we can use Sequelize Auto-Migration Tool like the docs, or even Prisma which is more modern
  // but for this app this would be more than enough
  // theres a generated "Proper Migrations" in the migrations file, we can use them by runnin "npm run migrate"
  // each one of the above approaches got its pro/cons but i think i will the the auto-sync for now
  await sequelize.sync({ alter: true }); // alter: true updates existing tables
  console.log("📊 Database synced automatically");

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};
startServer();
