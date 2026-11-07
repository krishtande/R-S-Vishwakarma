import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Edit, Image as ImageIcon, Check, X, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/ui/ConfirmModal';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs?admin=true');
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadingImage(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        setCoverImage(data.data.url);
        toast.success('Image uploaded successfully');
      } else {
        toast.error(data.message || 'Image upload failed');
      }
    } catch (error) {
      toast.error('Error uploading image');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setExcerpt('');
    setCoverImage('');
    setTags('');
    setPublished(true);
    setEditingBlog(null);
    setIsAddModalOpen(false);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
    setExcerpt(blog.excerpt);
    setCoverImage(blog.coverImage);
    setTags(blog.tags ? blog.tags.join(', ') : '');
    setPublished(blog.published);
    setIsAddModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const token = localStorage.getItem('adminToken');
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);

    const payload = {
      title,
      content,
      excerpt,
      coverImage,
      tags: tagsArray,
      published
    };

    try {
      const url = editingBlog ? `/api/blogs/${editingBlog._id}` : '/api/blogs';
      const method = editingBlog ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`Blog ${editingBlog ? 'updated' : 'added'} successfully`);
        resetForm();
        fetchBlogs();
      } else {
        toast.error(data.message || `Failed to ${editingBlog ? 'update' : 'add'} blog`);
      }
    } catch (error) {
      toast.error('Error connecting to server');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    if (!itemToDelete) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/blogs/${itemToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await res.json();
      
      if (data.success) {
        toast.success('Blog deleted successfully');
        fetchBlogs();
      } else {
        toast.error('Failed to delete blog');
      }
    } catch (error) {
      toast.error('Error connecting to server');
    } finally {
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-heading font-bold text-dark flex items-center gap-3">
            <FileText className="text-primary" /> Manage Blogs
          </h1>
          <p className="text-gray-500 text-sm mt-1">Add and edit articles for your website</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsAddModalOpen(true); }}
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-dark transition-colors flex items-center gap-2"
        >
          <Plus size={20} /> Add New Blog
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <FileText size={32} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-2">No blogs found</h3>
            <p className="text-gray-500">Create your first blog post to engage your audience.</p>
          </div>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                {blog.coverImage ? (
                  <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold shadow-sm backdrop-blur-md ${blog.published ? 'bg-green-500/90 text-white' : 'bg-yellow-500/90 text-white'}`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-dark text-lg mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {blog.tags?.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">{tag}</span>
                  ))}
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(blog)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => confirmDelete(blog._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-heading font-semibold text-xl text-dark">
                {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown/HTML supported)</label>
                    <textarea 
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-64 font-mono text-sm"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short Summary)</label>
                    <textarea 
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-24"
                      required
                      maxLength="500"
                    ></textarea>
                  </div>
                </div>

                <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
                      {coverImage ? (
                        <div className="relative group">
                          <img src={coverImage} alt="Cover Preview" className="w-full h-32 object-cover rounded-lg" />
                          <button 
                            type="button"
                            onClick={() => setCoverImage('')}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="py-4">
                          <ImageIcon className="mx-auto text-gray-400 mb-2" size={32} />
                          <p className="text-sm text-gray-500 mb-2">Upload a cover image</p>
                          <input 
                            type="file" 
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden" 
                          />
                          <button 
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingImage}
                            className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-50 disabled:opacity-50"
                          >
                            {uploadingImage ? 'Uploading...' : 'Select File'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                    <input 
                      type="text" 
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="e.g. interior, design, tips"
                      className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl">
                    <div>
                      <h4 className="text-sm font-medium text-dark">Publish Status</h4>
                      <p className="text-xs text-gray-500">Make this blog visible to public</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            </form>

            <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
              <button 
                type="button"
                onClick={resetForm}
                className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={handleSubmit}
                disabled={submitting || uploadingImage || !coverImage}
                className="px-8 py-2.5 bg-dark text-white rounded-xl font-medium tracking-wide hover:bg-accent hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
              >
                {submitting ? 'Saving...' : 'Save Blog Post'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={executeDelete}
        title="Delete Blog"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  );
};

export default ManageBlogs;
