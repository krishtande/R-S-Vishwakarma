import { useState, useEffect } from 'react';
import { Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/ui/ConfirmModal';
import SkeletonLoader from '../../components/ui/SkeletonLoader';

const categories = ['Residential', 'Commercial', 'Office', 'Hotels', 'Luxury Villas'];

const ManageGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    caption: '',
    category: 'Residential'
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const fetchGalleryItems = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch gallery items');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const openAddForm = () => {
    setFormData({ caption: '', category: 'Residential' });
    setImageFile(null);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error('Please select an image');
      return;
    }

    setUploading(true);
    const token = localStorage.getItem('adminToken');
    
    try {
      // 1. Upload image to Cloudinary via backend route
      const imgData = new FormData();
      imgData.append('image', imageFile);
      
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: imgData
      });
      const uploadResult = await uploadRes.json();
      
      if (!uploadResult.success) {
        toast.error('Image upload failed');
        setUploading(false);
        return;
      }

      // 2. Save gallery item
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          imageUrl: uploadResult.url,
          caption: formData.caption,
          category: formData.category
        })
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success('Image added to gallery');
        setShowForm(false);
        fetchGalleryItems();
      } else {
        toast.error(data.message || 'Failed to add image');
      }
    } catch (error) {
      toast.error('Error connecting to server');
    } finally {
      setUploading(false);
    }
  };

  const confirmDelete = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    if (!itemToDelete) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/gallery/${itemToDelete}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success('Image removed from gallery');
        fetchGalleryItems();
      } else {
        toast.error('Failed to delete image');
      }
    } catch (error) {
      toast.error('Error connecting to server');
    } finally {
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-dark">Manage Gallery</h1>
          <p className="text-gray-500">Upload and organize images for your public portfolio.</p>
        </div>
        <button 
          onClick={openAddForm}
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-dark transition-colors flex items-center gap-2 shadow-sm hover:shadow-md"
        >
          <Plus size={18} /> Add Image
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="flex justify-between items-center p-8 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-10">
              <h2 className="text-2xl font-bold font-heading text-dark">Upload New Image</h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-full text-gray-400 hover:text-dark hover:bg-gray-100 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Image</label>
                <div className="flex items-center gap-4">
                  <input type="file" accept="image/*" onChange={handleImageChange} required className="border border-gray-200 p-2.5 rounded-xl w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select name="category" required value={formData.category} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-white">
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caption (Optional)</label>
                <input type="text" name="caption" value={formData.caption} onChange={handleInputChange} placeholder="E.g., Modern Office Setup" className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-8">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" disabled={uploading} className="px-8 py-2.5 bg-dark text-white rounded-xl font-medium tracking-wide hover:bg-accent hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 disabled:opacity-50 flex items-center gap-2">
                  {uploading ? 'Uploading...' : 'Save to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[1, 2, 3, 4, 5, 6].map(i => <SkeletonLoader key={i} rows={1} className="h-48 rounded-xl" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <ImageIcon size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium text-gray-700">No images in gallery</p>
            <p className="text-sm">Click 'Add Image' to start building your portfolio.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map(item => (
              <div key={item._id} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="aspect-square">
                  <img src={item.imageUrl} alt={item.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-accent text-xs font-bold uppercase tracking-wider mb-1">{item.category}</span>
                  {item.caption && <p className="text-white text-sm font-medium line-clamp-2">{item.caption}</p>}
                  
                  <button 
                    onClick={() => confirmDelete(item._id)} 
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                    title="Delete Image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={executeDelete}
        title="Delete Image"
        message="Are you sure you want to remove this image from the gallery? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  );
};

export default ManageGallery;
