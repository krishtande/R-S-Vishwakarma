import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a category name'],
        unique: true,
        trim: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);
