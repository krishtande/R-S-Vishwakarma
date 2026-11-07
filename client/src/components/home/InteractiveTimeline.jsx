import { motion } from 'framer-motion';

const timelineSteps = [
  { id: 1, title: 'Inquiry', desc: 'Reach out with your vision' },
  { id: 2, title: 'Site Visit', desc: 'We inspect and measure' },
  { id: 3, title: 'Quotation', desc: 'Transparent cost estimation' },
  { id: 4, title: '3D Design', desc: 'Visualizing your space' },
  { id: 5, title: 'Material Selection', desc: 'Choosing premium finishes' },
  { id: 6, title: 'Manufacturing', desc: 'Precision crafting' },
  { id: 7, title: 'Installation', desc: 'Flawless execution on site' },
  { id: 8, title: 'Final Handover', desc: 'Welcome to your new space' }
];

const InteractiveTimeline = () => {
  return (
    <section className="py-28 bg-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <h4 className="text-accent font-bold tracking-[0.2em] uppercase text-xl md:text-2xl mb-4 inline-block">Our Process</h4>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white drop-shadow-md">
            From Concept to <span className="italic text-accent">Completion</span>
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8 relative">
            {timelineSteps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-full bg-dark border-2 border-accent text-accent flex items-center justify-center font-bold text-lg mb-6 relative z-10 group-hover:bg-accent group-hover:text-dark transition-colors duration-300">
                  {step.id}
                </div>
                <h3 className="text-xl font-heading font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-gray-400 text-sm max-w-[200px]">{step.desc}</p>
                
                {/* Connector line for all but the last item in desktop, and all but last in every second item for mobile */}
                {index < timelineSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-[2px] bg-white/20 group-hover:bg-accent/50 transition-colors duration-300"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTimeline;
