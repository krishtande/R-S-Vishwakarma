import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, MessageSquare, ImageIcon, FolderGit2, TrendingUp, Users, ArrowUpRight } from 'lucide-react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const StatCard = ({ title, value, icon: Icon, gradient, delay, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 flex flex-col justify-between relative overflow-hidden group transition-all duration-300"
  >
    <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${gradient} group-hover:opacity-40 transition-opacity duration-500`}></div>
    
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${gradient} shadow-lg shadow-gray-200`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">
          <TrendingUp size={14} /> +{trend}%
        </span>
      )}
    </div>
    
    <div className="relative z-10">
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-4xl font-heading font-bold text-dark">{value}</h3>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ products: 0, categories: 0, projects: 0, messages: 0 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('adminInfo') || localStorage.getItem('userInfo'));
        const token = userInfo ? userInfo.token : '';
        
        const res = await fetch('/api/dashboard/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setStats(data.data.stats);
          setRecentActivity(data.data.recentActivity);
          if (data.data.chartData) {
            setChartData(data.data.chartData);
          }
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
     return (
       <div className="flex flex-col items-center justify-center h-[70vh]">
         <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin shadow-lg"></div>
         <p className="mt-6 text-gray-500 font-medium tracking-widest uppercase text-sm">Loading Dashboard...</p>
       </div>
     );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-heading font-bold text-dark mb-2">Overview</h1>
          <p className="text-gray-500">Welcome back! Here is your business summary for today.</p>
        </div>
        <div className="hidden md:flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-bold text-gray-600">System Online</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Products" value={stats.products} icon={Package} gradient="from-blue-600 to-blue-400" delay={0.1} />
        <StatCard title="Categories" value={stats.categories} icon={FolderGit2} gradient="from-indigo-600 to-indigo-400" delay={0.2} />
        <StatCard title="Completed Projects" value={stats.projects} icon={ImageIcon} gradient="from-[#C8A97E] to-[#8D6E63]" delay={0.3} />
        <StatCard title="Total Inquiries" value={stats.messages} icon={MessageSquare} gradient="from-emerald-600 to-emerald-400" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Visual Analytics using Recharts */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-heading font-bold text-dark">Inquiries & Leads (Last 7 Days)</h2>
            <select className="bg-gray-50 border border-gray-100 text-sm font-medium rounded-lg px-3 py-1 focus:outline-none focus:border-accent">
              <option>This Week</option>
            </select>
          </div>
          
          <div className="flex-1 w-full h-64 mt-auto">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C9A227" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#C9A227" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    cursor={{ stroke: '#f3f4f6', strokeWidth: 2, fill: 'transparent' }}
                  />
                  <Area type="monotone" dataKey="inquiries" name="New Inquiries" stroke="#C9A227" strokeWidth={3} fillOpacity={1} fill="url(#colorInquiries)" activeDot={{ r: 6, fill: '#C9A227', stroke: '#fff', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No data available for the selected period
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-heading font-bold text-dark">Recent Inquiries</h2>
            <button className="text-accent text-sm font-bold flex items-center gap-1 hover:text-dark transition-colors">
              View All <ArrowUpRight size={16} />
            </button>
          </div>
          
          <div className="space-y-6">
            {recentActivity.length > 0 ? recentActivity.map((msg, i) => (
              <div key={msg._id} className="flex gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 text-dark flex items-center justify-center font-heading font-bold text-lg shadow-sm group-hover:border-accent group-hover:text-accent transition-colors flex-shrink-0">
                  {msg.name ? msg.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <div className="font-bold text-dark text-sm mb-1">{msg.name}</div>
                  <div className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{msg.message}</div>
                  <div className="text-[10px] text-gray-400 mt-2 font-medium tracking-wide uppercase">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Users size={40} className="text-gray-200 mb-4" />
                <p className="text-gray-400 text-sm font-medium">No recent inquiries yet.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
