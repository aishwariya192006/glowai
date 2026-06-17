import mongoose from 'mongoose';
import { applyJsonTransform } from '../utils/serialize.js';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, select: false },
    name: { type: String, required: true },
    phone: String,
    avatar_url: String,
    role: { type: String, enum: ['customer', 'salon_owner', 'admin'], default: 'customer' },
    glow_score: { type: Number, default: 0 },
    hair_score: { type: Number, default: 0 },
    skin_score: { type: Number, default: 0 },
    confidence_score: { type: Number, default: 0 },
    beauty_concerns: { type: [String], default: [] },
    skin_type: String,
    hair_type: String,
    preferred_styles: { type: [String], default: [] },
    is_student: { type: Boolean, default: false },
    location: { type: String, default: '' },
    college: { type: String, default: '' },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

applyJsonTransform(userSchema);

export default mongoose.model('User', userSchema);
