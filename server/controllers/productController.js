import Product from '../models/Product.js';
import { isDbConnected } from '../config/db.js';
import { mockProducts, mockCategories } from '../utils/mockStore.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const pageSize = Number(req.query.pageSize) || 12;
        const page = Number(req.query.pageNumber) || 1;
        const keyword = req.query.keyword ? req.query.keyword.trim().toLowerCase() : '';
        const categoryId = req.query.category || '';
        const minPrice = req.query.minPrice ? Number(req.query.minPrice) : null;
        const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : null;

        if (!isDbConnected()) {
            let filtered = [...mockProducts];

            if (keyword) {
                filtered = filtered.filter(p => 
                    p.name.toLowerCase().includes(keyword) || 
                    p.description.toLowerCase().includes(keyword) ||
                    (p.material && p.material.toLowerCase().includes(keyword))
                );
            }

            if (categoryId) {
                filtered = filtered.filter(p => 
                    p.category && (p.category._id === categoryId || p.category.name === categoryId)
                );
            }

            if (minPrice !== null && !isNaN(minPrice)) {
                filtered = filtered.filter(p => p.price >= minPrice);
            }

            if (maxPrice !== null && !isNaN(maxPrice)) {
                filtered = filtered.filter(p => p.price <= maxPrice);
            }

            const total = filtered.length;
            const start = (page - 1) * pageSize;
            const paginated = filtered.slice(start, start + pageSize);

            return res.json({
                success: true,
                data: paginated,
                page,
                pages: Math.ceil(total / pageSize) || 1,
                count: total
            });
        }

        const filterObj = {};
        if (keyword) {
            filterObj.name = { $regex: keyword, $options: 'i' };
        }
        if (categoryId) {
            filterObj.category = categoryId;
        }
        if (minPrice !== null || maxPrice !== null) {
            filterObj.price = {};
            if (minPrice !== null) filterObj.price.$gte = minPrice;
            if (maxPrice !== null) filterObj.price.$lte = maxPrice;
        }

        const count = await Product.countDocuments(filterObj);
        const products = await Product.find(filterObj)
            .populate('category')
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({
            success: true,
            data: products,
            page,
            pages: Math.ceil(count / pageSize) || 1,
            count
        });
    } catch (error) {
        console.error('getProducts error, returning fallback:', error.message);
        res.json({
            success: true,
            data: mockProducts,
            page: 1,
            pages: 1,
            count: mockProducts.length
        });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const product = mockProducts.find(p => p._id === req.params.id);
            if (product) {
                return res.json({ success: true, data: product });
            }
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const product = await Product.findById(req.params.id).populate('category');
        if (product) {
            res.json({ success: true, data: product });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        const product = mockProducts.find(p => p._id === req.params.id);
        if (product) return res.json({ success: true, data: product });
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const newProd = {
                _id: 'prod_' + Date.now(),
                ...req.body,
                createdAt: new Date().toISOString()
            };
            mockProducts.unshift(newProd);
            return res.status(201).json({ success: true, data: newProd });
        }

        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const idx = mockProducts.findIndex(p => p._id === req.params.id);
            if (idx !== -1) {
                mockProducts[idx] = { ...mockProducts[idx], ...req.body };
                return res.json({ success: true, data: mockProducts[idx] });
            }
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (product) {
            res.json({ success: true, data: product });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const idx = mockProducts.findIndex(p => p._id === req.params.id);
            if (idx !== -1) {
                mockProducts.splice(idx, 1);
                return res.json({ success: true, message: 'Product removed' });
            }
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ success: true, message: 'Product removed' });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
