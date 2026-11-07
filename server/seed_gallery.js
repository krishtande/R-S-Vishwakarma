import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Gallery from './models/Gallery.js';

dotenv.config();

await connectDB();

const galleryItems = [
  // Residential
  {
    category: 'Residential',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    caption: 'Modern Living Room with Custom Oak Paneling'
  },
  {
    category: 'Residential',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    caption: 'Minimalist Bedroom with Teak Wood Details'
  },
  {
    category: 'Residential',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    caption: 'Bespoke Kitchen Cabinets in Walnut Finish'
  },
  {
    category: 'Residential',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    caption: 'Cozy Dining Space with Reclaimed Wood Table'
  },
  
  // Commercial
  {
    category: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    caption: 'Chic Cafe Interior with Wooden Fixtures'
  },
  {
    category: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    caption: 'High-End Retail Store Displays'
  },
  {
    category: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Corporate Lobby with Architectural Wood Elements'
  },
  {
    category: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    caption: 'Modern Showroom with Custom Furniture'
  },

  // Office
  {
    category: 'Office',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    caption: 'Executive Office Setup with Mahogany Desk' // Using a varied URL or descriptive caption
  },
  {
    category: 'Office',
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    caption: 'Open Plan Office with Ergonomic Wooden Workstations'
  },
  {
    category: 'Office',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    caption: 'Collaborative Space with Tiered Wooden Seating'
  },
  {
    category: 'Office',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Modern Boardroom with 20-Seater Custom Table'
  },

  // Hotels
  {
    category: 'Hotels',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    caption: 'Boutique Hotel Lobby Reception'
  },
  {
    category: 'Hotels',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    caption: 'Luxury Suite with Integrated Wood Paneling'
  },
  {
    category: 'Hotels',
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
    caption: 'Resort Lounge with Teak Furniture'
  },
  {
    category: 'Hotels',
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    caption: 'Hotel Dining Area with Custom Wood Ceilings'
  },

  // Luxury Villas
  {
    category: 'Luxury Villas',
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    caption: 'Sprawling Villa Living Area with Exposed Beams'
  },
  {
    category: 'Luxury Villas',
    imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80',
    caption: 'Grand Entrance with Solid Oak Doors'
  },
  {
    category: 'Luxury Villas',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    caption: 'Private Cinema Room with Acoustic Wood Paneling'
  },
  {
    category: 'Luxury Villas',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Outdoor Pool Deck with Premium Teak Loungers'
  }
];

const seedGallery = async () => {
  try {
    await Gallery.deleteMany();
    await Gallery.insertMany(galleryItems);
    console.log('Gallery seeded successfully with 20 items!');
    process.exit();
  } catch (error) {
    console.error('Error seeding gallery:', error);
    process.exit(1);
  }
};

seedGallery();
