import Gallery from '../models/Gallery.js';
import { isDbConnected } from '../config/db.js';
import { mockGallery } from '../utils/mockStore.js';

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
export const getGalleryItems = async (req, res) => {
    try {
        if (!isDbConnected()) {
            return res.json({ success: true, data: mockGallery });
        }
        const galleryItems = await Gallery.find({}).sort({ createdAt: -1 });
        res.json({ success: true, data: galleryItems });
    } catch (error) {
        res.json({ success: true, data: mockGallery });
    }
};

// @desc    Add a gallery item
// @route   POST /api/gallery
// @access  Private/Admin
export const addGalleryItem = async (req, res) => {
    try {
        const { imageUrl, caption, category } = req.body;
        if (!imageUrl || !category) {
            return res.status(400).json({ success: false, message: 'Image URL and category are required' });
        }

        if (!isDbConnected()) {
            const newItem = { _id: 'gal_' + Date.now(), imageUrl, caption, category };
            mockGallery.unshift(newItem);
            return res.status(201).json({ success: true, data: newItem });
        }

        const galleryItem = await Gallery.create({ imageUrl, caption, category });
        res.status(201).json({ success: true, data: galleryItem });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add gallery item' });
    }
};

// @desc    Delete a gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteGalleryItem = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const idx = mockGallery.findIndex(g => g._id === req.params.id);
            if (idx !== -1) {
                mockGallery.splice(idx, 1);
                return res.json({ success: true, message: 'Gallery item removed' });
            }
            return res.status(404).json({ success: false, message: 'Gallery item not found' });
        }

        const galleryItem = await Gallery.findById(req.params.id);
        if (!galleryItem) {
            return res.status(404).json({ success: false, message: 'Gallery item not found' });
        }

        await galleryItem.deleteOne();
        res.json({ success: true, message: 'Gallery item removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete gallery item' });
    }
};
