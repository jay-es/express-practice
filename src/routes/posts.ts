import express from 'express';
import postsController from '../controllers/postsController';

const router = express.Router();

router.get('/', postsController.getPosts);
router.get('/:postId(\\d+)', postsController.getPostById);

export default router;
