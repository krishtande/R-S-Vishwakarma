import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppFloatingButton = () => {
  const phoneNumber = '918808728154'; 
  const message = 'Hello R.S. Vishwakarma & Company! I would like to inquire about your furniture and interior design services.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed bottom-8 right-8 z-50 items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 hover:shadow-green-500/50 transition-all duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 220 }}
      whileHover={{ scale: 1.12 }}
      title="Chat with us on WhatsApp"
    >
      <MessageCircle size={32} />
      
      {/* Subtle Pulse Effect */}
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-60 pointer-events-none"></span>
    </motion.a>
  );
};

export default WhatsAppFloatingButton;
