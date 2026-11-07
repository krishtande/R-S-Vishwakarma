import Blog from '../models/Blog.js';
import { isDbConnected } from '../config/db.js';
import { mockBlogs } from '../utils/mockStore.js';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res) => {
    try {
        const pageSize = Number(req.query.pageSize) || 9;
        const page = Number(req.query.pageNumber) || 1;
        const keyword = req.query.keyword ? req.query.keyword.trim().toLowerCase() : '';

        if (!isDbConnected()) {
            let filtered = [...mockBlogs];
            if (keyword) {
                filtered = filtered.filter(b =>
                    b.title.toLowerCase().includes(keyword) ||
                    b.content.toLowerCase().includes(keyword) ||
                    (b.excerpt && b.excerpt.toLowerCase().includes(keyword))
                );
            }
            const count = filtered.length;
            const start = (page - 1) * pageSize;
            const paginated = filtered.slice(start, start + pageSize);

            return res.json({
                success: true,
                data: paginated,
                page,
                pages: Math.ceil(count / pageSize) || 1,
                total: count
            });
        }

        const isAdminQuery = req.query.admin === 'true';
        const query = isAdminQuery ? {} : { published: true };
        if (keyword) {
            query.title = { $regex: keyword, $options: 'i' };
        }

        const count = await Blog.countDocuments(query);
        const blogs = await Blog.find(query)
            .sort({ createdAt: -1 })
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({
            success: true,
            data: blogs,
            page,
            pages: Math.ceil(count / pageSize) || 1,
            total: count
        });
    } catch (error) {
        res.json({
            success: true,
            data: mockBlogs,
            page: 1,
            pages: 1,
            total: mockBlogs.length
        });
    }
};

// @desc    Get single blog by slug or ID
// @route   GET /api/blogs/:id
// @access  Public
export const getBlogById = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const blog = mockBlogs.find(b => b._id === req.params.id || b.slug === req.params.id);
            if (blog) {
                return res.json({ success: true, data: blog });
            }
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        let blog = await Blog.findById(req.params.id);
        if (!blog) {
            blog = await Blog.findOne({ slug: req.params.id });
        }

        if (blog) {
            res.json({ success: true, data: blog });
        } else {
            res.status(404).json({ success: false, message: 'Blog not found' });
        }
    } catch (error) {
        const blog = mockBlogs.find(b => b._id === req.params.id || b.slug === req.params.id);
        if (blog) return res.json({ success: true, data: blog });
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const newBlog = {
                _id: 'blog_' + Date.now(),
                ...req.body,
                createdAt: new Date().toISOString()
            };
            mockBlogs.unshift(newBlog);
            return res.status(201).json({ success: true, data: newBlog });
        }

        const blog = await Blog.create(req.body);
        res.status(201).json({ success: true, data: blog });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const idx = mockBlogs.findIndex(b => b._id === req.params.id || b.slug === req.params.id);
            if (idx !== -1) {
                mockBlogs[idx] = { ...mockBlogs[idx], ...req.body };
                return res.json({ success: true, data: mockBlogs[idx] });
            }
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (blog) {
            res.json({ success: true, data: blog });
        } else {
            res.status(404).json({ success: false, message: 'Blog not found' });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const idx = mockBlogs.findIndex(b => b._id === req.params.id || b.slug === req.params.id);
            if (idx !== -1) {
                mockBlogs.splice(idx, 1);
                return res.json({ success: true, message: 'Blog removed' });
            }
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        const blog = await Blog.findById(req.params.id);
        if (blog) {
            await blog.deleteOne();
            res.json({ success: true, message: 'Blog removed' });
        } else {
            res.status(404).json({ success: false, message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
