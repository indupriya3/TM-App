const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes (require authentication)
router.get('/', authMiddleware, getTasks); // Get all tasks for the user
router.post('/', authMiddleware, createTask); // Create a new task
router.put('/:id', authMiddleware, updateTask); // Update a task by ID
router.delete('/:id', authMiddleware, deleteTask); // Delete a task by ID

module.exports = router;