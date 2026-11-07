import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rsvcompany')
  .then(async () => {
    const Transformation = mongoose.connection.collection('transformations');
    const docs = await Transformation.find({}).toArray();
    console.log(JSON.stringify(docs, null, 2));
    process.exit(0);
  });
