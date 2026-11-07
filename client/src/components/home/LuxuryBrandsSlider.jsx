import { motion } from 'framer-motion';

const brands = [
  "Century Plywood",
  "Greenply",
  "Action Tesa",
  "Merino Laminates",
  "Advance Laminates",
  "Century Veneer",
  "Virgo PVC",
  "Alstone WPC",
  "Greenlam",
  "Hafele Hardware",
  "Hettich",
  "Blum"
];

const LuxuryBrandsSlider = () => {
  return (
    <section className="py-20 bg-dark text-white border-y border-gray-800 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-10 text-center">
        <h4 className="text-accent font-bold tracking-[0.2em] uppercase text-xl md:text-2xl mb-4 inline-block">Our Trusted Partners</h4>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
          Premium Materials from <span className="italic text-accent">Top Brands</span>
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradient Masks */}
        <div className="absolute top-0 left-0 w-24 md:w-36 h-full bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 md:w-36 h-full bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none"></div>

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap w-max"
        >
          {/* Duplicated list to create infinite marquee */}
          {[...brands, ...brands].map((brand, index) => (
            <div 
              key={index} 
              className="px-8 md:px-14 flex items-center justify-center opacity-65 hover:opacity-100 transition-opacity duration-300"
            >
              <span className="font-heading tracking-widest uppercase text-xl md:text-2xl font-semibold border-b border-white/10 pb-1">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LuxuryBrandsSlider;
