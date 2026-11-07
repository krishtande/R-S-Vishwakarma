import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

const fallbackBlogs = [
  {
    _id: 'b1',
    title: 'The Art of Choosing the Right Wood: Teak vs Oak vs Sheesham',
    author: 'R.S. Vishwakarma',
    readTime: '5 min read',
    createdAt: '2026-02-15T10:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Discover the distinct qualities, grains, and durability profiles of popular hardwoods used in bespoke architectural furniture.'
  },
  {
    _id: 'b2',
    title: 'Modern Modular Kitchens: Combining Plywood Strength with Acrylic Polish',
    author: 'Amit Kumar',
    readTime: '4 min read',
    createdAt: '2026-03-01T10:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'How modern material engineering creates high-moisture resistant kitchens with glass-like reflective surfaces.'
  }
];

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setBlogs(data.data);
        } else {
          setBlogs(fallbackBlogs);
        }
      } catch (error) {
        console.warn('Failed to fetch blogs, using fallback', error);
        setBlogs(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);

  return (
    <div className="bg-bg min-h-screen pb-20">
      <PageHeader 
        title="Our Blog" 
        subtitle="Insights, trends, and inspiration from the world of interior design"
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
      />

      <div className="container mx-auto px-6 md:px-12 mt-20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog, index) => (
              <div 
                key={blog._id} 
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-500 flex flex-col"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  {(blog.coverImage || blog.image) ? (
                    <img 
                      src={blog.coverImage || blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <BookOpen size={48} className="text-gray-300" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1 shadow-sm">
                    <Calendar size={12} />
                    {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {blog.tags?.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs font-bold tracking-widest uppercase text-accent bg-accent/10 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link to={`/blogs/${blog.slug || blog._id}`} className="inline-block">
                    <h3 className="text-2xl font-heading font-bold text-dark mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-500 mb-6 line-clamp-3 leading-relaxed font-light">
                    {blog.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                      <User size={16} className="text-gray-400" />
                      {blog.author || 'Admin'}
                    </div>
                    
                    <Link 
                      to={`/blogs/${blog.slug || blog._id}`} 
                      className="flex items-center gap-1 text-sm font-bold text-dark group-hover:text-primary transition-colors"
                    >
                      Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <BookOpen size={64} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-2xl font-heading font-bold text-dark mb-2">No Articles Yet</h3>
            <p className="text-gray-500 max-w-md mx-auto">We are working on bringing you the best insights and tips. Please check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
