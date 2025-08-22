const authPaths = require("./auth");
const taskPaths = require("./tasks");

module.exports = {
  ...authPaths,
  ...taskPaths,
};
