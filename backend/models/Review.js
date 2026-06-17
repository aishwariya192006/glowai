import mongoose from 'mongoose';
import { applyJsonTransform } from '../utils/serialize.js';

const reviewSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    salon_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Salon', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
    ai_summary: String,
    is_verified: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);

applyJsonTransform(reviewSchema);

export default mongoose.model('Review', reviewSchema);
