import Testimonial from '../models/Testimonial.js';
import { isDbConnected } from '../config/db.js';
import { mockTestimonials } from '../utils/mockStore.js';

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = async (req, res) => {
    try {
        if (!isDbConnected()) {
            return res.json({ success: true, data: mockTestimonials });
        }
        const testimonials = await Testimonial.find({});
        res.json({ success: true, data: testimonials });
    } catch (error) {
        res.json({ success: true, data: mockTestimonials });
    }
};

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
export const createTestimonial = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const newT = { _id: 'testi_' + Date.now(), ...req.body };
            mockTestimonials.unshift(newT);
            return res.status(201).json({ success: true, data: newT });
        }
        const { clientName, role, content, rating, image } = req.body;
        const testimonial = await Testimonial.create({ 
            clientName, role, content, rating, image 
        });
        res.status(201).json({ success: true, data: testimonial });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
export const deleteTestimonial = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const idx = mockTestimonials.findIndex(t => t._id === req.params.id);
            if (idx !== -1) {
                mockTestimonials.splice(idx, 1);
                return res.json({ success: true, message: 'Testimonial removed' });
            }
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
        const testimonial = await Testimonial.findById(req.params.id);
        if (testimonial) {
            await testimonial.deleteOne();
            res.json({ success: true, message: 'Testimonial removed' });
        } else {
            res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
export const updateTestimonial = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const idx = mockTestimonials.findIndex(t => t._id === req.params.id);
            if (idx !== -1) {
                mockTestimonials[idx] = { ...mockTestimonials[idx], ...req.body };
                return res.json({ success: true, data: mockTestimonials[idx] });
            }
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
        const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (testimonial) {
            res.json({ success: true, data: testimonial });
        } else {
            res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
