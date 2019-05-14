import express from 'express';
import indexController from '../controllers/index';

const router = express.Router();

/* GET home page. */
router.get('/', indexController.getIndex);

export default router;
