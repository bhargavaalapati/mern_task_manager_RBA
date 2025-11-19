const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// All task routes are protected

// /api/tasks
router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

// /api/tasks/:id
router.route('/:id')
  .get(protect, getTask) 
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;