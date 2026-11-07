import Transformation from '../models/Transformation.js';
import { isDbConnected } from '../config/db.js';
import { mockTransformations } from '../utils/mockStore.js';

// @desc    Get all transformations
// @route   GET /api/transformations
// @access  Public
export const getTransformations = async (req, res) => {
    try {
        if (!isDbConnected()) {
            return res.json({ success: true, data: mockTransformations });
        }
        const transformations = await Transformation.find({}).sort({ createdAt: -1 });
        res.json({ success: true, data: transformations });
    } catch (error) {
        res.json({ success: true, data: mockTransformations });
    }
};

// @desc    Add a transformation
// @route   POST /api/transformations
// @access  Private/Admin
export const addTransformation = async (req, res) => {
    try {
        const { title, beforeImage, afterImage } = req.body;
        if (!title || !beforeImage || !afterImage) {
            return res.status(400).json({ success: false, message: 'Title, before image, and after image are required' });
        }

        if (!isDbConnected()) {
            const newT = { _id: 'trans_' + Date.now(), title, beforeImage, afterImage, isActive: true };
            mockTransformations.unshift(newT);
            return res.status(201).json({ success: true, data: newT });
        }

        const transformation = await Transformation.create({
            title,
            beforeImage,
            afterImage,
            isActive: true
        });

        res.status(201).json({ success: true, data: transformation });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add transformation' });
    }
};

// @desc    Delete a transformation
// @route   DELETE /api/transformations/:id
// @access  Private/Admin
export const deleteTransformation = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const idx = mockTransformations.findIndex(t => t._id === req.params.id);
            if (idx !== -1) {
                mockTransformations.splice(idx, 1);
                return res.json({ success: true, message: 'Transformation removed' });
            }
            return res.status(404).json({ success: false, message: 'Transformation not found' });
        }

        const transformation = await Transformation.findById(req.params.id);
        if (!transformation) {
            return res.status(404).json({ success: false, message: 'Transformation not found' });
        }

        await transformation.deleteOne();
        res.json({ success: true, message: 'Transformation removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete transformation' });
    }
};
