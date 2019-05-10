const express = require('express');

const router = express.Router();
const todosModel = require('../models/todosModel');

router.get('/', (req, res, next) => {
  let todos;

  if (req.query.userId) {
    const userId = Number(req.query.userId);
    todos = todosModel.getByUserId(userId);
  } else {
    todos = todosModel.getAll();
  }

  if (req.query.completed) {
    const completed = !!Number(req.query.completed);
    todos = todos.filter(v => v.completed === completed);
  }

  res.render('todos', {
    todos,
  });
});

router.get('/:todoId(\\d+)', (req, res, next) => {
  const todoId = Number(req.params.todoId);
  const todo = todosModel.findById(todoId);

  if (!todo) {
    next({ message: 'No ToDo Found' });
    return;
  }

  res.render('todos', {
    todos: [todo],
  });
});

module.exports = router;
