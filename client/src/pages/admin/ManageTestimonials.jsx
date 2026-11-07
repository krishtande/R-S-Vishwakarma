import { useState, useEffect } from 'react';
import { Plus, Trash2, Search, X, Star, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/ui/ConfirmModal';
import SkeletonLoader from '../../components/ui/SkeletonLoader';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({ clientName: '', role: '', content: '', rating: 5 });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch testimonials');
      console.error('Failed to fetch testimonials', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const url = editMode ? `/api/testimonials/${editId}` : '/api/testimonials';
    const method = editMode ? 'PUT' : 'POST';
    
    try {
      const res = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editMode ? 'Testimonial updated successfully' : 'Testimonial added successfully');
        setShowAddForm(false);
        setEditMode(false);
        setEditId(null);
        setFormData({ clientName: '', role: '', content: '', rating: 5 });
        fetchTestimonials();
      } else {
        toast.error(data.message || (editMode ? 'Failed to update testimonial' : 'Failed to add testimonial'));
      }
    } catch (error) {
      toast.error('Error connecting to server');
    }
  };

  const handleEdit = (testi) => {
    setEditMode(true);
    setEditId(testi._id);
    setFormData({
      clientName: testi.clientName,
      role: testi.role || '',
      content: testi.content,
      rating: testi.rating || 5
    });
    setShowAddForm(true);
  };

  const confirmDelete = (id) => {
    setTestimonialToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    if (!testimonialToDelete) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/testimonials/${testimonialToDelete}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Testimonial deleted successfully');
        fetchTestimonials();
      } else {
        toast.error('Failed to delete testimonial');
      }
    } catch (error) {
      toast.error('Error connecting to server');
    } finally {
      setIsDeleteModalOpen(false);
      setTestimonialToDelete(null);
    }
  };

  const filteredTestimonials = testimonials.filter(t => t.clientName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-dark">Manage Testimonials</h1>
          <p className="text-gray-500">Manage what your clients are saying about your work.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)} 
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-dark transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-white/20">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-xl font-bold font-heading text-dark">{editMode ? 'Update Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={() => {
                setShowAddForm(false);
                setEditMode(false);
                setFormData({ clientName: '', role: '', content: '', rating: 5 });
              }} className="p-2 rounded-full text-gray-400 hover:text-dark hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <input type="text" name="clientName" required value={formData.clientName} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role / Location</label>
                  <input type="text" name="role" value={formData.role} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="e.g. Homeowner" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                <input type="number" name="rating" min="1" max="5" required value={formData.rating} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Review Content</label>
                <textarea name="content" rows="4" required value={formData.content} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"></textarea>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                <button type="button" onClick={() => {
                  setShowAddForm(false);
                  setEditMode(false);
                  setFormData({ clientName: '', role: '', content: '', rating: 5 });
                }} className="px-5 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-dark text-white rounded-xl font-medium tracking-wide hover:bg-accent transition-all shadow-sm hover:shadow-md">
                  {editMode ? 'Update Testimonial' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-dark hidden md:block">All Testimonials</h3>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search testimonials..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 w-full md:w-72 transition-all shadow-sm" 
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-xs border-b border-gray-100">
              <tr>
                <th className="px-8 py-5">Client</th>
                <th className="px-8 py-5">Rating</th>
                <th className="px-8 py-5">Review</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-0">
                    <SkeletonLoader rows={4} columns={4} />
                  </td>
                </tr>
              ) : filteredTestimonials.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-12 text-center text-gray-500 text-base">No testimonials found matching your search.</td></tr>
              ) : (
                filteredTestimonials.map((testi) => (
                <tr key={testi._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-4 font-medium text-dark">
                    {testi.clientName}
                    <div className="text-xs text-gray-400 font-normal mt-0.5">{testi.role || 'Client'}</div>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex text-accent gap-0.5">
                      {[...Array(testi.rating || 5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-4 max-w-sm truncate text-gray-600" title={testi.content}>{testi.content}</td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(testi)} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all" title="Edit Testimonial">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => confirmDelete(testi._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all" title="Delete Testimonial">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={executeDelete}
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? It will no longer be visible on the public site."
        confirmText="Delete Testimonial"
      />
    </div>
  );
};

export default ManageTestimonials;
