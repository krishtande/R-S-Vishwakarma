import { useState, useEffect } from 'react';
import { Plus, Trash2, Search, X, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/ui/ConfirmModal';
import SkeletonLoader from '../../components/ui/SkeletonLoader';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({ name: '', description: '' });
  
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch categories');
      console.error('Failed to fetch categories', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const url = editMode ? `/api/categories/${editId}` : '/api/categories';
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
        toast.success(editMode ? 'Category updated successfully' : 'Category added successfully');
        setShowAddForm(false);
        setEditMode(false);
        setEditId(null);
        setFormData({ name: '', description: '' });
        fetchCategories();
      } else {
        toast.error(data.message || (editMode ? 'Failed to update category' : 'Failed to add category'));
      }
    } catch (error) {
      toast.error('Error connecting to server');
    }
  };

  const handleEdit = (cat) => {
    setEditMode(true);
    setEditId(cat._id);
    setFormData({
      name: cat.name,
      description: cat.description
    });
    setShowAddForm(true);
  };

  const confirmDelete = (id) => {
    setCategoryToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    if (!categoryToDelete) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/categories/${categoryToDelete}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Category deleted successfully');
        fetchCategories();
      } else {
        toast.error('Failed to delete category');
      }
    } catch (error) {
      toast.error('Error connecting to server');
    } finally {
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  const filteredCategories = categories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-dark">Manage Categories</h1>
          <p className="text-gray-500">Organize your products into categories.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)} 
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-dark transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-white/20">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-xl font-bold font-heading text-dark">{editMode ? 'Update Category' : 'Add Category'}</h2>
              <button onClick={() => {
                setShowAddForm(false);
                setEditMode(false);
                setFormData({ name: '', description: '' });
              }} className="p-2 rounded-full text-gray-400 hover:text-dark hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" rows="4" value={formData.description} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                <button type="button" onClick={() => {
                  setShowAddForm(false);
                  setEditMode(false);
                  setFormData({ name: '', description: '' });
                }} className="px-5 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-dark text-white rounded-xl font-medium tracking-wide hover:bg-accent transition-all shadow-sm hover:shadow-md">
                  {editMode ? 'Update Category' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-dark hidden md:block">All Categories</h3>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search categories..." 
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
                <th className="px-8 py-5">Name</th>
                <th className="px-8 py-5">ID</th>
                <th className="px-8 py-5">Description</th>
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
              ) : filteredCategories.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-12 text-center text-gray-500 text-base">No categories found matching your search.</td></tr>
              ) : (
                filteredCategories.map((cat) => (
                <tr key={cat._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-4 font-medium text-dark">{cat.name}</td>
                  <td className="px-8 py-4">
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 rounded px-2.5 py-1 border border-gray-200">{cat._id}</span>
                  </td>
                  <td className="px-8 py-4 truncate max-w-xs text-gray-600" title={cat.description}>{cat.description || <span className="text-gray-400 italic">No description</span>}</td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(cat)} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all" title="Edit Category">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => confirmDelete(cat._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all" title="Delete Category">
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
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
        confirmText="Delete Category"
      />
    </div>
  );
};

export default ManageCategories;
