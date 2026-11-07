import { motion } from 'framer-motion';
import { Star, ShieldCheck, Droplets, Gem } from 'lucide-react';

const comparisons = [
  { material: 'Plywood', waterproof: 5, strength: 5, premium: 5, desc: 'Top choice for modular kitchens and heavy-duty furniture.' },
  { material: 'MDF', waterproof: 2, strength: 3, premium: 3, desc: 'Great for dry areas and intricate routing/painting work.' },
  { material: 'PVC Board', waterproof: 5, strength: 4, premium: 4, desc: '100% waterproof, best for bathroom vanities.' },
  { material: 'WPC Board', waterproof: 5, strength: 5, premium: 5, desc: 'Wood Polymer Composite. The ultimate weatherproof material.' },
];

const renderStars = (count) => {
  return [...Array(5)].map((_, i) => (
    <Star 
      key={i} 
      size={18} 
      className={`${i < count ? 'text-accent fill-accent' : 'text-gray-300'}`} 
    />
  ));
};

const MaterialComparison = () => {
  return (
    <section className="py-28 bg-white relative">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="text-center mb-16">
          <h4 className="text-accent font-bold tracking-[0.2em] uppercase text-xl md:text-2xl mb-4 inline-block">Make an Informed Choice</h4>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-6">
            Material <span className="italic font-light text-primary">Comparison</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed max-w-xl mx-auto font-light">
            Understanding the core of your furniture ensures it lasts a lifetime. Compare the most popular materials used in our premium interior projects.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl shadow-xl border border-gray-100">
          <table className="w-full text-left bg-white border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-dark text-white">
                <th className="p-6 font-heading text-xl rounded-tl-3xl">Core Material</th>
                <th className="p-6">
                  <div className="flex items-center gap-2"><Droplets size={20} className="text-accent" /> Water Proof</div>
                </th>
                <th className="p-6">
                  <div className="flex items-center gap-2"><ShieldCheck size={20} className="text-accent" /> Core Strength</div>
                </th>
                <th className="p-6">
                  <div className="flex items-center gap-2"><Gem size={20} className="text-accent" /> Premium Feel</div>
                </th>
                <th className="p-6 rounded-tr-3xl">Best Used For</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, index) => (
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`border-b border-gray-100 hover:bg-primary/5 hover:shadow-md transition-all duration-300 relative group ${index === comparisons.length - 1 ? 'border-0' : ''}`}
                >
                  <td className="p-6 font-bold text-dark text-lg">{row.material}</td>
                  <td className="p-6">
                    <div className="flex gap-1">{renderStars(row.waterproof)}</div>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-1">{renderStars(row.strength)}</div>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-1">{renderStars(row.premium)}</div>
                  </td>
                  <td className="p-6 text-sm text-gray-500">{row.desc}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MaterialComparison;
