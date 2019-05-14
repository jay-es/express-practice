import express from 'express';
import todosController from '../controllers/todos';

const router = express.Router();

router.get('/', todosController.getTodos);
router.get('/:todoId(\\d+)', todosController.getTodoById);

export default router;
