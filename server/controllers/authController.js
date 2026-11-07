import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { isDbConnected } from '../config/db.js';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!isDbConnected()) {
            if ((email === 'admin@rsvishwakarma.com' || email === 'admin@gmail.com') && (password === 'password123' || password === 'admin123')) {
                return res.json({
                    success: true,
                    _id: 'mock_admin_1',
                    name: 'Super Admin',
                    email,
                    role: 'admin',
                    token: generateToken('mock_admin_1'),
                });
            }
            return res.status(401).json({ success: false, message: 'Invalid email or password. (Default: admin@rsvishwakarma.com / password123)' });
        }

        const user = await User.findOne({ email }).select('+password');
        if (user && (await user.matchPassword(password))) {
            res.json({
                success: true,
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Register a new admin (temp route for setup)
// @route   POST /api/auth/setup
// @access  Public
export const setupAdmin = async (req, res) => {
    try {
        if (!isDbConnected()) {
            return res.status(201).json({
                success: true,
                message: 'Admin is available in mock mode. Email: admin@rsvishwakarma.com, Password: password123'
            });
        }

        const adminExists = await User.findOne({ email: 'admin@rsvishwakarma.com' });
        if (adminExists) {
            return res.status(400).json({ success: false, message: 'Admin already exists' });
        }
        
        await User.create({
            name: 'Super Admin',
            email: 'admin@rsvishwakarma.com',
            password: 'password123',
            role: 'admin'
        });
        
        res.status(201).json({
            success: true,
            message: 'Admin created successfully. Email: admin@rsvishwakarma.com, Password: password123'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
