import { motion } from 'framer-motion';
import { Sofa, PenTool, Building2, Zap, Palette, Paintbrush, Droplets, Hammer, GlassWater, Blinds, Wind } from 'lucide-react';

const services = [
  {
    icon: <Sofa size={32} />,
    title: "Furniture Work",
    items: ["Modular Kitchen", "Wardrobe", "TV Unit", "Office Furniture", "Sofa", "Bed", "Dining Table", "Reception Counter", "CNC Furniture", "Custom Furniture"]
  },
  {
    icon: <PenTool size={32} />,
    title: "Interior Design",
    items: ["2D Planning", "3D Design", "Space Planning", "Material Selection", "Custom Interior", "Commercial Interior"]
  },
  {
    icon: <Building2 size={32} />,
    title: "Construction",
    items: ["Residential", "Commercial", "Renovation", "Structural Work", "Civil Work", "Waterproofing"]
  },
  {
    icon: <Zap size={32} />,
    title: "Electrical",
    items: ["Complete Wiring", "Panel Installation", "Lighting Design", "Smart Home", "CCTV", "Fire Alarm"]
  },
  {
    icon: <Palette size={32} />,
    title: "POP & Gypsum",
    items: ["False Ceiling", "Cove Lighting", "Designer Ceiling", "Wall Panel", "Decorative Moulding"]
  },
  {
    icon: <Paintbrush size={32} />,
    title: "Painting",
    items: ["Texture Paint", "PU Polish", "Duco Finish", "Wall Paint", "Wood Polish"]
  },
  {
    icon: <Droplets size={32} />,
    title: "Plumbing",
    items: ["Bathroom", "Kitchen", "CP Fittings", "Drainage", "Water Line"]
  },
  {
    icon: <Hammer size={32} />,
    title: "Fabrication",
    items: ["MS Work", "SS Work", "Railing", "Gate", "Pergola"]
  },
  {
    icon: <GlassWater size={32} />,
    title: "Glass Work",
    items: ["Toughened Glass", "Shower Partition", "Glass Door", "Office Partition"]
  },
  {
    icon: <Blinds size={32} />,
    title: "Curtain",
    items: ["Curtain Design", "Blind", "Motorized Curtain"]
  },
  {
    icon: <Wind size={32} />,
    title: "AC Work",
    items: ["Copper Piping", "Installation", "VRV", "Ducting"]
  }
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const ServicesSection = () => {
  return (
    <section className="py-28 bg-bg relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <h4 className="text-accent font-bold tracking-[0.2em] uppercase text-xl md:text-2xl mb-4">Our Expertise</h4>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-dark mb-6">
            End-to-End <span className="italic font-light text-primary">Interior Excellence</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
            From foundation to finishing, we provide end-to-end interior and construction services under one roof, ensuring flawless execution and premium quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (index % 4) * 0.1, duration: 0.6 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-dark group-hover:text-accent transition-colors duration-500 text-dark border border-gray-100">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold text-dark mb-4">{service.title}</h3>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="text-gray-500 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
