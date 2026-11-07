import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { isDbConnected } from '../config/db.js';

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkey_rsvishwakarma');

            if (!isDbConnected() && decoded.id === 'mock_admin_1') {
                req.user = { _id: 'mock_admin_1', name: 'Super Admin', role: 'admin' };
                return next();
            }

            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user && !isDbConnected()) {
                req.user = { _id: decoded.id, name: 'Admin', role: 'admin' };
            }

            next();
        } catch (error) {
            console.error('Auth error:', error.message);
            res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ success: false, message: 'Not authorized as an admin' });
    }
};

export { protect, admin };
