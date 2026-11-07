import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Project from '../models/Project.js';
import ContactMessage from '../models/ContactMessage.js';
import { isDbConnected } from '../config/db.js';
import { mockProducts, mockCategories, mockProjects, mockMessages } from '../utils/mockStore.js';

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
    try {
        if (!isDbConnected()) {
            return res.json({
                success: true,
                data: {
                    stats: {
                        products: mockProducts.length,
                        categories: mockCategories.length,
                        projects: mockProjects.length,
                        messages: mockMessages.length || 8
                    },
                    recentActivity: mockMessages.slice(0, 5),
                    chartData: [
                        { date: 'Mon', inquiries: 3 },
                        { date: 'Tue', inquiries: 5 },
                        { date: 'Wed', inquiries: 2 },
                        { date: 'Thu', inquiries: 6 },
                        { date: 'Fri', inquiries: 4 },
                        { date: 'Sat', inquiries: 7 },
                        { date: 'Sun', inquiries: 5 }
                    ]
                }
            });
        }

        const productCount = await Product.countDocuments();
        const categoryCount = await Category.countDocuments();
        const projectCount = await Project.countDocuments();
        const messageCount = await ContactMessage.countDocuments();
        const recentMessages = await ContactMessage.find().sort({ createdAt: -1 }).limit(5);

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const dailyMessages = await ContactMessage.aggregate([
            {
                $match: {
                    createdAt: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const chartData = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(sevenDaysAgo);
            date.setDate(sevenDaysAgo.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];
            const found = dailyMessages.find(d => d._id === dateStr);
            chartData.push({
                date: date.toLocaleDateString('en-US', { weekday: 'short' }),
                inquiries: found ? found.count : 0
            });
        }

        res.json({
            success: true,
            data: {
                stats: {
                    products: productCount,
                    categories: categoryCount,
                    projects: projectCount,
                    messages: messageCount
                },
                recentActivity: recentMessages,
                chartData: chartData
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
