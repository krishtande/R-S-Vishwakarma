import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, PenTool, Truck, Clock, Wrench, Star, Quote, MessageSquare, ThumbsUp, ArrowUpRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, EffectCoverflow } from 'swiper/modules';
import { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import InteractiveTimeline from '../components/home/InteractiveTimeline';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TeamSection from '../components/home/TeamSection';
import FAQSection from '../components/home/FAQSection';
import FurnitureByMaterial from '../components/home/FurnitureByMaterial';
import FinishExplorer from '../components/home/FinishExplorer';
import MaterialComparison from '../components/home/MaterialComparison';
import LuxuryBrandsSlider from '../components/home/LuxuryBrandsSlider';
import BeforeAfterSlider from '../components/home/BeforeAfterSlider';

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  
  const fallbackTestimonials = [
    {
      _id: 't1',
      clientName: 'Aarav Singhania',
      role: 'Homeowner, Mumbai',
      rating: 5,
      content: "The craftsmanship is absolutely unparalleled. They transformed our bare apartment into a luxurious haven. Every piece of furniture tells a story of dedication and precision."
    },
    {
      _id: 't2',
      clientName: 'Nisha Desai',
      role: 'Interior Designer',
      rating: 5,
      content: "As a designer, I am extremely particular about finishes and proportions. R.S. Vishwakarma & Company didn't just meet my expectations; they exceeded them. Their bespoke woodwork is world-class."
    },
    {
      _id: 't3',
      clientName: 'Vikram Mehta',
      role: 'Corporate Director',
      rating: 5,
      content: "We hired them for our executive boardrooms. The premium teak tables and custom wall paneling completely elevated the professional ambiance of our workspace. Flawless execution."
    },
    {
      _id: 't4',
      clientName: 'Priya Sharma',
      role: 'Boutique Hotel Owner',
      rating: 5,
      content: "Their attention to detail is what sets them apart. From the magnificent reception desk to the intricate lounge seating, everything was tailored perfectly to our luxury theme."
    }
  ];
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [testiRes, prodRes, projRes] = await Promise.all([
          fetch('/api/testimonials'),
          fetch('/api/products'),
          fetch('/api/projects')
        ]);

        const testiData = await testiRes.json();
        const prodData = await prodRes.json();
        const projData = await projRes.json();

        if (testiData.success) setTestimonials(testiData.data);
        if (prodData.success) {
          const featuredProd = prodData.data.filter(p => p.featured);
          setFeaturedProducts(featuredProd.length > 0 ? featuredProd.slice(0, 6) : prodData.data.slice(0, 6));
        }
        if (projData.success) {
          const featuredProj = projData.data.filter(p => p.featured);
          setFeaturedProjects(featuredProj.length > 0 ? featuredProj.slice(0, 4) : projData.data.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };
    fetchData();
  }, []);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full overflow-hidden bg-bg relative">
      {/* Decorative Background Blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-secondary/10 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob animation-delay-4000 pointer-events-none"></div>

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. All Services Grid */}
      <ServicesSection />

      {/* 3. ABOUT SECTION - Editorial Layout */}
      <section className="py-28 overflow-hidden relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl relative">
                <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80" alt="Workshop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent"></div>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -bottom-10 -right-10 bg-white/90 backdrop-blur-md p-10 rounded-[2.5rem] shadow-2xl hidden md:block border border-white"
              >
                <span className="block text-6xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary mb-2">20+</span>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Years of<br />Excellence</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2"
            >
              <div className="flex items-center gap-4 mb-4 sm:mb-8">
                <div className="w-12 sm:w-16 h-[1px] bg-accent"></div>
                <h4 className="text-accent font-bold tracking-[0.2em] uppercase text-sm sm:text-xl md:text-2xl inline-block">Our Story</h4>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-dark mb-8 leading-[1.1]">
                Where Craftsmanship<br/><span className="italic font-light text-primary">Meets Elegance</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6 font-light">
                RS Vishwakarma & Company has been at the forefront of premium furniture design and manufacturing. We believe that furniture is not just functional—it's an expression of your personality and the soul of your space.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed mb-12 font-light">
                Our expert craftsmen combine traditional woodworking techniques with modern technology to create pieces that are visually stunning and built to withstand the test of time.
              </p>
              <Link to="/about" className="group relative inline-flex items-center justify-center gap-4 bg-dark text-white px-10 py-5 rounded-full overflow-hidden transition-all shadow-xl hover:shadow-2xl hover:shadow-accent/20">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 font-bold tracking-wide">Discover Our Heritage</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS - Luxury Grid */}
      <section className="py-28 bg-white relative">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-[1px] bg-accent"></div>
                <h4 className="text-accent font-bold tracking-[0.2em] uppercase text-xl md:text-2xl mb-4 inline-block">Our Products</h4>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-dark">
                Masterpiece <span className="italic font-light text-primary">Collection</span>
              </h2>
            </div>
            <Link to="/products" className="inline-flex items-center gap-3 font-bold text-dark hover:text-accent transition-colors pb-2 border-b border-dark hover:border-accent uppercase tracking-widest text-sm">
              View All <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {(featuredProducts.length > 0 ? featuredProducts : [
              { _id: '1', name: 'Classic Wooden Sofa', description: 'Handcrafted teak wood sofa with premium upholstery.', price: 45000, images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'] },
              { _id: '2', name: 'Minimalist Dining Set', description: 'Modern 6-seater dining table perfect for family gatherings.', price: 65000, images: ['https://images.unsplash.com/photo-1617806118233-18e1c0945594?auto=format&fit=crop&w=800&q=80'] },
              { _id: '3', name: 'Luxury King Bed', description: 'Solid wood bed frame with intricate carved details.', price: 85000, images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'] }
            ]).map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative bg-bg rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700"
              >
                <div className="relative h-[400px] overflow-hidden">
                  <img src={product.images && product.images[0] ? product.images[0] : ''} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating Action */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]">
                    <Link to="/products" className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 bg-white/20 backdrop-blur-md border border-white/40 text-white font-bold tracking-widest uppercase text-xs px-8 py-4 rounded-full hover:bg-white hover:text-dark">
                      Discover
                    </Link>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-10">
                  <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50">
                    <h3 className="text-2xl font-heading font-bold text-dark mb-1 truncate">{product.name}</h3>
                    <p className="text-accent font-bold text-lg">₹{product.price?.toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE TIMELINE */}
      <InteractiveTimeline />

      {/* 5.5 Before & After Slider */}
      <BeforeAfterSlider />

      {/* NEW PHASE 3 SECTIONS */}
      {/* 5a. Furniture By Material */}
      <FurnitureByMaterial />
      
      {/* 5b. Finish Explorer */}
      <FinishExplorer />
      
      {/* 5c. Material Comparison */}
      <MaterialComparison />
      
      {/* 5d. Luxury Brands Slider */}
      <LuxuryBrandsSlider />

      {/* 6. WHY CHOOSE US */}
      <WhyChooseUs />

      {/* 7. FEATURED PROJECTS - Magazine Style */}
      <section className="py-32 bg-dark text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
        <div className="absolute top-0 right-0 w-[50vw] h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
          >
            <div className="max-w-2xl">
              <h4 className="text-accent font-bold tracking-[0.2em] uppercase text-xl md:text-2xl mb-6 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-accent"></div> Portfolio
              </h4>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white leading-tight">
                Spaces Transformed by <span className="italic font-light text-accent">Wood</span>
              </h2>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-dark transition-all duration-300">
              Explore Gallery <ArrowRight size={18} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {(featuredProjects.length > 0 ? featuredProjects : [
              { _id: 'p1', title: 'Modern Villa', description: 'Custom woodwork for luxury villa.', location: 'Mumbai', images: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'] },
              { _id: 'p2', title: 'Corporate HQ', description: 'Ergonomic office setup.', location: 'Pune', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'] },
              { _id: 'p3', title: 'Boutique Hotel', description: 'Statement reception desk.', location: 'Goa', images: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'] }
            ]).slice(0, 3).map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className={`group relative overflow-hidden rounded-[2rem] cursor-pointer ${
                  index === 0 ? 'md:col-span-12 aspect-[21/9]' : 'md:col-span-6 aspect-[4/3]'
                }`}
              >
                <img src={project.images && project.images[0] ? project.images[0] : ''} alt={project.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>

                <div className="absolute bottom-0 left-0 w-full p-10 md:p-14 translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                  <div className="overflow-hidden mb-2">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white drop-shadow-lg">{project.title}</h3>
                  </div>
                  <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                    <p className="text-gray-300 mt-4 mb-6 font-light max-w-xl text-lg">{project.description}</p>
                    {project.location && (
                      <span className="inline-block border border-accent/50 text-accent px-5 py-2 rounded-full text-sm tracking-widest uppercase font-bold">
                        {project.location}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS - Frosted Glass Coverflow */}
      <section className="py-32 bg-bg relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <h4 className="text-accent font-bold tracking-[0.2em] uppercase text-xl md:text-2xl mb-4 inline-block">Testimonials</h4>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-dark">Client <span className="italic font-light text-primary">Experiences</span></h2>
          </div>

          <Swiper
            modules={[Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 5,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="testimonials-swiper !pb-24"
          >
            {(testimonials.length > 0 ? testimonials : fallbackTestimonials).map((t) => (
              <SwiperSlide key={t._id} className="max-w-2xl w-full">
                <div className="bg-white/60 backdrop-blur-3xl p-12 md:p-16 rounded-[3rem] shadow-xl border border-white h-full flex flex-col relative overflow-hidden group hover:shadow-2xl transition-all duration-700">
                  <div className="absolute -top-10 -right-10 text-primary/5 group-hover:text-accent/10 transition-colors duration-700">
                    <Quote size={180} />
                  </div>
                  
                  <div className="flex text-accent mb-8 relative z-10">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} size={24} fill="currentColor" className="mr-1 drop-shadow-sm" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-12 italic flex-1 text-2xl md:text-3xl leading-snug font-heading relative z-10">"{t.content}"</p>
                  
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-dark to-primary flex items-center justify-center font-bold text-white text-2xl shadow-lg border border-white">
                      {t.clientName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-dark text-xl tracking-wide">{t.clientName}</h4>
                      <span className="text-sm text-gray-500 uppercase tracking-widest">{t.role}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 9. TEAM SECTION */}
      <TeamSection />

      {/* 10. FAQ SECTION */}
      <FAQSection />

      {/* 11. CONTACT CTA - Immersive Block */}
      <section className="py-12 bg-bg relative">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[3rem] overflow-hidden bg-dark shadow-2xl"
          >
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80" alt="CTA Background" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-primary/40"></div>
            </div>

            <div className="relative z-10 p-12 md:p-20 lg:p-24 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-2/3">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-6 text-white leading-tight">
                  Ready to Transform<br/>Your <span className="italic font-light text-accent">Space?</span>
                </h2>
                <p className="text-gray-300 text-xl font-light max-w-2xl leading-relaxed">
                  Let's discuss your vision. Our design experts are ready to craft the perfect bespoke furniture pieces tailored exactly to your needs.
                </p>
              </div>

              <div className="md:w-1/3 flex justify-center md:justify-end w-full">
                <Link to="/contact" className="group relative w-full md:w-auto bg-white text-dark px-10 py-5 rounded-full overflow-hidden transition-all shadow-xl hover:shadow-2xl text-center">
                  <div className="absolute inset-0 w-full h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 font-bold text-lg group-hover:text-white transition-colors duration-500">Contact Us Today</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

