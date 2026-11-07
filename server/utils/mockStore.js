// In-memory mock store used when MongoDB is not locally running
// This ensures all APIs respond in < 2ms with full rich data

export const mockCategories = [
    {
        _id: 'cat_1',
        name: 'Chairs & Seating',
        description: 'Comfortable and stylish chairs for home and office.',
        image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=500&q=60'
    },
    {
        _id: 'cat_2',
        name: 'Tables & Desks',
        description: 'Dining tables, study desks, and coffee tables.',
        image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=500&q=60'
    },
    {
        _id: 'cat_3',
        name: 'Sofas & Couches',
        description: 'Luxurious sofas for your living room.',
        image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=500&q=60'
    },
    {
        _id: 'cat_4',
        name: 'Beds & Wardrobes',
        description: 'Bedroom furniture including beds and spacious wardrobes.',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=500&q=60'
    },
    {
        _id: 'cat_5',
        name: 'Storage & Cabinets',
        description: 'Smart storage solutions and cabinets.',
        image: 'https://images.unsplash.com/photo-1595514535415-05527a052e4f?auto=format&fit=crop&w=500&q=60'
    },
    {
        _id: 'cat_6',
        name: 'Hardware & Fittings',
        description: 'Screws, hinges, handles, and other furniture hardware.',
        image: 'https://images.unsplash.com/photo-1586864387789-628af9feed72?auto=format&fit=crop&w=500&q=60'
    }
];

export const mockProducts = [
    {
        _id: 'prod_1',
        name: 'The Royal Teak Sofa',
        material: 'Premium Teak Wood, Velvet Upholstery',
        description: 'A masterpiece of classic design, this 3-seater sofa features hand-carved teak wood detailing and plush velvet seating. Perfect for adding a touch of royalty to any living room.',
        price: 85000,
        stock: 5,
        dimensions: '84" W x 36" D x 40" H',
        images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'],
        featured: true,
        category: mockCategories[2]
    },
    {
        _id: 'prod_2',
        name: 'Minimalist Oak Dining Set',
        material: 'Solid Oak Wood',
        description: 'A stunning 6-seater dining table with sleek, modern lines. Crafted from sustainably sourced solid oak, offering both durability and timeless elegance.',
        price: 110000,
        stock: 3,
        dimensions: '72" L x 36" W x 30" H',
        images: ['https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80'],
        featured: true,
        category: mockCategories[1]
    },
    {
        _id: 'prod_3',
        name: 'Executive Walnut Desk',
        material: 'Walnut Veneer, Solid Wood Frame',
        description: 'Command attention with this commanding executive desk. Features built-in cable management and soft-close drawers for a clutter-free workspace.',
        price: 65000,
        stock: 8,
        dimensions: '60" W x 30" D x 30" H',
        images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80'],
        featured: false,
        category: mockCategories[1]
    },
    {
        _id: 'prod_4',
        name: 'Hand-Carved Accent Chair',
        material: 'Rosewood, Linen',
        description: 'An exquisite accent chair featuring traditional Indian floral carvings. A perfect conversation starter for your foyer or reading nook.',
        price: 28000,
        stock: 12,
        dimensions: '28" W x 30" D x 42" H',
        images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'],
        featured: true,
        category: mockCategories[0]
    },
    {
        _id: 'prod_5',
        name: 'Modern Platform Bed',
        material: 'Mahogany, Leather Headboard',
        description: 'A luxurious king-size platform bed with a tufted genuine leather headboard and integrated floating nightstands.',
        price: 145000,
        stock: 2,
        dimensions: '82" W x 86" L x 48" H',
        images: ['https://images.unsplash.com/photo-1617806118233-18e1c0945594?auto=format&fit=crop&w=1200&q=80'],
        featured: true,
        category: mockCategories[3]
    },
    {
        _id: 'prod_6',
        name: 'Rustic Bookshelf & Display',
        material: 'Sheesham Wood, Matte Black Iron',
        description: 'An open-concept 5-tier bookshelf blending warm Sheesham wood with an industrial iron frame. Sturdy and elegant.',
        price: 42000,
        stock: 6,
        dimensions: '48" W x 16" D x 74" H',
        images: ['https://images.unsplash.com/photo-1595514535415-05527a052e4f?auto=format&fit=crop&w=1200&q=80'],
        featured: false,
        category: mockCategories[4]
    },
    {
        _id: 'prod_7',
        name: 'Custom Modular Wardrobe',
        material: 'Marine Grade Plywood, Acrylic Finish',
        description: 'Floor-to-ceiling modular wardrobe system with soft-close hinges, glass display drawers, and concealed LED strip lighting.',
        price: 185000,
        stock: 4,
        dimensions: '96" W x 24" D x 108" H',
        images: ['https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80'],
        featured: true,
        category: mockCategories[3]
    },
    {
        _id: 'prod_8',
        name: 'Artisan Coffee Table',
        material: 'Live Edge Acacia Wood, Brass Accents',
        description: 'Naturally sculpted live-edge slab of acacia wood polished to perfection with hairline brass inlays.',
        price: 36000,
        stock: 7,
        dimensions: '48" L x 28" W x 18" H',
        images: ['https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1200&q=80'],
        featured: true,
        category: mockCategories[1]
    }
];

