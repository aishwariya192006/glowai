import mongoose from 'mongoose';
import { applyJsonTransform } from '../utils/serialize.js';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    icon: String,
    description: String,
    sort_order: { type: Number, default: 0 },
  },
  { timestamps: false }
);

applyJsonTransform(categorySchema);

export default mongoose.model('Category', categorySchema);
