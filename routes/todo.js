const express = require('express');
const router = express.Router();
const todoController = require('@controllers/todoController'); 


// Todo routes
router.get('/', todoController.getTodos);
router.get('/:todo_id', todoController.getTodoById);
router.post('/', todoController.createTodo);
router.put('/:todo_id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
