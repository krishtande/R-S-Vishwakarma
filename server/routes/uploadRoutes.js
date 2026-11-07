import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

import fs from 'fs';

router.post('/', protect, admin, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image uploaded' });
        }

        const backendUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';
        
        res.json({
            success: true,
            url: `${backendUrl}/uploads/${req.file.filename}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Image upload failed' });
    }
});

router.post('/multiple', protect, admin, upload.array('images', 20), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No images uploaded' });
        }

        const backendUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

        const urls = req.files.map(file => {
            return `${backendUrl}/uploads/${file.filename}`;
        });

        res.json({
            success: true,
            urls: urls
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Multiple images upload failed' });
    }
});

export default router;
