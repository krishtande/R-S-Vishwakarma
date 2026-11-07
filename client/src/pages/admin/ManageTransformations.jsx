import { useState, useEffect } from 'react';
import { Plus, Trash2, X, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/ui/ConfirmModal';
import SkeletonLoader from '../../components/ui/SkeletonLoader';

const ManageTransformations = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [beforeFile, setBeforeFile] = useState(null);
  const [afterFile, setAfterFile] = useState(null);
  const [formData, setFormData] = useState({
    title: ''
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const fetchTransformations = async () => {
    try {
      const res = await fetch('/api/transformations');
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch transformations');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransformations();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBeforeChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBeforeFile(e.target.files[0]);
    }
  };

  const handleAfterChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAfterFile(e.target.files[0]);
    }
  };

  const openAddForm = () => {
    setFormData({ title: '' });
    setBeforeFile(null);
    setAfterFile(null);
    setShowForm(true);
  };

  const uploadImage = async (file, token) => {
    const imgData = new FormData();
    imgData.append('image', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: imgData
    });
    const result = await res.json();
    if (!result.success) throw new Error('Image upload failed');
    return result.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!beforeFile || !afterFile) {
      toast.error('Please select both before and after images');
      return;
    }
    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    setUploading(true);
    const token = localStorage.getItem('adminToken');
    
    try {
      // Upload both images
      const beforeUrl = await uploadImage(beforeFile, token);
      const afterUrl = await uploadImage(afterFile, token);

      // Save transformation
      const res = await fetch('/api/transformations', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          beforeImage: beforeUrl,
          afterImage: afterUrl
        })
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success('Transformation added successfully');
        setShowForm(false);
        fetchTransformations();
      } else {
        toast.error(data.message || 'Failed to add transformation');
      }
    } catch (error) {
      toast.error('Error connecting to server or uploading images');
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
      const res = await fetch(`/api/transformations/${itemToDelete}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success('Transformation removed');
        fetchTransformations();
      } else {
        toast.error('Failed to delete transformation');
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
          <h1 className="text-3xl font-heading font-bold text-dark">Manage Transformations</h1>
          <p className="text-gray-500">Upload your own Before & After photos to show on the Home Page.</p>
        </div>
        <button 
          onClick={openAddForm}
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-dark transition-colors flex items-center gap-2 shadow-sm hover:shadow-md"
        >
          <Plus size={18} /> Add New
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="flex justify-between items-center p-8 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-10">
              <h2 className="text-2xl font-bold font-heading text-dark">Add Transformation</h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-full text-gray-400 hover:text-dark hover:bg-gray-100 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g., Modern Living Room" required className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-gray-200 rounded-xl bg-gray-50/50">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Before Image</label>
                  <input type="file" accept="image/*" onChange={handleBeforeChange} required className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-gray-200 file:text-dark hover:file:bg-gray-300 transition-all cursor-pointer" />
                </div>
                <div className="p-4 border border-primary/20 rounded-xl bg-primary/5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">After Image</label>
                  <input type="file" accept="image/*" onChange={handleAfterChange} required className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-dark transition-all cursor-pointer" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-8">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" disabled={uploading} className="px-8 py-2.5 bg-dark text-white rounded-xl font-medium tracking-wide hover:bg-accent hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 disabled:opacity-50 flex items-center gap-2">
                  {uploading ? 'Uploading...' : 'Save Transformation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[1, 2].map(i => <SkeletonLoader key={i} rows={1} className="h-64 rounded-xl" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <ImageIcon size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium text-gray-700">No transformations added yet.</p>
            <p className="text-sm">Click 'Add New' to upload your first Before & After.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map((item, index) => (
              <div key={item._id} className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
                <div className="flex">
                  <div className="w-1/2 relative aspect-square">
                    <img src={item.beforeImage} alt="Before" className="w-full h-full object-cover grayscale" />
                    <div className="absolute top-2 left-2 bg-dark/60 text-white text-[10px] px-2 py-1 rounded uppercase tracking-wider">Before</div>
                  </div>
                  <div className="w-1/2 relative aspect-square">
                    <img src={item.afterImage} alt="After" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-accent/80 text-white text-[10px] px-2 py-1 rounded uppercase tracking-wider">After</div>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center bg-white border-t border-gray-100">
                  <div>
                    <h3 className="font-bold text-dark">{item.title}</h3>
                    {index === 0 && <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-1"><CheckCircle2 size={12}/> Currently showing on Home</span>}
                  </div>
                  <button 
                    onClick={() => confirmDelete(item._id)} 
                    className="text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
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
        title="Delete Transformation"
        message="Are you sure you want to delete this transformation? It will be removed from the Home Page if it is currently displayed."
        confirmText="Delete"
      />
    </div>
  );
};

export default ManageTransformations;
