import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Toaster } from 'react-hot-toast';

// Eager load Home for instant First Contentful Paint
import Home from './pages/Home';

// Lazy load other user pages for faster initial load & code splitting
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const Projects = lazy(() => import('./pages/Projects'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Quote = lazy(() => import('./pages/Quote'));
const Blogs = lazy(() => import('./pages/Blogs'));
const BlogDetails = lazy(() => import('./pages/BlogDetails'));

// Lazy load admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ManageProducts = lazy(() => import('./pages/admin/ManageProducts'));
const ManageCategories = lazy(() => import('./pages/admin/ManageCategories'));
const ManageProjects = lazy(() => import('./pages/admin/ManageProjects'));
const ManageGallery = lazy(() => import('./pages/admin/ManageGallery'));
const ManageTransformations = lazy(() => import('./pages/admin/ManageTransformations'));
const ManageMessages = lazy(() => import('./pages/admin/ManageMessages'));
const ManageTestimonials = lazy(() => import('./pages/admin/ManageTestimonials'));
const ManageEmployees = lazy(() => import('./pages/admin/ManageEmployees'));
const ManageBlogs = lazy(() => import('./pages/admin/ManageBlogs'));

// Premium UI Components
import ScrollProgress from './components/ui/ScrollProgress';
import BackgroundGlow from './components/ui/BackgroundGlow';
import PageTransition from './components/ui/PageTransition';
import WhatsAppFloatingButton from './components/ui/WhatsAppFloatingButton';
import MobileBottomBar from './components/ui/MobileBottomBar';

const PageLoader = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
    <div className="w-12 h-12 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
    <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Loading...</span>
  </div>
);

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen relative">
      <ScrollProgress />
      <BackgroundGlow />
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow relative z-10 pb-16 md:pb-0">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
              <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
              <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/quote" element={<PageTransition><Quote /></PageTransition>} />
              <Route path="/blogs" element={<PageTransition><Blogs /></PageTransition>} />
              <Route path="/blogs/:id" element={<PageTransition><BlogDetails /></PageTransition>} />

              {/* Admin Routes */}
              <Route path="/admin" element={<PageTransition><AdminLogin /></PageTransition>} />
              <Route path="/admin/*" element={<PageTransition><AdminLayout /></PageTransition>}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<ManageProducts />} />
                <Route path="categories" element={<ManageCategories />} />
                <Route path="projects" element={<ManageProjects />} />
                <Route path="gallery" element={<ManageGallery />} />
                <Route path="transformations" element={<ManageTransformations />} />
                <Route path="messages" element={<ManageMessages />} />
                <Route path="testimonials" element={<ManageTestimonials />} />
                <Route path="employees" element={<ManageEmployees />} />
                <Route path="blogs" element={<ManageBlogs />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppFloatingButton />}
      {!isAdminRoute && <MobileBottomBar />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Toaster position="top-right" toastOptions={{ className: 'font-body text-sm' }} />
      <AppContent />
    </Router>
  );
}

export default App;
