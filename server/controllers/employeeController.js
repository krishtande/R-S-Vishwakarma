import Employee from '../models/Employee.js';
import { isDbConnected } from '../config/db.js';
import { mockEmployees } from '../utils/mockStore.js';

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private/Admin
export const getEmployees = async (req, res) => {
    try {
        if (!isDbConnected()) {
            return res.json(mockEmployees);
        }
        const employees = await Employee.find({}).sort({ createdAt: -1 });
        res.json(employees);
    } catch (error) {
        res.json(mockEmployees);
    }
};

// @desc    Add a new employee
// @route   POST /api/employees
// @access  Private/Admin
export const addEmployee = async (req, res) => {
    try {
        const { name, phone } = req.body;
        if (!name || !phone) {
            return res.status(400).json({ success: false, message: 'Please provide name and phone number' });
        }

        if (!isDbConnected()) {
            const newEmp = { _id: 'emp_' + Date.now(), name, phone };
            mockEmployees.push(newEmp);
            return res.status(201).json({ success: true, data: newEmp });
        }

        const employee = await Employee.create({ name, phone });
        res.status(201).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add employee' });
    }
};

// @desc    Delete an employee
// @route   DELETE /api/employees/:id
// @access  Private/Admin
export const deleteEmployee = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const idx = mockEmployees.findIndex(e => e._id === req.params.id);
            if (idx !== -1) {
                mockEmployees.splice(idx, 1);
                return res.json({ success: true, message: 'Employee removed' });
            }
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        await employee.deleteOne();
        res.json({ success: true, message: 'Employee removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete employee' });
    }
};
