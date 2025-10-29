const express = require('express');
const router = express.Router();
const todoController = require('@controllers/todoController'); 

// GET /api/users 
//router.get('/', todoController.getAllUsers); 

// POST /api/users 
//router.post('/', todoController.createUser);

// PUT /api/todos/:id 
//router.put('/:id', todoController.updateUser);

// DELETE /api/todos/:id 
//router.delete('/:id', todoController.deleteUser);

// Todo routes
router.get('/', todoController.getTodos);
router.get('/:id', todoController.getTodoById);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
