import express from 'express';
import { getEmployees, addEmployee, deleteEmployee } from '../controllers/employeeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, admin, getEmployees)
    .post(protect, admin, addEmployee);

router.route('/:id')
    .delete(protect, admin, deleteEmployee);

export default router;
