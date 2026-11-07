import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['All', 'Residential', 'Commercial', 'Office', 'Hotels', 'Luxury Villas'];

const getRelativeUrl = (url) => {
  if (!url) return '';
  const parts = url.split('/uploads/');
  if (parts.length > 1) {
    return `/uploads/${parts[1]}`;
  }
  return url;
};

const fallbackGallery = [
  { _id: 'g1', category: 'Residential', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', caption: 'Modern Living Room with Custom Oak Paneling' },
  { _id: 'g2', category: 'Residential', imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80', caption: 'Minimalist Bedroom with Teak Wood Details' },
  { _id: 'g3', category: 'Residential', imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80', caption: 'Bespoke Kitchen Cabinets in Walnut Finish' },
  { _id: 'g4', category: 'Commercial', imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80', caption: 'Chic Cafe Interior with Wooden Fixtures' },
  { _id: 'g5', category: 'Commercial', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80', caption: 'High-End Retail Store Displays' },
  { _id: 'g6', category: 'Office', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', caption: 'Corporate Lobby with Architectural Wood Elements' },
  { _id: 'g7', category: 'Hotels', imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80', caption: 'Grand Reception Area with Solid Wood Carvings' },
  { _id: 'g8', category: 'Luxury Villas', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', caption: 'Architectural Sunken Living Room' }
];

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setItems(data.data);
        } else {
          setItems(fallbackGallery);
        }
      } catch (error) {
        console.warn('Failed to fetch gallery items, using fallback', error);
        setItems(fallbackGallery);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <div className="bg-bg min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[500px] bg-gradient-to-bl from-accent/5 to-transparent rounded-bl-full pointer-events-none"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-[50px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-12 h-[1px] bg-accent"></div>
            <h4 className="text-accent font-bold tracking-[0.2em] uppercase text-xl md:text-2xl mb-4 inline-block">Portfolio</h4>
            <div className="w-12 h-[1px] bg-accent"></div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-dark mb-8 leading-[1.1]"
          >
            Our <span className="italic font-light text-primary">Gallery</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed"
          >
            Discover our finest craftsmanship through a curated collection of bespoke interior and architectural projects.
          </motion.p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="pb-8 px-4 md:px-8">
        <div className="container mx-auto flex flex-wrap justify-center gap-3 md:gap-4">
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 text-sm md:text-base border ${
                activeCategory === cat 
                  ? 'bg-dark text-white border-dark shadow-lg shadow-dark/20' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-dark hover:text-dark'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="pb-32 px-4 md:px-8">
        <div className="container mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="h-80 bg-gray-200 animate-pulse rounded-3xl"></div>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <h3 className="text-2xl font-bold text-dark mb-2">No Images Found</h3>
              <p className="text-gray-500">There are no images in the {activeCategory} category yet.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    key={item._id}
                    className="group relative overflow-hidden rounded-3xl cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                  >
                    <img 
                      src={item.imageUrl ? getRelativeUrl(item.imageUrl) : ''} 
                      alt={item.caption || 'Gallery Image'} 
                      className="w-full h-auto min-h-[300px] object-cover transition-transform duration-700 group-hover:scale-105" 
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="inline-block px-3 py-1 bg-accent/20 backdrop-blur-md border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                        {item.category}
                      </div>
                      {item.caption && (
                        <h3 className="text-white text-xl font-heading font-medium drop-shadow-md">
                          {item.caption}
                        </h3>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
