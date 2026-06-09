const express = require('express');

const { createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    toggleTaskStatus 
} = require('../controllers/task.controller.js');

const router = express.Router();

router.post('/', createTask);

router.get('/', getTasks);

router.get('/:id', getTaskById);

router.put('/:id', updateTask); 

router.delete('/:id', deleteTask);

router.patch('/:id/toggle', toggleTaskStatus);


module.exports = router;