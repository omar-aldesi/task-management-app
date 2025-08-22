const { Sequelize } = require("sequelize");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: "postgres",
  logging: false,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connection established successfully...");
  } catch (error) {
    console.error("DB connection failed:", error.message);
  }
};

module.exports = { sequelize, testConnection };
