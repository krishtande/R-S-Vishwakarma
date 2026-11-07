import Project from '../models/Project.js';
import { isDbConnected } from '../config/db.js';
import { mockProjects } from '../utils/mockStore.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
    try {
        if (!isDbConnected()) {
            return res.json({ success: true, data: mockProjects });
        }
        const projects = await Project.find({});
        res.json({ success: true, data: projects });
    } catch (error) {
        res.json({ success: true, data: mockProjects });
    }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const newProj = { _id: 'proj_' + Date.now(), ...req.body };
            mockProjects.unshift(newProj);
            return res.status(201).json({ success: true, data: newProj });
        }
        const { title, description, clientName, location, images, featured, completionDate } = req.body;
        const project = await Project.create({ 
            title, description, clientName, location, images, featured, completionDate 
        });
        res.status(201).json({ success: true, data: project });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const idx = mockProjects.findIndex(p => p._id === req.params.id);
            if (idx !== -1) {
                mockProjects.splice(idx, 1);
                return res.json({ success: true, message: 'Project removed' });
            }
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        const project = await Project.findById(req.params.id);
        if (project) {
            await project.deleteOne();
            res.json({ success: true, message: 'Project removed' });
        } else {
            res.status(404).json({ success: false, message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const idx = mockProjects.findIndex(p => p._id === req.params.id);
            if (idx !== -1) {
                mockProjects[idx] = { ...mockProjects[idx], ...req.body };
                return res.json({ success: true, data: mockProjects[idx] });
            }
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (project) {
            res.json({ success: true, data: project });
        } else {
            res.status(404).json({ success: false, message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
