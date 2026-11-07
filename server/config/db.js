import mongoose from 'mongoose';

// Disable Mongoose command buffering so queries don't freeze for 10s when DB is not connected
mongoose.set('bufferCommands', false);

export const isDbConnected = () => mongoose.connection.readyState === 1;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, { 
            serverSelectionTimeoutMS: 2000,
            connectTimeoutMS: 2000
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.warn(`MongoDB Notice: ${error.message}. Running server with built-in in-memory dataset.`);
    }
};

export default connectDB;
