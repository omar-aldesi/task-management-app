const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Task = sequelize.define(
  "Task",
  {
    id: {
      // again , defining the basic fields
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "to do", // cool default value
    },
    position: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // i think this would be a good default value? i will override it later in the CRUD funcs
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        // foreign key relationship
        model: "Users",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    paranoid: true, // based on the docs, this line supposed to make deletation more smooth
  }
);

module.exports = Task;
