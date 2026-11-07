import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a project title']
    },
    category: {
        type: String,
        enum: ['Residential', 'Commercial', 'Office', 'Hotels', 'Luxury Villas'],
        default: 'Residential'
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    clientName: {
        type: String
    },
    location: {
        type: String
    },
    featured: {
        type: Boolean,
        default: false
    },
    completionDate: {
        type: Date
    }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
