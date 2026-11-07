import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/User.js';

// Load env vars
dotenv.config();

// Connect to DB
await connectDB();

const seedAdmin = async () => {
    try {
        // Check if admin already exists
        const adminExists = await User.findOne({ email: 'admin@rsvishwakarma.com' });

        if (adminExists) {
            console.log('Admin user already exists.');
            process.exit(0);
        }

        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@rsvishwakarma.com',
            password: 'admin123',
            role: 'admin'
        });

        console.log(`Admin User Created Successfully!`);
        console.log(`Email: admin@rsvishwakarma.com`);
        console.log(`Password: admin123`);
        
        process.exit();
    } catch (error) {
        console.error('Error seeding admin user:', error);
        process.exit(1);
    }
};

seedAdmin();
