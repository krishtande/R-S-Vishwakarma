import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import TiltCard from '../components/ui/TiltCard';

const getRelativeUrl = (url) => {
  if (!url) return '';
  const parts = url.split('/uploads/');
  if (parts.length > 1) {
    return `/uploads/${parts[1]}`;
  }
  return url;
};

const fallbackProjects = [
  {
    _id: 'p1',
    title: 'Modern Luxury Villa',
    description: 'Complete interior woodwork including a custom floating staircase, walk-in wardrobes, and a magnificent teak dining table for a 10,000 sq ft luxury villa.',
    location: 'Mumbai, Maharashtra',
    images: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'],
    span: true // For masonry layout spanning
  },
  {
    _id: 'p2',
    title: 'Corporate HQ Boardroom',
    description: 'Designed and installed a massive 20-seater conference table with integrated tech ports, along with acoustic wood paneling.',
    location: 'Pune, Maharashtra',
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: 'p3',
    title: 'Boutique Hotel Lobby',
    description: 'Statement reception desk crafted from reclaimed wood, paired with custom lounge seating that defines the hotel\'s rustic-luxury aesthetic.',
    location: 'Goa',
    images: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: 'p4',
    title: 'Heritage Home Restoration',
    description: 'Carefully restored 100-year-old carved wooden doors and pillars, maintaining historical integrity while adding modern durability.',
    location: 'Jaipur, Rajasthan',
    images: ['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80'],
    span: true
  },
  {
    _id: 'p5',
    title: 'High-End Retail Store',
    description: 'Custom display cabinets with built-in lighting and a striking cash wrap counter for a luxury watch boutique.',
    location: 'Delhi',
    images: ['https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: 'p6',
    title: 'Minimalist Apartment',
    description: 'Space-saving built-in modular furniture with a seamless, handle-less design in matte oak finish.',
    location: 'Bangalore, Karnataka',
    images: ['https://images.unsplash.com/photo-1502672260266-1c1c24240f58?auto=format&fit=crop&w=800&q=80']
  }
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setProjects(data.data);
        } else {
          setProjects(fallbackProjects);
        }
      } catch (error) {
        console.error('Failed to fetch projects', error);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setImageLoaded(false);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedProject && selectedProject.images) {
      setImageLoaded(false);
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedProject && selectedProject.images) {
      setImageLoaded(false);
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
    }
  };

  return (
    <div className="bg-bg min-h-screen">
      {/* Header */}
      <section className="pt-28 pb-14 sm:pt-32 sm:pb-24 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-[50%] h-[500px] bg-gradient-to-bl from-accent/5 to-transparent rounded-bl-full pointer-events-none"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-[50px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6"
          >
            <div className="w-8 sm:w-12 h-[1px] bg-accent"></div>
            <h4 className="text-accent font-bold tracking-[0.2em] uppercase text-xs sm:text-base md:text-xl">Portfolio</h4>
            <div className="w-8 sm:w-12 h-[1px] bg-accent"></div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-dark mb-4 sm:mb-8 leading-tight"
          >
            Architectural <br/><span className="italic font-light text-primary">Masterpieces</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm sm:text-base md:text-xl max-w-3xl mx-auto font-light leading-relaxed"
          >
            Explore our curated gallery of premium residential and commercial spaces, where our custom woodwork takes center stage.
          </motion.p>
        </div>
      </section>

      {/* Editorial Masonry Grid */}
      <section className="pb-24 md:pb-32 px-4 md:px-8">
        <div className="container mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-[400px] bg-gray-200 animate-pulse rounded-3xl md:rounded-[3rem]"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 auto-rows-[300px] sm:auto-rows-[400px] md:auto-rows-[500px]">
              {projects.map((project, index) => {
                // Editorial layout spanning: every 3rd item spans full width, others share half
                const isLarge = project.span || (index % 3 === 0);
                
                return (
                  <TiltCard key={project._id} className={`group ${isLarge ? 'md:col-span-12 md:row-span-2' : 'md:col-span-6 md:row-span-1'}`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8 }}
                      onClick={() => openProjectModal(project)}
                      className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-700 w-full h-full"
                    >
                      <div className="absolute inset-0 bg-dark/10 z-10 transition-opacity duration-700 group-hover:bg-dark/50"></div>
                      
                      {project.images && project.images[0] ? (
                        <img 
                          src={getRelativeUrl(project.images[0])} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 font-medium">No Image Available</div>
                      )}

                      {/* Gradient Overlay for Text Readability */}
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700"></div>

                      {/* Content Overlay */}
                      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-16 lg:p-20">
                        <div className="flex items-start justify-between translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                          <div className="max-w-3xl">
                            {project.location && (
                              <div className="inline-flex items-center gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="w-8 h-[1px] bg-accent"></div>
                                <span className="text-accent uppercase tracking-[0.2em] text-xs font-bold">{project.location}</span>
                              </div>
                            )}
                            
                            <h3 className={`font-heading font-bold text-white mb-4 drop-shadow-lg ${isLarge ? 'text-4xl md:text-6xl lg:text-7xl' : 'text-3xl md:text-4xl'}`}>
                              {project.title}
                            </h3>
                            
                            {/* Reveal Description on Hover */}
                            <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                              <p className={`text-gray-200 font-light leading-relaxed ${isLarge ? 'text-lg md:text-xl max-w-2xl' : 'text-base max-w-md'}`}>
                                {project.description}
                              </p>
                            </div>
                          </div>
                          
                          <div className="hidden md:flex w-16 h-16 rounded-full bg-white text-dark items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-8 group-hover:translate-x-0 transition-all duration-500 shrink-0 shadow-2xl hover:bg-accent hover:text-white border border-transparent hover:border-white">
                            <ArrowRight size={24} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </TiltCard>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && createPortal(
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
          onClick={closeProjectModal}
        >
          <button 
            onClick={closeProjectModal}
            className="absolute top-6 right-6 z-[110] text-white/50 hover:text-white bg-black/50 hover:bg-white/10 rounded-full p-2 transition-all"
          >
            <X size={32} />
          </button>
          
          <div 
            className="w-full max-w-6xl max-h-screen flex flex-col items-center justify-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            
            {selectedProject.images && selectedProject.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 md:-left-12 z-40 text-white/50 hover:text-white bg-black/50 hover:bg-white/10 rounded-full p-3 transition-all"
                >
                  <ChevronLeft size={32} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 md:-right-12 z-40 text-white/50 hover:text-white bg-black/50 hover:bg-white/10 rounded-full p-3 transition-all"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <div className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center mb-6 bg-dark/40 rounded-xl overflow-hidden">
              {!imageLoaded && (
                <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm animate-pulse">Loading Image...</span>
              )}
              <img 
                src={selectedProject.images && selectedProject.images.length > 0 ? getRelativeUrl(selectedProject.images[currentImageIndex]) : ''} 
                alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                className={`relative z-10 w-full h-full object-contain rounded-xl shadow-2xl transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ WebkitUserDrag: 'none' }}
                onLoad={() => setImageLoaded(true)}
              />
              
              {selectedProject.images && selectedProject.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium">
                  {currentImageIndex + 1} / {selectedProject.images.length}
                </div>
              )}
            </div>
            
            <div className="text-center w-full max-w-3xl px-4">
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-white mb-2 sm:mb-4">{selectedProject.title}</h3>
              {selectedProject.location && (
                <p className="text-accent uppercase tracking-widest text-xs sm:text-sm font-bold mb-3">{selectedProject.location}</p>
              )}
              <p className="text-gray-300 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-6">
                {selectedProject.description}
              </p>
              
              <div className="flex justify-center">
                <a
                  href={`https://wa.me/918808728154?text=${encodeURIComponent(`Hello! I saw your project "${selectedProject.title}" on your website and would like to consult with you for similar interior/furniture work.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-xl transition-all"
                >
                  <MessageCircle size={16} /> Discuss Similar Project on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Projects;
