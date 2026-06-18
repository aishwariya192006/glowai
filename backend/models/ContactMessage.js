import mongoose from 'mongoose';
import { applyJsonTransform } from '../utils/serialize.js';

const contactMessageSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

applyJsonTransform(contactMessageSchema);

export default mongoose.model('ContactMessage', contactMessageSchema);
