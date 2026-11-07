import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, MapPin, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        try {
          const res = await fetch(`/api/products?keyword=${searchQuery}&pageSize=5`);
          const data = await res.json();
          if (data.success) {
            setSuggestions(data.data);
            setShowSuggestions(true);
          }
        } catch (error) {
          console.error("Failed to fetch suggestions");
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };
    
    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 150); // Reduced debounce for faster suggestions
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${searchQuery}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };
  
  const isHome = location.pathname === '/';
  const isSolid = !isHome || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isSolid ? 'bg-white/70 backdrop-blur-xl shadow-lg shadow-gray-200/20 py-4 border-b border-white/50' : 'bg-gradient-to-b from-dark/60 to-transparent py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className={`font-heading font-bold flex items-center gap-2 transition-colors duration-300 ${isSolid ? 'text-primary' : 'text-white drop-shadow-md'}`}>
          <span className="text-xl sm:text-2xl md:text-3xl tracking-tight">R. S. Vishwakarma & Co.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className={`font-medium relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full transition-colors ${isSolid ? 'text-text hover:text-primary after:bg-primary' : 'text-white hover:text-white after:bg-accent drop-shadow-md'}`}>
              {link.name}
            </Link>
          ))}
          <div className="flex items-center relative">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.form 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  onSubmit={handleSearchSubmit}
                  className="mr-2"
                >
                  <input 
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full px-4 py-1.5 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary ${isSolid ? 'bg-gray-100 text-dark' : 'bg-white/20 text-white placeholder-white/70 backdrop-blur-sm'}`}
                    autoFocus
                    autoComplete="off"
                    name="searchQueryInput"
                  />
                </motion.form>
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`transition-colors ${isSolid ? 'text-text hover:text-primary' : 'text-white hover:text-accent drop-shadow-md'} p-1`}
            >
              <Search size={20} />
            </button>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-4 right-0 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                >
                  {searchQuery.trim().length > 0 && (
                    <>
                      {suggestions.length > 0 ? (
                        <>
                          {suggestions.map(product => (
                            <div 
                              key={product._id} 
                              onClick={() => {
                                navigate(`/products?keyword=${product.name}`);
                                setIsSearchOpen(false);
                                setShowSuggestions(false);
                                setSearchQuery('');
                              }}
                              className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors"
                            >
                              {product.images && product.images[0] ? (
                                <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0"></div>
                              )}
                              <div>
                                <p className="text-sm font-bold text-dark line-clamp-1">{product.name}</p>
                                <p className="text-xs text-primary font-medium">₹{product.price?.toLocaleString()}</p>
                              </div>
                            </div>
                          ))}
                          <div 
                            onClick={handleSearchSubmit}
                            className="p-3 text-center text-sm text-gray-500 font-medium hover:bg-gray-50 hover:text-primary cursor-pointer transition-colors bg-gray-50/50 border-b border-gray-100"
                          >
                            View all results for "{searchQuery}"
                          </div>
                        </>
                      ) : (
                        <div className="p-4 text-center text-sm text-gray-500 border-b border-gray-100">No products found</div>
                      )}
                    </>
                  )}
                  
                  {/* Contact Info always shows when search is open */}
                  <div className="p-5 bg-white">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Contact</p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <a href="https://www.google.com/maps/search/?api=1&query=B11+bhulabhai+park+3,+Mansarovar+road,+ioc+road,+chandkheda,+Ahmedabad+382424" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-600 hover:text-primary transition-colors leading-relaxed">
                          B11 bhulabhai park 3, Mansarovar road, ioc road, chandkheda, Ahmedabad 382424
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone size={16} className="text-accent flex-shrink-0" />
                        <div className="flex flex-col gap-1">
                          <a href="tel:+918808728154" className="text-sm text-gray-600 hover:text-primary transition-colors font-medium">+91 8808728154</a>
                          <a href="tel:+919925482498" className="text-sm text-gray-600 hover:text-primary transition-colors font-medium">+91 9925482498</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail size={16} className="text-accent flex-shrink-0" />
                        <a href="mailto:Rsvishwakarmacompany@gmail.com" className="text-sm text-gray-600 hover:text-primary transition-colors font-medium">Rsvishwakarmacompany@gmail.com</a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <MagneticButton>
            <Link to="/quote" className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 block ${isSolid ? 'bg-primary text-white hover:bg-dark shadow-primary/20' : 'bg-white text-dark hover:bg-accent hover:text-white shadow-black/20'}`}>
              Get Quote
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <button className={`md:hidden focus:outline-none transition-colors ${isSolid ? 'text-text' : 'text-white drop-shadow-md'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-2xl border-t border-gray-100 overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col px-6 py-5 gap-4">
              {/* Mobile Search Input */}
              <form onSubmit={(e) => { handleSearchSubmit(e); setIsOpen(false); }} className="relative w-full">
                <input 
                  type="text"
                  placeholder="Search furniture (e.g. Sofa, Bed)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 text-sm rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                  autoComplete="off"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </form>

              {/* Quick Categories */}
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Popular Collections</p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: '🛋️ Sofas', kw: 'sofa' },
                    { label: '🛏️ Beds', kw: 'bed' },
                    { label: '🍳 Kitchens', kw: 'kitchen' },
                    { label: '💼 Office', kw: 'office' },
                    { label: '🍽️ Dining', kw: 'dining' }
                  ].map((cat) => (
                    <button
                      key={cat.kw}
                      type="button"
                      onClick={() => {
                        navigate(`/products?keyword=${cat.kw}`);
                        setIsOpen(false);
                      }}
                      className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-colors text-gray-700"
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              <div className="border-t border-gray-100 pt-2 space-y-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link 
                      key={link.name} 
                      to={link.path} 
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between text-base font-semibold py-2.5 px-3 rounded-xl transition-colors ${
                        isActive ? 'bg-primary/10 text-primary' : 'text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-primary"></span>}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Quick Action Buttons */}
              <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+918808728154"
                    className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 px-3 rounded-xl text-xs font-bold transition-colors"
                  >
                    <Phone size={14} /> Call Now
                  </a>
                  <a
                    href={`https://wa.me/918808728154?text=${encodeURIComponent('Hello R.S. Vishwakarma & Company! I want to discuss a project.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-[#1da851] py-2.5 px-3 rounded-xl text-xs font-bold transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#25D366]"></span> WhatsApp
                  </a>
                </div>

                <Link 
                  to="/quote" 
                  onClick={() => setIsOpen(false)} 
                  className="block bg-primary text-white text-center py-3 rounded-xl text-sm font-bold shadow-md shadow-primary/20 hover:bg-dark transition-colors"
                >
                  Request Free Estimate
                </Link>
              </div>

              {/* Location Tag */}
              <div className="bg-gray-50 rounded-xl p-3 text-[11px] text-gray-500 flex items-start gap-2">
                <MapPin size={14} className="text-accent mt-0.5 shrink-0" />
                <span>Ahmedabad & Zundal Workshop | Serving Gujarat & across India</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

