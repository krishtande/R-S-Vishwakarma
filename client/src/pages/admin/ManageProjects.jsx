import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/ui/ConfirmModal';
import SkeletonLoader from '../../components/ui/SkeletonLoader';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [imageFiles, setImageFiles] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const [formData, setFormData] = useState({ 
    title: '', 
    clientName: '', 
    location: '', 
    description: '',
    category: 'Residential',
    featured: false,
    images: []
  });

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const openAddForm = () => {
    setEditMode(false);
    setEditId(null);
    setFormData({ title: '', clientName: '', location: '', description: '', category: 'Residential', featured: false, images: [] });
    setImageFiles([]);
    setShowForm(true);
  };

  const handleEdit = (project) => {
    setEditMode(true);
    setEditId(project._id);
    setFormData({
      title: project.title,
      clientName: project.clientName || '',
      location: project.location || '',
      description: project.description || '',
      category: project.category || 'Residential',
      featured: project.featured || false,
      images: project.images || []
    });
    setImageFiles([]);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    let uploadedImageUrls = [];
    if (imageFiles.length > 0) {
      setUploadingImage(true);
      const imgData = new FormData();
      imageFiles.forEach(file => {
        imgData.append('images', file);
      });
      
      try {
        const uploadRes = await fetch('/api/upload/multiple', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: imgData
        });
        const uploadResult = await uploadRes.json();
        if (uploadResult.success) {
          uploadedImageUrls = uploadResult.urls;
        } else {
          toast.error('Image upload failed');
          setUploadingImage(false);
          return;
        }
      } catch (err) {
        toast.error('Error uploading images');
        setUploadingImage(false);
        return;
      }
      setUploadingImage(false);
    }
    
    const finalData = { ...formData };
    if (uploadedImageUrls.length > 0) {
      // Append new images to existing images, or replace if needed.
      // Usually, when editing, we want to add to existing, or maybe replace?
      // Let's replace if new images are uploaded, or concatenate depending on requirements.
      // We will append to existing images, and cap at 20.
      finalData.images = [...(finalData.images || []), ...uploadedImageUrls].slice(0, 20);
    }
    
    try {
      const url = editMode ? `/api/projects/${editId}` : '/api/projects';
      const method = editMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(finalData)
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Project successfully ${editMode ? 'updated' : 'added'}`);
        setShowForm(false);
        fetchProjects();
      } else {
        toast.error(data.message || `Failed to ${editMode ? 'update' : 'add'} project`);
      }
    } catch (error) {
      toast.error('Error connecting to server');
    }
  };

  const confirmDelete = (id) => {
    setProjectToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    if (!projectToDelete) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/projects/${projectToDelete}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Project deleted successfully');
        fetchProjects();
      } else {
        toast.error('Failed to delete project');
      }
    } catch (error) {
      toast.error('Error connecting to server');
    } finally {
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
    }
  };

  const filteredProjects = projects.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-dark">Manage Projects</h1>
          <p className="text-gray-500">Showcase your best interior and furniture projects.</p>
        </div>
        <button onClick={openAddForm} className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-dark transition-colors flex items-center gap-2 shadow-sm">
          <Plus size={18} /> Add Project
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="flex justify-between items-center p-8 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-10">
              <h2 className="text-2xl font-bold font-heading">{editMode ? 'Edit Project' : 'Add Project'}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-full text-gray-400 hover:text-dark hover:bg-gray-100 transition-colors"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                  <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <input type="text" name="clientName" value={formData.clientName} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-white">
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Office">Office</option>
                    <option value="Hotels">Hotels</option>
                    <option value="Luxury Villas">Luxury Villas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Images (Up to 20)</label>
                <div>
                  <input type="file" accept="image/*" multiple onChange={handleImageChange} className="border border-gray-200 p-2.5 rounded-xl w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer mb-3" />
                  
                  {/* Current images preview */}
                  {formData.images?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.images.map((img, i) => (
                        <div key={i} className="relative group">
                          <img src={img} alt="Current" className="w-16 h-16 rounded-lg object-cover shadow-sm border border-gray-100" />
                          <button 
                            type="button"
                            onClick={() => {
                              const newImages = formData.images.filter((_, idx) => idx !== i);
                              setFormData({...formData, images: newImages});
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pending upload preview */}
                  {imageFiles.length > 0 && (
                    <p className="text-sm text-gray-500 mt-2">{imageFiles.length} new file(s) selected.</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" rows="4" value={formData.description} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"></textarea>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleInputChange} className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Feature this project in portfolio</label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-8">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" disabled={uploadingImage} className="px-8 py-2.5 bg-dark text-white rounded-xl font-medium tracking-wide hover:bg-accent hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 disabled:opacity-50 flex items-center gap-2">
                  {uploadingImage ? 'Uploading...' : (editMode ? 'Update Project' : 'Save Project')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-dark hidden md:block">Project Portfolio</h3>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search projects..." 
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
                <th className="px-8 py-5">Image</th>
                <th className="px-8 py-5">Title</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Location</th>
                <th className="px-8 py-5">Featured</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-0">
                    <SkeletonLoader rows={5} columns={6} />
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-500 text-base">No projects found matching your search.</td></tr>
              ) : (
                filteredProjects.map((proj) => (
                <tr key={proj._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 pl-8">
                    {proj.images && proj.images[0] ? (
                      <img src={proj.images[0]} alt={proj.title} className="w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-sm" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs">No img</div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-dark">{proj.title}</td>
                  <td className="px-6 py-4 text-gray-700">{proj.category || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-700">{proj.location || 'N/A'}</td>
                  <td className="px-6 py-4">{proj.featured ? <span className="inline-flex items-center gap-1 text-accent font-medium bg-accent/10 px-3 py-1 rounded-full text-xs">★ Yes</span> : <span className="text-gray-400">No</span>}</td>
                  <td className="px-6 py-4 pr-8 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(proj)} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-full transition-all" title="Edit"><Edit size={18} /></button>
                      <button onClick={() => confirmDelete(proj._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all" title="Delete"><Trash2 size={18} /></button>
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
        title="Delete Project"
        message="Are you sure you want to delete this project? This will remove it permanently from the portfolio."
        confirmText="Delete Project"
      />
    </div>
  );
};

export default ManageProjects;
