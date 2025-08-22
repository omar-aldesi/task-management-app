const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const auth = require("../middlewares/auth");

const router = express.Router();

// use auth in all of them, the simplest approach
router.use(auth);

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id", updateTask); // this should be PATCH in a real app with proper modifications
router.delete("/:id", deleteTask);

module.exports = router;
