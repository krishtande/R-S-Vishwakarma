import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const PageHeader = ({ title, subtitle, image }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={ref} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center justify-center min-h-[40vh]">
      {/* Background Image with Parallax Effect */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 h-[120%] -top-[10%]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})`, filter: 'brightness(0.7)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/50 to-transparent"></div>
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-widest uppercase shadow-lg shadow-black/20">
            R. S. Vishwakarma
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white mb-6 drop-shadow-xl leading-tight">
            {title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 === 1 ? 'text-accent italic font-light' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PageHeader;