export const mockProjects = [
    {
        _id: 'proj_1',
        title: 'Modern Luxury Villa',
        description: 'Complete interior woodwork including a custom floating staircase, walk-in wardrobes, and a magnificent teak dining table for a 10,000 sq ft luxury villa.',
        clientName: 'Singhania Family',
        location: 'Mumbai, Maharashtra',
        images: [
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
        ],
        featured: true,
        completionDate: '2025-11-15'
    },
    {
        _id: 'proj_2',
        title: 'Corporate HQ Boardroom',
        description: 'Designed and installed a massive 20-seater conference table with integrated tech ports, along with acoustic wood paneling.',
        clientName: 'Apex Capital',
        location: 'Pune, Maharashtra',
        images: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80'
        ],
        featured: true,
        completionDate: '2025-08-20'
    },
    {
        _id: 'proj_3',
        title: 'Boutique Hotel Lobby',
        description: 'Statement reception desk crafted from reclaimed wood, paired with custom lounge seating that defines the hotel\'s rustic-luxury aesthetic.',
        clientName: 'The Palm Grove Hotel',
        location: 'Goa',
        images: [
            'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
        ],
        featured: true,
        completionDate: '2026-01-10'
    },
    {
        _id: 'proj_4',
        title: 'Heritage Home Restoration',
        description: 'Carefully restored 100-year-old carved wooden doors and pillars, maintaining historical integrity while adding modern durability.',
        clientName: 'Rathore Heritage',
        location: 'Jaipur, Rajasthan',
        images: [
            'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80'
        ],
        featured: true,
        completionDate: '2026-03-01'
    },
    {
        _id: 'proj_5',
        title: 'High-End Retail Store',
        description: 'Custom display cabinets with built-in lighting and a striking cash wrap counter for a luxury watch boutique.',
        clientName: 'Chrono Lux Boutique',
        location: 'Delhi',
        images: [
            'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1200&q=80'
        ],
        featured: false,
        completionDate: '2025-10-05'
    },
    {
        _id: 'proj_6',
        title: 'Minimalist Penthouse',
        description: 'Space-saving built-in modular furniture with a seamless, handle-less design in matte oak finish.',
        clientName: 'Ananya & Neil',
        location: 'Bangalore, Karnataka',
        images: [
            'https://images.unsplash.com/photo-1502672260266-1c1c24240f58?auto=format&fit=crop&w=1200&q=80'
        ],
        featured: true,
        completionDate: '2026-02-14'
    }
];

export const mockTestimonials = [
    {
        _id: 'testi_1',
        clientName: 'Aarav Singhania',
        role: 'Homeowner, Mumbai',
        rating: 5,
        content: 'The craftsmanship is absolutely unparalleled. They transformed our bare apartment into a luxurious haven. Every piece of furniture tells a story of dedication and precision.'
    },
    {
        _id: 'testi_2',
        clientName: 'Nisha Desai',
        role: 'Interior Designer',
        rating: 5,
        content: 'As a designer, I am extremely particular about finishes and proportions. R.S. Vishwakarma & Company didn\'t just meet my expectations; they exceeded them. Their bespoke woodwork is world-class.'
    },
    {
        _id: 'testi_3',
        clientName: 'Vikram Mehta',
        role: 'Corporate Director',
        rating: 5,
        content: 'We hired them for our executive boardrooms. The premium teak tables and custom wall paneling completely elevated the professional ambiance of our workspace. Flawless execution.'
    },
    {
        _id: 'testi_4',
        clientName: 'Priya Sharma',
        role: 'Boutique Hotel Owner',
        rating: 5,
        content: 'Their attention to detail is what sets them apart. From the magnificent reception desk to the intricate lounge seating, everything was tailored perfectly to our luxury theme.'
    }
];

