import Category from '../models/Category.js';
import { isDbConnected } from '../config/db.js';
import { mockCategories } from '../utils/mockStore.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
    try {
        if (!isDbConnected()) {
            return res.json({ success: true, data: mockCategories });
        }
        const categories = await Category.find({});
        res.json({ success: true, data: categories });
    } catch (error) {
        res.json({ success: true, data: mockCategories });
    }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        if (!isDbConnected()) {
            const newCat = { _id: 'cat_' + Date.now(), name, description, image };
            mockCategories.push(newCat);
            return res.status(201).json({ success: true, data: newCat });
        }
        const category = await Category.create({ name, description, image });
        res.status(201).json({ success: true, data: category });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const idx = mockCategories.findIndex(c => c._id === req.params.id);
            if (idx !== -1) {
                mockCategories.splice(idx, 1);
                return res.json({ success: true, message: 'Category removed' });
            }
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        const category = await Category.findById(req.params.id);
        if (category) {
            await category.deleteOne();
            res.json({ success: true, message: 'Category removed' });
        } else {
            res.status(404).json({ success: false, message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const cat = mockCategories.find(c => c._id === req.params.id);
            if (cat) {
                if (req.body.name) cat.name = req.body.name;
                if (req.body.description) cat.description = req.body.description;
                if (req.body.image) cat.image = req.body.image;
                return res.json({ success: true, data: cat });
            }
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        const category = await Category.findById(req.params.id);
        if (category) {
            category.name = req.body.name || category.name;
            category.description = req.body.description || category.description;
            category.image = req.body.image || category.image;

            const updatedCategory = await category.save();
            res.json({ success: true, data: updatedCategory });
        } else {
            res.status(404).json({ success: false, message: 'Category not found' });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
