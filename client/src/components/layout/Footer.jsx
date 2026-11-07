import { Link } from 'react-router-dom';
import { Globe, Camera, MessageSquare, Mail, Phone, MapPin, MessageCircle, Building } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-700 pb-12">
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="text-3xl font-heading text-accent">R. S. Vishwakarma & Company</h3>
          <p className="text-gray-400 leading-relaxed">
            Crafting premium, timeless furniture for modern living spaces. Quality, elegance, and durability in every piece.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent transition-colors"><Globe size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent transition-colors"><Camera size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent transition-colors"><MessageSquare size={18} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-heading mb-6">Quick Links</h4>
          <ul className="space-y-3 text-gray-400">
            <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
            <li><Link to="/projects" className="hover:text-accent transition-colors">Our Projects</Link></li>
            <li><Link to="/products" className="hover:text-accent transition-colors">Furniture Collection</Link></li>
            <li><Link to="/blogs" className="hover:text-accent transition-colors">Blog & News</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-xl font-heading mb-6">Categories</h4>
          <ul className="space-y-3 text-gray-400">
            <li><Link to="/products?keyword=sofa" className="hover:text-accent transition-colors">Sofas & Couches</Link></li>
            <li><Link to="/products?keyword=bed" className="hover:text-accent transition-colors">Beds & Wardrobes</Link></li>
            <li><Link to="/products?keyword=dining" className="hover:text-accent transition-colors">Dining Tables</Link></li>
            <li><Link to="/products?keyword=desk" className="hover:text-accent transition-colors">Office & Desks</Link></li>
            <li><Link to="/products?keyword=chair" className="hover:text-accent transition-colors">Chairs & Seating</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-heading mb-6">Contact Info</h4>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-start gap-3">
              <Building className="text-accent mt-1 flex-shrink-0" size={20} />
              <a href="https://www.google.com/maps/search/?api=1&query=B11+bhulabhai+park+3,+Mansarovar+road,+ioc+road,+chandkheda,+Ahmedabad+382424" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Office: B11 bhulabhai park 3, Mansarovar road, ioc road, chandkheda, Ahmedabad 382424</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="text-accent mt-1 flex-shrink-0" size={20} />
              <a href="https://www.google.com/maps/search/?api=1&query=Survey+No.311/2,+Nr.+Madhav+Homes+%26+Nr.+Small+Under+Pass,+Sardar+Patel+Ring+Rd,+Zundal,+Gujarat+382424" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Workshop: Survey No.311/2, Nr. Madhav Homes & Nr. Small Under Pass, Sardar Patel Ring Rd, Zundal, Gujarat 382424</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-accent flex-shrink-0" size={20} />
              <span>Call: <a href="tel:+918808728154" className="hover:text-accent transition-colors">+91 8808728154</a>, <a href="tel:+919925482498" className="hover:text-accent transition-colors">9925482498</a></span>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="text-accent flex-shrink-0" size={20} />
              <a href="https://wa.me/918808728154" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">WhatsApp: +91 8808728154</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-accent flex-shrink-0" size={20} />
              <a href="mailto:Rsvishwakarmacompany@gmail.com" className="hover:text-accent transition-colors">Rsvishwakarmacompany@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} RS Vishwakarma & Company. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/admin" className="hover:text-white transition-colors opacity-30 hover:opacity-100">Admin</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

