import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, ClipboardList, User, Mail, Phone, MessageSquare, ChevronDown, ShieldCheck, Clock, Award, Hammer } from 'lucide-react';

const Quote = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    interest: 'Custom Furniture',
    message: '' 
  });
  const [status, setStatus] = useState(''); // 'idle' | 'loading' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const finalMessage = `Phone: ${formData.phone}\nInterested In: ${formData.interest}\n\nDetails: ${formData.message}`;
      
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: finalMessage,
          type: 'Quote'
        })
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', interest: 'Custom Furniture', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="pt-28 pb-20 bg-bg min-h-screen relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent font-bold tracking-widest uppercase text-xs mb-4 border border-accent/20">
            Request an Estimate
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-dark mb-6 drop-shadow-sm">
            Let's Build Something <span className="text-primary italic">Beautiful</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Tell us about your space and requirements. Our master craftsmen will provide a detailed estimate for your bespoke furniture within 24 hours.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl rounded-[3rem] shadow-2xl shadow-primary/5 overflow-hidden border border-white flex flex-col lg:flex-row">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-2/5 relative min-h-[400px] bg-dark text-white p-12 flex flex-col justify-between overflow-hidden">
             {/* Background Image & Gradient */}
             <div className="absolute inset-0 z-0">
               <img src="https://images.unsplash.com/photo-1618220179428-22790b46a0eb?auto=format&fit=crop&w=1000&q=80" alt="Craftsmanship" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
               <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/80 to-primary/90"></div>
             </div>

             <div className="relative z-10">
               <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                 <ClipboardList size={32} className="text-accent" />
               </motion.div>
               <h3 className="text-3xl font-heading font-bold mb-8 leading-snug">The R.S. Vishwakarma <span className="text-accent italic">Difference</span></h3>
               
               <ul className="space-y-6">
                 {[
                   { icon: Award, title: "Master Craftsmanship", desc: "Decades of woodworking expertise" },
                   { icon: ShieldCheck, title: "Premium Materials", desc: "Sourced for durability and beauty" },
                   { icon: Hammer, title: "Custom Tailored", desc: "Designed exactly for your space" },
                   { icon: Clock, title: "Timely Delivery", desc: "We respect your time and schedule" }
                 ].map((item, index) => (
                   <motion.li 
                     key={index}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.4 + (index * 0.1) }}
                     className="flex items-start gap-4"
                   >
                     <div className="mt-1 bg-accent/20 p-2 rounded-lg text-accent border border-accent/20">
                       <item.icon size={20} />
                     </div>
                     <div>
                       <h4 className="font-bold text-white text-lg">{item.title}</h4>
                       <p className="text-white/60 text-sm font-light">{item.desc}</p>
                     </div>
                   </motion.li>
                 ))}
               </ul>
             </div>

             <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
               <p className="text-white/70 text-sm font-light italic">"Quality means doing it right when no one is looking."</p>
             </div>
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-3/5 p-10 lg:p-14 bg-white/50">
            <AnimatePresence>
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, mb: 0 }} 
                  animate={{ opacity: 1, height: 'auto', mb: 24 }} 
                  exit={{ opacity: 0, height: 0, mb: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-700 rounded-2xl flex items-center gap-4 shadow-sm">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle2 size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-800">Quote Request Sent</h4>
                      <p className="text-sm text-green-600 mt-1">Thank you! We'll get back to you with an estimate soon.</p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, mb: 0 }} 
                  animate={{ opacity: 1, height: 'auto', mb: 24 }} 
                  exit={{ opacity: 0, height: 0, mb: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 rounded-2xl flex items-center gap-4 shadow-sm">
                    <span className="font-medium">Something went wrong. Please try again later.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.form 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6" 
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Full Name *</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-accent transition-colors">
                      <User size={18} />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all shadow-sm placeholder:text-gray-300" 
                      placeholder="John Doe" 
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Phone Number *</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-accent transition-colors">
                      <Phone size={18} />
                    </div>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all shadow-sm placeholder:text-gray-300" 
                      placeholder="+91 98765 43210" 
                    />
                  </div>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Email Address *</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-accent transition-colors">
                      <Mail size={18} />
                    </div>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all shadow-sm placeholder:text-gray-300" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Interested In</label>
                  <div className="relative group">
                    <select 
                      value={formData.interest}
                      onChange={(e) => setFormData({...formData, interest: e.target.value})}
                      className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all appearance-none shadow-sm text-gray-700 cursor-pointer"
                    >
                      <option value="Custom Furniture">Custom Furniture</option>
                      <option value="Interior Design">Interior Design</option>
                      <option value="Bulk Order">Bulk Order</option>
                      <option value="Repair & Restoration">Repair & Restoration</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Project Details *</label>
                <div className="relative group">
                  <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-gray-400 group-focus-within:text-accent transition-colors">
                    <MessageSquare size={18} />
                  </div>
                  <textarea 
                    rows="5" 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all shadow-sm placeholder:text-gray-300 resize-none" 
                    placeholder="Tell us about dimensions, materials, preferred styles, or any specific requirements you have in mind..."
                  ></textarea>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="pt-2">
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="group relative w-full bg-dark text-white px-8 py-4 rounded-2xl font-bold overflow-hidden transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {status === 'loading' ? 'Submitting Request...' : 'Request Detailed Quote'} 
                    <Send size={18} className={`transition-transform duration-300 ${status !== 'loading' ? 'group-hover:translate-x-1 group-hover:-translate-y-1' : ''}`} />
                  </div>
                </button>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
