import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle, Building } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(''); // 'idle' | 'loading' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'Message' })
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const contactCards = [
    { icon: <Building size={28} />, title: 'Office', desc: 'B11 bhulabhai park 3, Mansarovar road, ioc road, chandkheda, Ahmedabad 382424', link: 'https://www.google.com/maps/search/?api=1&query=B11+bhulabhai+park+3,+Mansarovar+road,+ioc+road,+chandkheda,+Ahmedabad+382424' },
    { icon: <MapPin size={28} />, title: 'Workshop', desc: 'Survey No.311/2, Nr. Madhav Homes & Nr. Small Under Pass, Sardar Patel Ring Rd, Zundal, Gujarat 382424', link: 'https://www.google.com/maps/search/?api=1&query=Survey+No.311/2,+Nr.+Madhav+Homes+%26+Nr.+Small+Under+Pass,+Sardar+Patel+Ring+Rd,+Zundal,+Gujarat+382424' },
    { icon: <Phone size={28} />, title: 'Call Us', desc: '+91 8808728154\n+91 9925482498', link: 'tel:+918808728154' },
    { icon: <MessageCircle size={28} />, title: 'WhatsApp', desc: '+91 8808728154\nChat with our team', link: 'https://wa.me/918808728154' },
    { icon: <Mail size={28} />, title: 'Email Us', desc: 'Rsvishwakarmacompany@gmail.com\nWe reply within 24 hours', link: 'mailto:Rsvishwakarmacompany@gmail.com' }
  ];

  return (
    <div className="pt-24 pb-16 bg-bg min-h-screen relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h4 className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-4">Let's Connect</h4>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-dark mb-6">Get In Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">Have a custom requirement or a question about our collections? We would love to hear from you. Our master craftsmen are ready to bring your vision to life.</p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {contactCards.map((card, index) => (
            <motion.a 
              key={index}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-white flex flex-col items-center text-center group transition-all duration-300 cursor-pointer hover:shadow-2xl hover:border-accent/30"
            >
              <div className="w-16 h-16 bg-bg rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-500 shadow-sm">
                {card.icon}
              </div>
              <h3 className="text-2xl font-heading font-bold text-dark mb-4">{card.title}</h3>
              <p className="text-gray-500 whitespace-pre-line leading-relaxed group-hover:text-dark transition-colors">{card.desc}</p>
            </motion.a>
          ))}
        </div>
        
        {/* Contact Form Section */}
        <div className="flex flex-col lg:flex-row gap-12 bg-white/70 backdrop-blur-2xl rounded-[3rem] shadow-2xl shadow-primary/5 overflow-hidden border border-white/60">
          
          <div className="w-full lg:w-2/5 relative min-h-[400px]">
             {/* Map Placeholder or Beautiful Image */}
             <div className="absolute inset-0">
               <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" alt="Showroom" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-r from-dark/80 to-dark/40"></div>
             </div>
            
            <div className="relative z-10 p-12 flex flex-col h-full justify-end text-white">
              <h3 className="text-3xl font-heading font-bold mb-4 drop-shadow-md text-white">Visit Our Showroom</h3>
              <p className="text-gray-200 font-light leading-relaxed max-w-sm mb-8 drop-shadow-md">
                Experience the texture, smell the rich oak, and see the masterful joints up close. A picture speaks a thousand words, but feeling is believing.
              </p>
              <button className="bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white hover:text-dark text-white w-max px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-500 shadow-lg">
                Get Directions
              </button>
            </div>
          </div>
          
          <div className="w-full lg:w-3/5 p-10 lg:p-16">
            <h3 className="text-3xl font-heading font-bold text-dark mb-2">Send a Message</h3>
            <p className="text-gray-500 mb-8 font-light">Fill out the form below and our team will get back to you within 24 hours.</p>
            
            {status === 'success' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8 p-5 bg-green-50 border border-green-100 text-green-700 rounded-2xl flex items-center gap-4 shadow-sm">
                <CheckCircle2 size={24} className="text-green-500" />
                <span className="font-medium">Thank you! Your message has been sent successfully.</span>
              </motion.div>
            )}
            
            {status === 'error' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8 p-5 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-center gap-4 shadow-sm">
                <span className="font-medium">Something went wrong. Please try again later.</span>
              </motion.div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-dark mb-3 tracking-wide">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-6 py-4 bg-bg/50 border border-white focus:bg-white focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 rounded-2xl transition-all shadow-sm" 
                    placeholder="John Doe" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark mb-3 tracking-wide">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-6 py-4 bg-bg/50 border border-white focus:bg-white focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 rounded-2xl transition-all shadow-sm" 
                    placeholder="+91 98765 43210" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-dark mb-3 tracking-wide">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-6 py-4 bg-bg/50 border border-white focus:bg-white focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 rounded-2xl transition-all shadow-sm" 
                  placeholder="john@example.com" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-dark mb-3 tracking-wide">Message</label>
                <textarea 
                  rows="5" 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-6 py-4 bg-bg/50 border border-white focus:bg-white focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 rounded-2xl transition-all shadow-sm resize-none" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full md:w-auto bg-dark text-white px-10 py-4 rounded-2xl font-bold tracking-wide hover:bg-accent hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 mt-4"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'} <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
