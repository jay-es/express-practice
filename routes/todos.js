const express = require('express');
const todosController = require('../controllers/todos');

const router = express.Router();

router.get('/', todosController.getTodos);
router.get('/:todoId(\\d+)', todosController.getTodoById);

module.exports = router;
