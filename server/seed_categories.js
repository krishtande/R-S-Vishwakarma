import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';

dotenv.config();

const categories = [
    {
        name: 'Chairs & Seating',
        description: 'Comfortable and stylish chairs for home and office.',
        image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Tables & Desks',
        description: 'Dining tables, study desks, and coffee tables.',
        image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Sofas & Couches',
        description: 'Luxurious sofas for your living room.',
        image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Beds & Wardrobes',
        description: 'Bedroom furniture including beds and spacious wardrobes.',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Storage & Cabinets',
        description: 'Smart storage solutions and cabinets.',
        image: 'https://images.unsplash.com/photo-1595514535415-05527a052e4f?auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Hardware & Fittings',
        description: 'Screws, hinges, handles, and other furniture hardware.',
        image: 'https://images.unsplash.com/photo-1586864387789-628af9feed72?auto=format&fit=crop&w=500&q=60'
    }
];

const seedCategories = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected...');

        // Optional: clear existing categories if needed, but let's just use insertMany and ignore duplicates 
        // by wrapping in try-catch or iterating
        
        for (const cat of categories) {
            const exists = await Category.findOne({ name: cat.name });
            if (!exists) {
                await Category.create(cat);
                console.log(`Added category: ${cat.name}`);
            } else {
                console.log(`Category already exists: ${cat.name}`);
            }
        }
        
        console.log('Categories seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding categories:', error);
        process.exit(1);
    }
};

seedCategories();
