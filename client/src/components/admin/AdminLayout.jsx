import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, FolderGit2, MessageSquare, LogOut, Menu, X, Users, Image as ImageIcon, Star, ArrowRightLeft, FileText } from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Basic Auth Check
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: FolderGit2 },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Projects', path: '/admin/projects', icon: FolderGit2 },
    { name: 'Transformations', path: '/admin/transformations', icon: ArrowRightLeft },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
    { name: 'Employees', path: '/admin/employees', icon: Users },
    { name: 'Blogs', path: '/admin/blogs', icon: FileText },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-gradient-to-b from-[#151515] to-[#0A0A0A] border-r border-gray-800 text-white w-72 flex-shrink-0 transition-transform duration-500 ease-in-out z-30 ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} absolute md:relative h-full`}>
        <div className="h-24 flex items-center justify-between px-8 border-b border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2"></div>
          <span className="text-2xl font-heading font-bold text-white relative z-10">RSV <span className="text-accent">Admin</span></span>
          <button className="md:hidden text-gray-400 hover:text-white transition-colors relative z-10" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="p-6 space-y-3 overflow-y-auto h-[calc(100vh-6rem)] custom-scrollbar">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">Menu</p>
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-accent text-white shadow-lg shadow-accent/20 border border-accent/50' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-accent transition-colors'} />
                <span className="font-medium tracking-wide">{item.name}</span>
              </Link>
            );
          })}
          
          <div className="pt-8 mt-8 border-t border-white/10">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-4 px-5 py-3.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 w-full border border-transparent hover:border-red-500/20 group"
            >
              <LogOut size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium tracking-wide">Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-bg relative">
        {/* Decorative Background Glow for Admin Area */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Header */}
        <header className="h-24 bg-white/70 backdrop-blur-xl border-b border-gray-100 flex items-center px-8 z-20 flex-shrink-0 sticky top-0">
          <button 
            className="text-gray-500 hover:text-dark focus:outline-none md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="ml-auto flex items-center gap-5">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-dark leading-tight">Super Admin</p>
              <p className="text-xs text-gray-500 font-medium">System Manager</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-tr from-accent to-primary rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-accent/20 border border-white/20 relative">
              SA
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative z-10">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;

