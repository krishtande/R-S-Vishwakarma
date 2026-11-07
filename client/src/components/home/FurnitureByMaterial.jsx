import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const materials = [
  { id: 'plywood', name: 'Plywood Furniture', desc: 'Durable, versatile, and structurally superior for long-lasting interiors.', icon: '🪵', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80' },
  { id: 'solidwood', name: 'Solid Wood Furniture', desc: 'Timeless elegance and unmatched strength with premium teak and oak.', icon: '🪚', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&q=80' },
  { id: 'pvc', name: 'PVC Furniture', desc: '100% waterproof and termite-proof, perfect for wet areas.', icon: '🟩', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80' },
  { id: 'mdf-hdhmr', name: 'MDF & HDHMR Furniture', desc: 'Smooth finish for intricate designs, combined with highly moisture-resistant engineered wood for durability.', icon: '🟨', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80' }
];

const FurnitureByMaterial = () => {
  const [activeMaterial, setActiveMaterial] = useState(materials[0]);

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left: Interactive List */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <h4 className="text-accent font-bold tracking-[0.2em] uppercase text-xl md:text-2xl mb-4 inline-block">Core Materials</h4>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-10">
              Furniture by <span className="italic font-light text-primary">Material</span>
            </h2>
            
            <div className="flex flex-col gap-2">
              {materials.map((mat) => (
                <button
                  key={mat.id}
                  onMouseEnter={() => setActiveMaterial(mat)}
                  onClick={() => setActiveMaterial(mat)}
                  className={`flex items-center justify-between p-5 rounded-2xl transition-all duration-300 ${
                    activeMaterial.id === mat.id 
                      ? 'bg-primary text-white shadow-xl translate-x-2' 
                      : 'bg-bg hover:bg-gray-100 text-dark hover:translate-x-1'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{mat.icon}</span>
                    <span className="font-bold text-lg">{mat.name}</span>
                  </div>
                  {activeMaterial.id === mat.id && (
                    <ArrowRight size={20} className="text-accent animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Dynamic Display */}
          <div className="lg:w-2/3 relative min-h-[500px] lg:min-h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMaterial.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img 
                  src={activeMaterial.image} 
                  alt={activeMaterial.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-10 md:p-14">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 border border-accent/50 text-accent font-bold text-xs uppercase tracking-widest mb-4 backdrop-blur-md">
                      Featured Material
                    </span>
                    <h3 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                      {activeMaterial.name}
                    </h3>
                    <p className="text-gray-300 text-lg max-w-xl mb-8 font-light">
                      {activeMaterial.desc}
                    </p>
                    <Link 
                      to={`/projects?material=${activeMaterial.id}`}
                      className="inline-flex items-center gap-3 bg-white text-dark px-8 py-4 rounded-full font-bold hover:bg-accent hover:text-white transition-all duration-300 shadow-lg"
                    >
                      View {activeMaterial.name} Projects <ArrowRight size={18} />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FurnitureByMaterial;
