const express = require('express');

const { createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    toggleTaskStatus 
} = require('../controllers/task.controller.js');

const authMiddleware = require('../middleware/auth.middleware.js');

const router = express.Router();

router.post('/', authMiddleware, createTask);

router.get('/', authMiddleware, getTasks);

router.get('/:id', authMiddleware, getTaskById);

router.put('/:id', authMiddleware, updateTask); 

router.delete('/:id', authMiddleware, deleteTask);

router.patch('/:id/toggle', authMiddleware, toggleTaskStatus);


module.exports = router;