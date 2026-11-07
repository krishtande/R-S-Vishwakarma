import express from 'express';
import { getTransformations, addTransformation, deleteTransformation } from '../controllers/transformationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getTransformations)
    .post(protect, admin, addTransformation);

router.route('/:id')
    .delete(protect, admin, deleteTransformation);

export default router;
