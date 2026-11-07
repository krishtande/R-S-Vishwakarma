import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Sofa, FileText } from 'lucide-react';

const MobileBottomBar = () => {
  const location = useLocation();
  const phoneNumber = '+918808728154';
  const whatsappUrl = `https://wa.me/918808728154?text=${encodeURIComponent('Hello R.S. Vishwakarma & Company! I would like to inquire about your furniture and interior design services.')}`;

  // Hide on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const isCurrent = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200/80 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] px-2 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around gap-1 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href={`tel:${phoneNumber}`}
          className="flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl text-dark hover:bg-gray-50 active:scale-95 transition-all text-center"
        >
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-0.5 shadow-sm">
            <Phone size={18} />
          </div>
          <span className="text-[11px] font-bold text-gray-700 leading-tight">Call Now</span>
        </a>

        {/* WhatsApp Direct Chat */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl text-dark hover:bg-green-50 active:scale-95 transition-all text-center"
        >
          <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center mb-0.5 shadow-sm shadow-green-500/30">
            <MessageCircle size={20} />
          </div>
          <span className="text-[11px] font-bold text-[#1da851] leading-tight">WhatsApp</span>
        </a>

        {/* Explore Products / Catalog */}
        <Link
          to="/products"
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl active:scale-95 transition-all text-center ${
            isCurrent('/products') ? 'text-primary' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-0.5 shadow-sm ${
            isCurrent('/products') ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'
          }`}>
            <Sofa size={18} />
          </div>
          <span className="text-[11px] font-bold leading-tight">Catalog</span>
        </Link>

        {/* Free Estimate / Quote */}
        <Link
          to="/quote"
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl active:scale-95 transition-all text-center ${
            isCurrent('/quote') ? 'text-accent' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-0.5 shadow-sm ${
            isCurrent('/quote') ? 'bg-accent/15 text-accent' : 'bg-accent/10 text-accent'
          }`}>
            <FileText size={18} />
          </div>
          <span className="text-[11px] font-bold text-accent leading-tight">Get Quote</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileBottomBar;
