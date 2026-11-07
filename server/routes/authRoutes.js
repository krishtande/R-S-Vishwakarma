import express from 'express';
import { authUser, setupAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/setup', setupAdmin); // Temporary route for setting up initial admin

export default router;
