import { useState, useEffect } from 'react';
import { Trash2, Search, Mail, MailOpen, Phone, CheckCircle2, Clock, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/ui/ConfirmModal';
import SkeletonLoader from '../../components/ui/SkeletonLoader';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Quotes'); // 'Quotes' or 'Messages'
  
  // Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  const fetchMessages = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch('/api/messages', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch messages');
      console.error('Failed to fetch messages', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (id, currentIsRead) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ isRead: !currentIsRead })
      });
      const data = await res.json();
      if (data.success) {
        fetchMessages();
      }
    } catch (error) {
      toast.error('Error updating status');
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Quote marked as ${newStatus}`);
        fetchMessages();
      }
    } catch (error) {
      toast.error('Error updating status');
    }
  };

  const confirmDelete = (id) => {
    setMessageToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    if (!messageToDelete) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/messages/${messageToDelete}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Deleted successfully');
        fetchMessages();
      } else {
        toast.error('Failed to delete');
      }
    } catch (error) {
      toast.error('Error connecting to server');
    } finally {
      setIsDeleteModalOpen(false);
      setMessageToDelete(null);
    }
  };

  // Default type to 'Message' if missing (for older data)
  const filteredData = messages.filter(m => {
    const type = m.type || 'Message';
    if (activeTab === 'Quotes' && type !== 'Quote') return false;
    if (activeTab === 'Messages' && type !== 'Message') return false;
    
    return (
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-dark">Lead Management</h1>
          <p className="text-gray-500">Manage Quote Requests and Contact Messages.</p>
        </div>
        
        <div className="flex bg-white rounded-xl shadow-sm p-1 border border-gray-100">
          <button 
            onClick={() => setActiveTab('Quotes')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'Quotes' ? 'bg-dark text-white shadow-md' : 'text-gray-500 hover:text-dark'}`}
          >
            Quote Requests
          </button>
          <button 
            onClick={() => setActiveTab('Messages')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'Messages' ? 'bg-dark text-white shadow-md' : 'text-gray-500 hover:text-dark'}`}
          >
            General Messages
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all" 
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">{activeTab === 'Quotes' ? 'Lead Status' : 'Read Status'}</th>
                <th className="px-6 py-4">Client Details</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-0">
                    <SkeletonLoader rows={5} columns={5} />
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500">No {activeTab.toLowerCase()} found.</td></tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item._id} className={`hover:bg-gray-50/50 transition-colors ${!item.isRead ? 'bg-blue-50/10' : ''}`}>
                    <td className="px-6 py-4">
                      {activeTab === 'Quotes' ? (
                        <select
                          value={item.status || 'Pending'}
                          onChange={(e) => handleUpdateStatus(item._id, e.target.value)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-full border focus:outline-none ${
                            item.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
                            item.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            'bg-yellow-50 text-yellow-700 border-yellow-200'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      ) : (
                        <button 
                          onClick={() => handleToggleRead(item._id, item.isRead)}
                          className={`p-2 rounded-full transition-all hover:scale-110 ${!item.isRead ? 'text-blue-500 bg-blue-100 shadow-sm' : 'text-gray-400 bg-gray-100 hover:bg-gray-200'}`}
                          title={!item.isRead ? 'Mark as read' : 'Mark as unread'}
                        >
                          {!item.isRead ? <Mail size={16} /> : <MailOpen size={16} />}
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-dark">{item.name}</div>
                      <div className="text-gray-500 text-xs mt-1 flex flex-col gap-1">
                        <span className="flex items-center gap-1"><Mail size={10} /> {item.email}</span>
                        {item.phone && <span className="flex items-center gap-1"><Phone size={10} /> {item.phone}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs md:max-w-md">
                      <div className="whitespace-pre-wrap text-gray-600 text-xs overflow-y-auto max-h-24 custom-scrollbar pr-2 leading-relaxed">
                        {item.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs font-medium">
                      {new Date(item.createdAt).toLocaleDateString()}<br/>
                      <span className="text-gray-400">{new Date(item.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => confirmDelete(item._id)} 
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
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
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  );
};

export default ManageMessages;
