import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    content: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true,
        maxLength: 500
    },
    coverImage: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Admin'
    },
    tags: [{
        type: String,
        trim: true
    }],
    published: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
