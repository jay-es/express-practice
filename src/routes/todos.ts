import express from 'express';
import todosController from '../controllers/todosController';

const router = express.Router();

router.get('/', todosController.getTodos);
router.get('/:todoId(\\d+)', todosController.getTodoById);

export default router;
