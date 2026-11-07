import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Search, Filter, X, Eye, SlidersHorizontal } from 'lucide-react';
import TiltCard from '../components/ui/TiltCard';

const getRelativeUrl = (url) => {
  if (!url) return '';
  const parts = url.split('/uploads/');
  if (parts.length > 1) {
    return `/uploads/${parts[1]}`;
  }
  return url;
};

const fallbackCategories = [
  { _id: 'cat_1', name: 'Chairs & Seating' },
  { _id: 'cat_2', name: 'Tables & Desks' },
  { _id: 'cat_3', name: 'Sofas & Couches' },
  { _id: 'cat_4', name: 'Beds & Wardrobes' },
  { _id: 'cat_5', name: 'Storage & Cabinets' }
];

const fallbackProducts = [
  {
    _id: 'prod_1',
    name: 'The Royal Teak Sofa',
    material: 'Premium Teak Wood, Velvet Upholstery',
    description: 'A masterpiece of classic design, this 3-seater sofa features hand-carved teak wood detailing and plush velvet seating.',
    price: 85000,
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'],
    category: { _id: 'cat_3', name: 'Sofas & Couches' }
  },
  {
    _id: 'prod_2',
    name: 'Minimalist Oak Dining Set',
    material: 'Solid Oak Wood',
    description: 'A stunning 6-seater dining table with sleek, modern lines. Crafted from sustainably sourced solid oak.',
    price: 110000,
    images: ['https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80'],
    category: { _id: 'cat_2', name: 'Tables & Desks' }
  },
  {
    _id: 'prod_3',
    name: 'Executive Walnut Desk',
    material: 'Walnut Veneer, Solid Wood Frame',
    description: 'Command attention with this commanding executive desk. Features built-in cable management and soft-close drawers.',
    price: 65000,
    images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80'],
    category: { _id: 'cat_2', name: 'Tables & Desks' }
  },
  {
    _id: 'prod_4',
    name: 'Hand-Carved Accent Chair',
    material: 'Rosewood, Linen',
    description: 'An exquisite accent chair featuring traditional floral carvings. A perfect statement piece.',
    price: 28000,
    images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'],
    category: { _id: 'cat_1', name: 'Chairs & Seating' }
  },
  {
    _id: 'prod_5',
    name: 'Modern Platform Bed',
    material: 'Mahogany, Leather Headboard',
    description: 'A luxurious king-size platform bed with a tufted genuine leather headboard and integrated nightstands.',
    price: 145000,
    images: ['https://images.unsplash.com/photo-1617806118233-18e1c0945594?auto=format&fit=crop&w=1200&q=80'],
    category: { _id: 'cat_4', name: 'Beds & Wardrobes' }
  },
  {
    _id: 'prod_6',
    name: 'Custom Modular Wardrobe',
    material: 'Marine Grade Plywood, Acrylic Finish',
    description: 'Floor-to-ceiling modular wardrobe system with soft-close hinges, glass display drawers, and concealed LED strip lighting.',
    price: 185000,
    images: ['https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80'],
    category: { _id: 'cat_4', name: 'Beds & Wardrobes' }
  }
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters & Pagination
  const [searchParams, setSearchParams] = useSearchParams();
  const initialKeyword = searchParams.get('keyword') || '';
  const [keyword, setKeyword] = useState(initialKeyword);
  const [searchInput, setSearchInput] = useState(initialKeyword);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');
  const [appliedMinPrice, setAppliedMinPrice] = useState('');
  const [appliedMaxPrice, setAppliedMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    // Fetch categories for the filter
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setCategories(data.data);
        } else {
          setCategories(fallbackCategories);
        }
      } catch (error) {
        console.warn('Failed to fetch categories, using fallback', error);
        setCategories(fallbackCategories);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const urlKeyword = searchParams.get('keyword') || '';
    setKeyword(urlKeyword);
    setSearchInput(urlKeyword);
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          pageNumber: page,
          pageSize: 9,
          ...(keyword && { keyword }),
          ...(selectedCategory && { category: selectedCategory }),
          ...(appliedMinPrice && { minPrice: appliedMinPrice }),
          ...(appliedMaxPrice && { maxPrice: appliedMaxPrice })
        });
        
        const res = await fetch(`/api/products?${queryParams}`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setProducts(data.data);
          setTotalPages(data.pages || 1);
        } else if (!keyword && !selectedCategory && !appliedMinPrice && !appliedMaxPrice) {
          setProducts(fallbackProducts);
          setTotalPages(1);
        } else {
          setProducts(data.data || []);
          setTotalPages(data.pages || 1);
        }
      } catch (error) {
        console.warn('Failed to fetch products, using fallback', error);
        if (!keyword && !selectedCategory) {
          setProducts(fallbackProducts);
        } else {
          setProducts([]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword, selectedCategory, page, appliedMinPrice, appliedMaxPrice]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchInput !== keyword) {
        setKeyword(searchInput);
        setSearchParams(searchInput ? { keyword: searchInput } : {});
        setPage(1);
      }
    }, 400); // 400ms debounce
    return () => clearTimeout(timeoutId);
  }, [searchInput, keyword, setSearchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(searchInput);
    setSearchParams(searchInput ? { keyword: searchInput } : {});
    setPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setPage(1);
  };

  const handleApplyFilters = () => {
    setAppliedMinPrice(minPriceInput);
    setAppliedMaxPrice(maxPriceInput);
    setPage(1);
  };

  return (
    <div className="pt-24 pb-16 bg-bg min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-4">Our Collection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Browse through our extensively curated collections of premium furniture designed to elevate your living spaces.</p>
        </div>

        {/* Search & Filter Bar - Sticky Glassmorphism */}
        <div className="bg-white/70 backdrop-blur-2xl p-4 md:p-6 rounded-3xl shadow-xl shadow-primary/5 border border-white/60 mb-12 sticky top-24 z-30 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            <form onSubmit={handleSearch} className="relative w-full md:w-1/2">
              <input 
                type="text"
                placeholder="Search premium furniture..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/50 border border-white focus:bg-white focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all shadow-sm"
                autoComplete="off"
                name="mainSearchInput"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-dark text-white px-6 py-2 rounded-xl text-sm font-bold tracking-wide hover:bg-accent hover:shadow-lg hover:shadow-accent/30 transition-all duration-300">
                Search
              </button>
            </form>

            <div className="flex items-center gap-4 w-full md:w-auto flex-1 justify-end">
              <div className="relative w-full md:w-64">
                <select 
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full appearance-none pl-12 pr-8 py-4 rounded-2xl bg-white/50 border border-white focus:bg-white focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all shadow-sm font-medium text-dark cursor-pointer"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
                <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-center shrink-0 ${showFilters ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20' : 'bg-white/50 border-white text-gray-600 hover:bg-white hover:text-dark'}`}
                title="Advanced Filters"
              >
                <SlidersHorizontal size={20} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-2 border-t border-gray-100 flex flex-wrap gap-4 items-end">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Min Price (₹)</label>
                    <input 
                      type="number"
                      value={minPriceInput}
                      onChange={(e) => setMinPriceInput(e.target.value)}
                      placeholder="0"
                      className="w-32 px-4 py-3 rounded-xl bg-white/50 border border-white focus:bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Max Price (₹)</label>
                    <input 
                      type="number"
                      value={maxPriceInput}
                      onChange={(e) => setMaxPriceInput(e.target.value)}
                      placeholder="Any"
                      className="w-32 px-4 py-3 rounded-xl bg-white/50 border border-white focus:bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all shadow-sm"
                    />
                  </div>
                  <button 
                    onClick={handleApplyFilters}
                    className="px-6 py-3 bg-dark text-white rounded-xl font-bold tracking-wide hover:bg-accent transition-all shadow-sm"
                  >
                    Apply Filter
                  </button>
                  {(appliedMinPrice || appliedMaxPrice) && (
                    <button 
                      onClick={() => {
                        setMinPriceInput('');
                        setMaxPriceInput('');
                        setAppliedMinPrice('');
                        setAppliedMaxPrice('');
                        setPage(1);
                      }}
                      className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold tracking-wide hover:bg-gray-200 transition-all shadow-sm"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: item * 0.1 }}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="bg-gray-200 h-64 rounded-lg mb-4 animate-pulse flex items-center justify-center text-gray-400">
                  Loading...
                </div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              </motion.div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <ShoppingBag className="mx-auto text-gray-300 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-dark mb-2">No Products Found</h2>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {products.map((product, index) => (
                  <TiltCard key={product._id} className="h-full">
                    <motion.div 
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                      whileHover={{ y: -8 }}
                      className="group relative bg-bg rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-white hover:border-accent/20 flex flex-col h-full"
                    >
                      <div className="relative h-[380px] overflow-hidden">
                        {product.images && product.images[0] ? (
                          <img src={getRelativeUrl(product.images[0])} alt={product.name} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium bg-gray-100">No Image</div>
                        )}
                        
                        {/* Premium Glass Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-end pb-12 gap-4">
                          <Link to={`/quote?product=${encodeURIComponent(product.name)}`} className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 bg-white text-dark font-bold tracking-widest uppercase text-xs px-8 py-3 rounded-full hover:bg-accent hover:text-white shadow-xl">
                            Request Quote
                          </Link>
                          <button onClick={() => setQuickViewProduct(product)} className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75 bg-transparent border border-white/50 text-white font-bold tracking-widest uppercase text-xs px-8 py-3 rounded-full hover:bg-white/20 hover:border-white backdrop-blur-sm" title="Quick View">
                            Quick View
                          </button>
                        </div>

                        {product.category && (
                          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-dark shadow-lg border border-white/50 uppercase tracking-widest">
                            {product.category.name || 'Furniture'}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-8 flex flex-col flex-grow relative bg-white">
                        <h3 className="text-2xl font-heading font-bold text-dark mb-3 leading-snug group-hover:text-primary transition-colors duration-300 truncate">{product.name}</h3>
                        <p className="text-gray-500 text-sm mb-8 line-clamp-2 flex-grow leading-relaxed font-light">{product.description}</p>
                        
                        <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-100">
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-[0.2em] font-bold mb-1">Starting at</p>
                            <p className="text-dark font-heading font-bold text-2xl">₹{product.price?.toLocaleString() || 0}</p>
                          </div>
                          <button onClick={() => setQuickViewProduct(product)} className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 text-gray-400 group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm">
                            <Eye size={20} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </TiltCard>
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <span className="font-medium text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Quick View Modal */}
      {createPortal(
        <AnimatePresence>
          {quickViewProduct && (
            <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-4 sm:p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-dark/70 backdrop-blur-sm"
                onClick={() => setQuickViewProduct(null)}
              ></motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white rounded-none md:rounded-[2rem] shadow-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
              >
                <button 
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-3 bg-white/50 backdrop-blur-md hover:bg-white text-dark rounded-full shadow-sm transition-all border border-white/50"
                >
                  <X size={20} />
                </button>
                
                <div className="w-full md:w-1/2 bg-gray-50 h-64 md:h-auto shrink-0 relative overflow-hidden group">
                  <span className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm animate-pulse z-0">Loading...</span>
                  {quickViewProduct.images && quickViewProduct.images[0] ? (
                    <img src={getRelativeUrl(quickViewProduct.images[0])} alt={quickViewProduct.name} className="relative z-10 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  ) : (
                    <div className="relative z-10 w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 font-medium">No Image Available</div>
                  )}
                  {quickViewProduct.category && (
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-dark uppercase tracking-[0.2em] shadow-lg border border-white/50">
                      {quickViewProduct.category.name || 'Furniture'}
                    </div>
                  )}
                </div>
                
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col overflow-y-auto bg-white">
                  <div className="mb-8">
                    <h2 className="text-4xl lg:text-5xl font-heading font-bold text-dark mb-4 leading-tight">{quickViewProduct.name}</h2>
                    <p className="text-3xl font-heading font-bold text-accent">₹{quickViewProduct.price?.toLocaleString() || 0}</p>
                  </div>
                  
                  <div className="prose prose-lg text-gray-500 mb-10 max-w-none font-light leading-relaxed">
                    <p>{quickViewProduct.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                    {quickViewProduct.dimensions && (
                      <div className="border-b border-gray-100 pb-4">
                        <span className="block text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-2 flex items-center gap-2">
                          <SlidersHorizontal size={14} /> Dimensions
                        </span>
                        <span className="text-dark font-medium">{quickViewProduct.dimensions}</span>
                      </div>
                    )}
                    {quickViewProduct.materials && quickViewProduct.materials.length > 0 && (
                      <div className="border-b border-gray-100 pb-4">
                        <span className="block text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">Materials</span>
                        <span className="text-dark font-medium">{quickViewProduct.materials.join(', ')}</span>
                      </div>
                    )}
                    <div className="border-b border-gray-100 pb-4">
                      <span className="block text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">Availability</span>
                      <span className={`font-bold flex items-center gap-2 ${quickViewProduct.stock > 0 ? 'text-primary' : 'text-accent'}`}>
                        <span className={`w-2 h-2 rounded-full ${quickViewProduct.stock > 0 ? 'bg-primary animate-pulse' : 'bg-accent'}`}></span>
                        {quickViewProduct.stock > 0 ? 'In Stock & Ready' : 'Made to Order'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-6 flex gap-4">
                    <Link 
                      to={`/quote?product=${encodeURIComponent(quickViewProduct.name)}`} 
                      className="flex-1 bg-dark text-white text-center py-5 rounded-full font-bold tracking-[0.2em] uppercase text-sm hover:bg-accent transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-accent/20 border border-transparent hover:border-white/20 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Request a Quote <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default Products;
