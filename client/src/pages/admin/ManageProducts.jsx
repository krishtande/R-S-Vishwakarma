import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/ui/ConfirmModal';
import SkeletonLoader from '../../components/ui/SkeletonLoader';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [categories, setCategories] = useState([]);

  // Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: 0,
    dimensions: '',
    featured: false,
    images: []
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch products');
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setEditId(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category?._id || product.category || '',
      stock: product.stock,
      dimensions: product.dimensions || '',
      featured: product.featured,
      images: product.images || []
    });
    setImageFile(null);
    setShowForm(true);
  };

  const openAddForm = () => {
    setEditMode(false);
    setEditId(null);
    setFormData({ name: '', description: '', price: '', category: '', stock: 0, dimensions: '', featured: false, images: [] });
    setImageFile(null);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    let uploadedImageUrl = null;
    if (imageFile) {
      setUploadingImage(true);
      const imgData = new FormData();
      imgData.append('image', imageFile);
      
      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: imgData
        });
        const uploadResult = await uploadRes.json();
        if (uploadResult.success) {
          uploadedImageUrl = uploadResult.url;
        } else {
          toast.error('Image upload failed');
          setUploadingImage(false);
          return;
        }
      } catch (err) {
        toast.error('Error uploading image');
        setUploadingImage(false);
        return;
      }
      setUploadingImage(false);
    }
    
    const finalData = { ...formData };
    if (uploadedImageUrl) {
      finalData.images = [uploadedImageUrl];
    }
    
    try {
      const url = editMode ? `/api/products/${editId}` : '/api/products';
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
        toast.success(`Product successfully ${editMode ? 'updated' : 'added'}`);
        setShowForm(false);
        fetchProducts(); // Refresh list
      } else {
        toast.error(data.message || `Failed to ${editMode ? 'update' : 'add'} product`);
      }
    } catch (error) {
      toast.error('Error connecting to server');
    }
  };

  const confirmDelete = (id) => {
    setProductToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    if (!productToDelete) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/products/${productToDelete}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success('Product deleted successfully');
        fetchProducts();
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      toast.error('Error connecting to server');
    } finally {
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-dark">Manage Products</h1>
          <p className="text-gray-500">Add, edit, or remove furniture products.</p>
        </div>
        <button 
          onClick={openAddForm}
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-dark transition-colors flex items-center gap-2 shadow-sm hover:shadow-md"
        >
          <Plus size={18} /> Add New Product
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="flex justify-between items-center p-8 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-10">
              <h2 className="text-2xl font-bold font-heading text-dark">{editMode ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-full text-gray-400 hover:text-dark hover:bg-gray-100 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input type="number" name="price" required value={formData.price} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select name="category" required value={formData.category} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-white">
                    <option value="">Select Category...</option>
                    {categories.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input type="number" name="stock" required value={formData.stock} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions (e.g. 50x50x40 cm)</label>
                  <input type="text" name="dimensions" value={formData.dimensions} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" rows="4" required value={formData.description} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                <div className="flex items-center gap-4">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="border border-gray-200 p-2.5 rounded-xl w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer" />
                  {formData.images?.length > 0 && !imageFile && (
                    <img src={formData.images[0]} alt="Current" className="w-14 h-14 rounded-lg object-cover shadow-sm border border-gray-100" />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleInputChange} className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Feature this product on the homepage</label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-8">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" disabled={uploadingImage} className="px-8 py-2.5 bg-dark text-white rounded-xl font-medium tracking-wide hover:bg-accent hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 disabled:opacity-50 flex items-center gap-2">
                  {uploadingImage ? 'Uploading...' : (editMode ? 'Update Product' : 'Save Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-dark hidden md:block">Product Inventory</h3>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
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
                <th className="px-8 py-5">Product Name</th>
                <th className="px-8 py-5">Price</th>
                <th className="px-8 py-5">Stock</th>
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
              ) : filteredProducts.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-500 text-base">No products found matching your search.</td></tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 pl-8">
                      {product.images && product.images[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-sm" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs">No img</div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-dark">{product.name}</td>
                    <td className="px-6 py-4 font-medium text-gray-700">₹{product.price?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {product.featured ? <span className="inline-flex items-center gap-1 text-accent font-medium bg-accent/10 px-3 py-1 rounded-full text-xs">★ Yes</span> : <span className="text-gray-400">No</span>}
                    </td>
                    <td className="px-6 py-4 pr-8 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(product)} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-full transition-all" title="Edit">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => confirmDelete(product._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all" title="Delete">
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
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone and will permanently remove it from the inventory."
        confirmText="Delete Product"
      />
    </div>
  );
};

export default ManageProducts;
