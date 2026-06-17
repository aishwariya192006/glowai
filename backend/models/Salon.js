import mongoose from 'mongoose';
import { applyJsonTransform } from '../utils/serialize.js';

const salonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    address: { type: String, required: true },
    city: { type: String, default: 'Chennai' },
    area: { type: String, required: true },
    phone: String,
    email: String,
    website: String,
    logo_url: String,
    gallery_urls: { type: [String], default: [] },
    rating: { type: Number, default: 0 },
    review_count: { type: Number, default: 0 },
    price_range: { type: String, enum: ['budget', 'moderate', 'premium'], default: 'moderate' },
    is_women_owned: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    trust_score: { type: Number, default: 50 },
    features: { type: [String], default: [] },
    opening_time: { type: String, default: '09:00' },
    closing_time: { type: String, default: '21:00' },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

applyJsonTransform(salonSchema);

export default mongoose.model('Salon', salonSchema);
