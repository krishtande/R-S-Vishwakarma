import mongoose from 'mongoose';

const transformationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  beforeImage: {
    type: String,
    required: true,
  },
  afterImage: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

export default mongoose.model('Transformation', transformationSchema);
