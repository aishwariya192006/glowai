import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

console.log('Attempting to connect to MongoDB with URI:', uri.replace(/:([^:@]{3,})@/, ':****@'));

mongoose.connect(uri)
  .then(() => {
    console.log('SUCCESS: MongoDB Connected perfectly!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('ERROR CONNECTING TO MONGODB:');
    console.error(err);
    process.exit(1);
  });
