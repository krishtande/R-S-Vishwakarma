import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, CheckCircle, Clock } from 'lucide-react';

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const stats = [
    { icon: <Clock size={32} />, value: "20+", label: "Years Experience" },
    { icon: <CheckCircle size={32} />, value: "1500+", label: "Projects Completed" },
    { icon: <Users size={32} />, value: "50+", label: "Master Craftsmen" },
    { icon: <Award size={32} />, value: "100%", label: "Client Satisfaction" },
  ];

  return (
    <div className="bg-bg min-h-screen overflow-hidden">
      {/* Parallax Header */}
      <section ref={containerRef} className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-dark/60 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=2000&q=80" 
            alt="Woodworking" 
            className="w-full h-[120%] object-cover -mt-20"
          />
        </motion.div>
        
        <motion.div 
          style={{ opacity }}
          className="relative z-20 text-center px-6 mt-16"
        >
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-accent font-bold tracking-[0.3em] uppercase text-sm mb-4"
          >
            Since 2005
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-4 sm:mb-6 drop-shadow-lg"
          >
            Our Legacy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 text-sm sm:text-lg md:text-2xl max-w-2xl mx-auto font-light px-2"
          >
            Where traditional craftsmanship meets contemporary design to create masterpieces for your spaces.
          </motion.p>
        </motion.div>
      </section>

      {/* The Story Section */}
      <section className="py-16 md:py-24 relative z-30 bg-bg">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[80px] -z-10"></div>
              <div className="aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[3rem] shadow-2xl relative">
                <img 
                  src="/master_quality.png" 
                  alt="Craftsmanship" 
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div 
                style={{ y: y2 }}
                className="absolute -bottom-12 -right-6 md:-right-12 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 max-w-xs hidden sm:block"
              >
                <div className="text-accent mb-4">
                  <Award size={40} />
                </div>
                <h4 className="font-heading font-bold text-2xl text-dark mb-2">Master Quality</h4>
                <p className="text-gray-500 text-sm">Every piece is thoroughly inspected to ensure it meets our exacting standards of luxury.</p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-accent"></div>
                <h4 className="text-accent font-bold tracking-widest uppercase text-2xl md:text-3xl inline-block">Our Heritage</h4>
              </div>
              <h2 className="text-5xl md:text-6xl font-heading font-bold text-white mb-8 leading-tight">
                Forged in Tradition, Built for Tomorrow
              </h2>
              <div className="space-y-6 text-lg text-gray-600 font-light">
                <p>
                  Founded on the principles of integrity, quality, and timeless design, R. S. Vishwakarma & Company has grown from a small artisan workshop to a premier furniture brand. 
                </p>
                <p>
                  Our master carpenters have honed their skills over decades, passing down techniques that simply cannot be replicated by machines. We believe that furniture is not just functional—it's an expression of your personality and the soul of your space.
                </p>
                <p>
                  We source only sustainable, high-grade timber. Every cut, joint, and polish is executed with meticulous attention to detail, ensuring that the furniture you buy today will be an heirloom tomorrow.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 order-2 md:order-2"
            >
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl group relative">
                <div className="absolute inset-0 bg-accent/20 mix-blend-overlay z-10"></div>
                <img 
                  src="/craftsmanship.png" 
                  alt="Fine Craftsmanship" 
                  className="w-full h-[400px] lg:h-[550px] object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-1/2 order-1 md:order-1"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-accent"></div>
                <h4 className="text-accent font-bold tracking-widest uppercase text-2xl md:text-3xl inline-block">The Art of Wood</h4>
              </div>
              <h2 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                Uncompromising Craftsmanship
              </h2>
              <p className="text-gray-600 text-lg font-light leading-relaxed mb-6">
                Our artisans bring decades of experience to every piece they create. We believe that true luxury lies in the details—the perfect joint, the seamless finish, and the careful selection of premium materials.
              </p>
              <p className="text-gray-600 text-lg font-light leading-relaxed">
                Every curve is shaped by hand, every surface sanded to perfection. This is not mass production; this is the art of woodworking at its absolute finest, ensuring durability that spans generations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-6 backdrop-blur-sm border border-accent/30">
                  {stat.icon}
                </div>
                <h3 className="text-4xl md:text-5xl font-heading font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-400 font-medium tracking-wide uppercase text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-24 bg-bg">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h4 className="text-accent font-bold tracking-widest uppercase text-2xl md:text-3xl inline-block mb-4">Behind The Scenes</h4>
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-white">The Workshop</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 aspect-[16/9] md:aspect-auto md:h-96 rounded-3xl overflow-hidden relative group"
            >
              <img src="https://images.unsplash.com/photo-1590494165264-1ebe3602eb80?auto=format&fit=crop&w=1200&q=80" alt="Woodworking" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="aspect-square md:h-96 rounded-3xl overflow-hidden relative group"
            >
              <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80" alt="Tools" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="aspect-square md:h-80 rounded-3xl overflow-hidden relative group"
            >
              <img src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=800&q=80" alt="Design" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 aspect-[16/9] md:aspect-auto md:h-80 rounded-3xl overflow-hidden relative group"
            >
              <img src="https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&q=80" alt="Finished Product" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
