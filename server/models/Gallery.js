import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: [true, 'Please add an image URL']
    },
    caption: {
        type: String
    },
    category: {
        type: String,
        enum: ['Residential', 'Commercial', 'Office', 'Hotels', 'Luxury Villas'],
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);
