const Task = require('../models/Task');

// @desc    Get tasks
// @route   GET /api/tasks
// @desc    Get tasks with Pagination
// @route   GET /api/tasks?page=1&limit=5
const getTasks = async (req, res) => {
  try {
    // 1. Get page and limit from URL (default to Page 1, 5 tasks per page)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // 2. Build the query based on Role
    // (Admins see all, Users see theirs)
    const query = req.user.role === 'admin' ? {} : { createdBy: req.user.id };

    // 3. Fetch tasks with Skip and Limit
    const tasks = await Task.find(query)
      .sort({ createdAt: -1 }) // Show newest first
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'username'); // If admin, show who created it

    // 4. Get total count for frontend logic
    const total = await Task.countDocuments(query);

    // 5. Return everything
    res.status(200).json({
      tasks,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single task
// @route   GET /api/tasks/:id
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Make sure user owns the task (or is admin)
    if (task.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'User not authorized' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create task
// @route   POST /api/tasks
const createTask = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ message: 'Please add a title' });
  }

  const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    createdBy: req.user.id,
  });

  res.status(200).json(task);
};

// @desc    Update task
// @route   PUT /api/tasks/:id
const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  // Check if user owns the task (Admins can update any task if you want, but usually they just delete)
  // Here we strictly allow only the owner to edit content
  if (task.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({ message: 'User not authorized' });
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  // Allow delete if: User owns it OR User is Admin
  if (task.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({ message: 'User not authorized' });
  }

  await task.deleteOne();

  res.status(200).json({ id: req.params.id });
};


module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};