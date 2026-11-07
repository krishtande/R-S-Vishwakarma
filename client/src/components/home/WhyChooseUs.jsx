import { motion } from 'framer-motion';
import { Users, Gem, Clock, Shield, Headphones, IndianRupee } from 'lucide-react';

const features = [
  { icon: <Users size={32} />, title: 'Skilled Team', desc: 'Master artisans and experienced engineers.' },
  { icon: <Gem size={32} />, title: 'Premium Material', desc: 'Sourced from the finest suppliers globally.' },
  { icon: <Clock size={32} />, title: 'On-time Delivery', desc: 'Strict adherence to project timelines.' },
  { icon: <Shield size={32} />, title: 'Warranty', desc: 'Comprehensive coverage for peace of mind.' },
  { icon: <Headphones size={32} />, title: 'After Sales Support', desc: 'Dedicated team for maintenance.' },
  { icon: <IndianRupee size={32} />, title: 'Transparent Pricing', desc: 'No hidden costs, clear quotations.' }
];

const WhyChooseUs = () => {
  return (
    <section className="py-28 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h4 className="text-accent font-bold tracking-[0.2em] uppercase text-xl md:text-2xl mb-4 inline-block">The RS Vishwakarma Advantage</h4>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-dark mb-6">
              Why <span className="italic font-light text-primary">Choose Us?</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 font-light max-w-xl">
              We don't just build spaces; we craft legacies. Our commitment to excellence, transparency, and superior craftsmanship makes us the preferred choice for premium interior projects.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 items-start group">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-colors duration-300 text-dark border border-gray-100">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark mb-1 group-hover:text-accent transition-colors duration-300">{feature.title}</h3>
                    <p className="text-sm text-gray-500 leading-snug">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-square lg:aspect-auto lg:h-[600px]">
              <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80" alt="Why Choose Us" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-dark/60 via-transparent to-transparent"></div>
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white max-w-[250px]"
              >
                <div className="flex items-center gap-4 mb-2">
                  <Shield className="text-accent" size={32} />
                  <span className="text-2xl font-heading font-bold text-dark">100%</span>
                </div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Quality Guaranteed</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
