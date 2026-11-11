import { motion } from 'framer-motion';
import { Sparkles, Layers, PaintBucket, Droplet, Sun, Moon } from 'lucide-react';

const finishes = [
  { name: 'Laminate Finish', desc: 'Highly durable, scratch-resistant, and available in endless textures.', icon: <Layers size={24} />, image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=80' },
  { name: 'Acrylic Finish', desc: 'Ultra high-gloss, mirror-like reflection for ultra-modern spaces.', icon: <Sparkles size={24} />, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Veneer Finish', desc: 'Authentic natural wood grain texture with premium polish.', icon: <span className="text-2xl">🪵</span>, image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?auto=format&fit=crop&w=800&q=80' },
  { name: 'PU Polish', desc: 'Polyurethane coating for ultimate protection and rich sheen.', icon: <PaintBucket size={24} />, image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80' },
  { name: 'Duco Finish', desc: 'Automotive-grade spray paint for a seamless, opaque colored finish.', icon: <Droplet size={24} />, image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80' },
  { name: 'Matte Finish', desc: 'Non-reflective, velvety smooth surface for understated luxury.', icon: <Moon size={24} />, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80' },
];

const FinishExplorer = () => {
  return (
    <section className="py-28 bg-bg relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h4 className="text-accent font-bold tracking-[0.2em] uppercase text-xl md:text-2xl mb-4 inline-block">Surface Aesthetics</h4>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-6">
            The Finish <span className="italic font-light text-primary">Collection</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
            The right finish dictates the mood of your space. Explore our curated selection of premium surface treatments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {finishes.map((finish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative h-[350px] rounded-3xl overflow-hidden shadow-lg cursor-pointer"
            >
              <img 
                src={finish.image} 
                alt={finish.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent transition-opacity duration-300"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-4 border border-white/30 group-hover:bg-accent group-hover:border-accent transition-colors duration-300">
                  {finish.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{finish.name}</h3>
                <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <p className="text-gray-300 text-sm mt-2">{finish.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinishExplorer;
