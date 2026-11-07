import express from 'express';
import { getGalleryItems, addGalleryItem, deleteGalleryItem } from '../controllers/galleryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getGalleryItems)
    .post(protect, admin, addGalleryItem);

router.route('/:id')
    .delete(protect, admin, deleteGalleryItem);

export default router;
