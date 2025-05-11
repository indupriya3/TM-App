const Task = require('../models/Task');

// Get all tasks for a user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }); // Fetch tasks for the logged-in user
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({
      title,
      description,
      status: 'To Do', // Default status
      userId: req.userId, // Associate task with the logged-in user
    });

    await newTask.save();
    res.status(201).json(newTask); // Return the newly created task
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a task
// Update a task
// Update a task
// TaskController.js (Backend)

exports.updateTask = async (req, res) => {
  try {
      const { id } = req.params;
      console.log("Updating task with ID:", id); // Log the ID

      const updatedTask = await Task.findByIdAndUpdate(
          id,
          { ...req.body, userId: req.userId },
          { new: true }
      );

      if (!updatedTask) {
          console.log("Task not found with ID:", id); // Log if task not found
          return res.status(404).json({ message: 'Task not found.' });
      }

      res.json(updatedTask);
  } catch (err) {
      console.error("Error updating task:", err); // Log the error
      res.status(500).json({ message: err.message });
  }
};
// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.json({ message: 'Task deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Example route handler in your taskController.js

