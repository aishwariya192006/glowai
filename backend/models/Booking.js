import mongoose from 'mongoose';
import { applyJsonTransform } from '../utils/serialize.js';

const bookingSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    salon_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Salon', required: true },
    service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    booking_date: { type: String, required: true },
    booking_time: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'confirmed',
    },
    total_price: Number,
    notes: String,
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

applyJsonTransform(bookingSchema);

export default mongoose.model('Booking', bookingSchema);
