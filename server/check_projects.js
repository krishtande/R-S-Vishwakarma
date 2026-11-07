import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rsvishwakarma')
  .then(async () => {
    const Project = mongoose.connection.collection('projects');
    const docs = await Project.find({}).toArray();
    console.log(JSON.stringify(docs.map(p => ({ title: p.title, images: p.images })), null, 2));
    process.exit(0);
  });
