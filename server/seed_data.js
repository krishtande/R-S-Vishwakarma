import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import Project from './models/Project.js';
import Category from './models/Category.js';

// Load env vars
dotenv.config();

// Connect to DB
await connectDB();

const products = [
    {
        name: 'The Royal Teak Sofa',
        material: 'Premium Teak Wood, Velvet Upholstery',
        description: 'A masterpiece of classic design, this 3-seater sofa features hand-carved teak wood detailing and plush velvet seating. Perfect for adding a touch of royalty to any living room.',
        price: 85000,
        stock: 5,
        dimensions: '84" W x 36" D x 40" H',
        images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'],
        featured: true
    },
    {
        name: 'Minimalist Oak Dining Set',
        material: 'Solid Oak Wood',
        description: 'A stunning 6-seater dining table with sleek, modern lines. Crafted from sustainably sourced solid oak, offering both durability and timeless elegance.',
        price: 110000,
        stock: 3,
        dimensions: '72" L x 36" W x 30" H',
        images: ['https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80'],
        featured: true
    },
    {
        name: 'Executive Walnut Desk',
        material: 'Walnut Veneer, Solid Wood Frame',
        description: 'Command attention with this commanding executive desk. Features built-in cable management and soft-close drawers for a clutter-free workspace.',
        price: 65000,
        stock: 8,
        dimensions: '60" W x 30" D x 30" H',
        images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80'],
        featured: false
    },
    {
        name: 'Hand-Carved Accent Chair',
        material: 'Rosewood, Linen',
        description: 'An exquisite accent chair featuring traditional Indian floral carvings. A perfect conversation starter for your foyer or reading nook.',
        price: 28000,
        stock: 12,
        dimensions: '28" W x 30" D x 42" H',
        images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'],
        featured: true
    },
    {
        name: 'Modern Platform Bed',
        material: 'Mahogany, Leather Headboard',
        description: 'A luxurious king-size platform bed with a tufted genuine leather headboard and integrated floating nightstands.',
        price: 145000,
        stock: 2,
        dimensions: 'King Size',
        images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'], // Reused for demo
        featured: true
    },
    {
        name: 'Rustic Coffee Table',
        material: 'Reclaimed Pine Wood',
        description: 'Bring warmth into your living room with this rustic coffee table, crafted from 50-year-old reclaimed pine wood, featuring a natural distressed finish.',
        price: 18000,
        stock: 15,
        dimensions: '48" L x 24" W x 18" H',
        images: ['https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1200&q=80'],
        featured: false
    }
];

const projects = [
    {
        title: 'Modern Luxury Villa in Mumbai',
        category: 'Luxury Villas',
        description: 'Complete interior woodwork including a custom floating staircase, walk-in wardrobes, and a magnificent teak dining table for a 10,000 sq ft luxury villa.',
        clientName: 'The Singhania Residence',
        location: 'Mumbai, Maharashtra',
        images: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'],
        featured: true,
        completionDate: new Date('2023-11-15')
    },
    {
        title: 'Tech Startup HQ Boardroom',
        category: 'Office',
        description: 'Designed and installed a massive 20-seater conference table with integrated tech ports, along with acoustic wood paneling to enhance boardroom acoustics.',
        clientName: 'InnovateTech Solutions',
        location: 'Pune, Maharashtra',
        images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'],
        featured: true,
        completionDate: new Date('2024-02-10')
    },
    {
        title: 'Boutique Seaside Resort',
        category: 'Hotels',
        description: 'Statement reception desk crafted from reclaimed driftwood, paired with custom lounge seating and cabanas that define the hotel\'s rustic-luxury aesthetic.',
        clientName: 'Azure Coast Resort',
        location: 'Goa',
        images: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'],
        featured: true,
        completionDate: new Date('2023-08-05')
    },
    {
        title: 'Heritage Palace Restoration',
        category: 'Commercial',
        description: 'Carefully restored 100-year-old carved wooden doors and courtyard pillars, maintaining historical integrity while treating the wood for modern durability.',
        clientName: 'Department of Tourism',
        location: 'Jaipur, Rajasthan',
        images: ['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80'],
        featured: true,
        completionDate: new Date('2022-12-20')
    }
];

const importData = async () => {
    try {
        // Clear existing data to prevent duplicates
        await Product.deleteMany();
        await Project.deleteMany();
        
        // Fetch a category to link to products
        let category = await Category.findOne();
        
        if (!category) {
            console.log("No categories found! Creating a default 'Furniture' category.");
            category = await Category.create({ name: 'Furniture', description: 'General Furniture' });
        }

        // Add category ID to products
        const productsWithCategory = products.map(p => ({
            ...p,
            category: category._id
        }));

        // Insert Products
        await Product.insertMany(productsWithCategory);
        console.log('Products Imported successfully!');

        // Insert Projects
        await Project.insertMany(projects);
        console.log('Projects Imported successfully!');

        process.exit();
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};

importData();
