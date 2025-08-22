const User = require("./User");
const Task = require("./Task");

// define relationships in separate file to look cool, and to make models import more easier.
User.hasMany(Task, { foreignKey: "userId", as: "tasks" });
Task.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = { User, Task };
