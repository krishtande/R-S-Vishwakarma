import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: [true, 'Please add a client name']
    },
    review: {
        type: String,
        required: [true, 'Please add a review text']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    imageUrl: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
