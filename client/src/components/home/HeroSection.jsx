import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import { useRef } from 'react';

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={ref} className="relative min-h-[92vh] md:h-screen flex items-center justify-center pt-24 pb-16 md:py-20 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Architecture"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark/95 backdrop-blur-[2px]"></div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 text-center text-white mt-4 sm:mt-8">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-4 sm:mb-6 max-w-5xl mx-auto leading-tight drop-shadow-2xl text-[#F5EFE6]"
        >
          Crafting Timeless <span className="text-accent italic">Masterpieces</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-sm sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-10 max-w-3xl mx-auto drop-shadow-lg font-light tracking-wide px-2"
        >
          From bespoke custom furniture to complete architectural and interior construction. We build timeless spaces with precision and elegance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center mb-10 sm:mb-16 max-w-sm sm:max-w-none mx-auto"
        >
          <MagneticButton>
            <Link to="/projects" className="group bg-accent text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium hover:bg-white hover:text-dark transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden text-sm sm:text-base w-full sm:w-auto">
              <span className="relative z-10 flex items-center gap-2">Explore Projects <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" /></span>
              <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link to="/quote" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium hover:bg-white hover:text-dark transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center text-sm sm:text-base w-full sm:w-auto">
              Get Free Estimate
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Animated Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto border-t border-white/10 pt-6 sm:pt-8"
        >
          {[
            { value: "500+", label: "Projects Completed" },
            { value: "62+", label: "Skilled Artisans" },
            { value: "20+", label: "Years Experience" },
            { value: "100%", label: "Client Satisfaction" }
          ].map((stat, index) => (
            <div key={index} className="text-center group bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-2xl border border-white/10">
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-heading text-accent mb-1 group-hover:scale-105 transition-transform duration-500">{stat.value}</h3>
              <p className="text-[11px] sm:text-xs md:text-base text-gray-300 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