export const mockGallery = [
    {
        _id: 'gal_1',
        category: 'Residential',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Modern Living Room with Custom Oak Paneling'
    },
    {
        _id: 'gal_2',
        category: 'Residential',
        imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        caption: 'Minimalist Bedroom with Teak Wood Details'
    },
    {
        _id: 'gal_3',
        category: 'Residential',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Bespoke Kitchen Cabinets in Walnut Finish'
    },
    {
        _id: 'gal_4',
        category: 'Commercial',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Chic Cafe Interior with Wooden Fixtures'
    },
    {
        _id: 'gal_5',
        category: 'Commercial',
        imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
        caption: 'High-End Retail Store Displays'
    },
    {
        _id: 'gal_6',
        category: 'Office',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Corporate Lobby with Architectural Wood Elements'
    },
    {
        _id: 'gal_7',
        category: 'Hotels',
        imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        caption: 'Grand Reception Area with Solid Wood Carvings'
    },
    {
        _id: 'gal_8',
        category: 'Luxury Villas',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Architectural Sunken Living Room'
    }
];

export const mockTransformations = [
    {
        _id: 'trans_1',
        title: 'Penthouse Living Space',
        beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
        afterImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
        isActive: true
    }
];

export const mockBlogs = [
    {
        _id: 'blog_1',
        title: 'The Art of Choosing the Right Wood: Teak vs Oak vs Sheesham',
        slug: 'art-of-choosing-right-wood',
        author: 'R.S. Vishwakarma',
        readTime: '5 min read',
        createdAt: '2026-02-15T10:00:00.000Z',
        image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80',
        excerpt: 'Discover the distinct qualities, grains, and durability profiles of popular hardwoods used in bespoke furniture.',
        content: `Wood is the foundational soul of any architectural interior. Choosing the right wood species determines not only the visual elegance of your space, but its longevity over generations.

### 1. Burma Teak Wood
Teak is renowned globally for its exceptional natural oil content, making it virtually impervious to termites and moisture. For high-humidity zones like kitchens, bathrooms, and outdoor verandas, nothing rivals solid Teak.

### 2. European White Oak
Oak features tight, striking grain patterns and remarkable density. If your aesthetic tilts towards minimalist Scandinavian or contemporary Japandi designs, Oak provides clean, neutral warmth.

### 3. Indian Sheesham (Rosewood)
Prized for its dramatic dark and golden grain contrasts, Sheesham is deeply embedded in royal Indian woodworking. It is robust, heavy, and perfect for heirloom statement dining tables and beds.`
    },
    {
        _id: 'blog_2',
        title: 'Modern Modular Kitchens: Combining Plywood Strength with Acrylic Polish',
        slug: 'modern-modular-kitchens-guide',
        author: 'Amit Kumar',
        readTime: '4 min read',
        createdAt: '2026-03-01T10:00:00.000Z',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
        excerpt: 'How modern material engineering creates high-moisture resistant kitchens with glass-like reflective surfaces.',
        content: `A kitchen is the heart of every home. In modern architectural design, the ideal kitchen combines structural resilience with ultra-sleek maintenance.

### Core Material: BWP Marine Grade Plywood
Always ensure Boiling Water Proof (BWP IS:710) grade plywood is used for the carcass. It resists steam, heat, and accidental spills without delaminating.

### Surface Treatment: High-Gloss Acrylic
Acrylic sheets provide an opulent, mirror-like gloss that expands visual space and wipes clean effortlessly with a microfiber cloth.`
    }
];

export const mockMessages = [];
export const mockEmployees = [
    { _id: 'emp_1', name: 'R.S. Vishwakarma', phone: '+91 8808728154' },
    { _id: 'emp_2', name: 'Amit Kumar', phone: '+91 9925482498' }
];

