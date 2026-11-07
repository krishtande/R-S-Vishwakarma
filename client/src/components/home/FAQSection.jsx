import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { question: "Do you handle complete custom interior projects?", answer: "Yes, we handle everything from 2D/3D design, civil work, electrical, plumbing, to final furniture manufacturing and installation." },
  { question: "Are the materials used premium quality?", answer: "Absolutely. We source our timber, hardware, and fabrics from the best global suppliers. Every piece comes with a quality guarantee." },
  { question: "How long does a typical project take?", answer: "Depending on the scale, a modular kitchen might take 3-4 weeks, whereas a complete luxury villa interior can take 3-6 months. We always stick to the agreed timeline." },
  { question: "Do you offer after-sales service and warranty?", answer: "Yes! All our custom furniture and interior works come with a comprehensive warranty and dedicated after-sales support." },
  { question: "Can I get a custom 3D design before manufacturing?", answer: "Yes, our in-house interior designers create highly realistic 3D renders so you know exactly what your space will look like before execution begins." }
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-28 bg-white relative">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="text-center mb-16">
          <h4 className="text-accent font-bold tracking-[0.2em] uppercase text-xl md:text-2xl mb-4 inline-block">FAQ</h4>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark">
            Frequently Asked <span className="italic font-light text-primary">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-2xl overflow-hidden bg-bg"
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className={`w-full px-8 py-6 flex justify-between items-center text-left transition-all duration-300 ${activeIndex === index ? 'bg-primary/5 border-l-4 border-primary' : 'hover:bg-gray-50 border-l-4 border-transparent'}`}
              >
                <span className={`font-bold text-lg pr-8 transition-colors ${activeIndex === index ? 'text-primary' : 'text-dark'}`}>{faq.question}</span>
                <ChevronDown 
                  className={`flex-shrink-0 transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-primary' : 'text-accent'}`} 
                  size={24} 
                />
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 pt-2 text-gray-500 leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
