const { Task } = require("../models/Index.js");

const getTasks = async (req, res) => {
  try {
    // limit and offset for pagination
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // findAndCountAll -> intersting to find such a method like this
    const tasks = await Task.findAndCountAll({
      where: { userId: req.user.id }, // the query condition
      order: [
        ["position", "ASC"],
        ["createdAt", "DESC"],
      ], // order by position and then by createdAt, for CRMs thats important, that way i wont reorder them in the client side
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      tasks: tasks.rows,
      totalTasks: tasks.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(tasks.count / limit), // cool math trick to avoid confusion
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status = "to do", position = 0 } = req.body; // making "position" "status" optional
    const task = await Task.create({
      title,
      description,
      status,
      position,
      userId: req.user.id,
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    // using param instead of body for the task id, its more RESTful
    const { id } = req.params;
    const { title, description, status, position } = req.body;

    const task = await Task.findOne({
      where: { id, userId: req.user.id },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // to be honest, this is not the best approach because the client must send the whole task in order to update it. Instead we can use PATCH method and only send the fields that need to be updated.
    await task.update({ title, description, status, position });

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id, userId: req.user.id },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    // simple delete method
    await task.destroy();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask }; // simple CRUD methods that will be used in the routes
