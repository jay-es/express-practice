const TodoModel = require('../models/todosModel');

/** @type {import('../@types').AsyncRequestHandler} */
exports.getTodos = async (req, res, next) => {
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
};

/** @type {import('../@types').AsyncRequestHandler} */
exports.getTodoById = async (req, res, next) => {
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
};
