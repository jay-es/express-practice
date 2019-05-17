import express from 'express';
import postsController from '../controllers/postsController';

const router = express.Router();

router.get('/', postsController.getPosts);
router.get('/:postId(\\d+)', postsController.getPostById);
router.post('/:postId(\\d+)/comment', postsController.postCommentByPostId);

export default router;
