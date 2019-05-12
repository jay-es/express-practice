const express = require('express');
const TodoModel = require('../models/todosModel');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const conds = {};

  if (req.query.userId) {
    conds.userId = Number(req.query.userId);
  }

  if (req.query.completed) {
    conds.completed = !!Number(req.query.completed);
  }

  const todos = await TodoModel
    .find(conds, null, { sort: 'id' })
    .exec();

  res.render('todos', {
    todos,
  });
});

router.get('/:todoId(\\d+)', async (req, res, next) => {
  const todoId = Number(req.params.todoId);
  const todo = await TodoModel
    .findOne({ id: todoId })
    .exec();

  if (!todo) {
    next({ message: 'No ToDo Found' });
    return;
  }

  res.render('todos', {
    todos: [todo],
  });
});

module.exports = router;
