import { motion } from 'framer-motion';

const teamMembers = [
  { name: 'R.S. Vishwakarma', role: 'Managing Director', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
  { name: 'Amit Kumar', role: 'Project Manager', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
  { name: 'Priya Sharma', role: 'Lead Architect', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
  { name: 'Rahul Desai', role: 'Interior Designer', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' }
];

const TeamSection = () => {
  return (
    <section className="py-28 bg-bg relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <h4 className="text-accent font-bold tracking-[0.2em] uppercase text-xl md:text-2xl mb-4 inline-block">Our People</h4>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-dark">
            Meet The <span className="italic text-primary">Experts</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
            Behind every masterpiece is a team of dedicated professionals. From visionary architects to master craftsmen, our team is our greatest asset.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-center">
                <div className="w-10 h-[1px] bg-accent mx-auto mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-accent text-sm uppercase tracking-widest font-bold">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
