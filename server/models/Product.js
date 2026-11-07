import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    material: {
        type: String,
        default: 'Wood'
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    stock: {
        type: Number,
        default: 0
    },
    dimensions: {
        type: String
    },
    images: [{
        type: String, // URLs of images
    }],
    featured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
