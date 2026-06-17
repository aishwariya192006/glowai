import mongoose from 'mongoose';
import { applyJsonTransform } from '../utils/serialize.js';

const serviceSchema = new mongoose.Schema(
  {
    salon_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Salon', required: true },
    name: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    duration_minutes: { type: Number, required: true },
    price: { type: Number, required: true },
    original_price: Number,
    is_student_deal: { type: Boolean, default: false },
    is_popular: { type: Boolean, default: false },
    image_url: String,
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);

applyJsonTransform(serviceSchema);

export default mongoose.model('Service', serviceSchema);
