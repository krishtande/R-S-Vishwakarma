import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Tag, Eye } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        
        if (data.success) {
          setBlog(data.data);
        } else {
          // Redirect to blogs if not found
          navigate('/blogs');
        }
      } catch (error) {
        console.error('Failed to fetch blog details', error);
        navigate('/blogs');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id, navigate]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.excerpt,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="bg-bg min-h-screen pb-20 pt-32">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        {/* Back Button */}
        <Link 
          to="/blogs" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to all articles
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-3 mb-6">
            {blog.tags?.map(tag => (
              <span key={tag} className="text-xs font-bold tracking-widest uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-lg">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-dark leading-tight mb-8">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-gray-200 py-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                  {blog.author ? blog.author.charAt(0) : 'A'}
                </div>
                <span>{blog.author || 'Admin'}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar size={16} />
                {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <Eye size={16} />
                {blog.views} views
              </div>
              <button 
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all shadow-sm"
                title="Share Article"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="rounded-3xl overflow-hidden shadow-lg mb-12 bg-white">
            <img 
              src={blog.coverImage} 
              alt={blog.title} 
              className="w-full h-auto max-h-[600px] object-cover"
            />
          </div>
        )}

        {/* Content */}
        <article className="prose prose-lg prose-gray max-w-none prose-headings:font-heading prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-a:text-primary hover:prose-a:text-accent prose-img:rounded-2xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {blog.content}
          </ReactMarkdown>
        </article>

        {/* Footer Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200 flex items-center gap-4">
            <Tag className="text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {blog.tags.map(tag => (
                <span key={tag} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
