import express from 'express';
import usersController from '../controllers/usersController';

const router = express.Router();

router.get('/', usersController.getUsers);
router.get('/:userId(\\d+)', usersController.getUserById);

export default router;
