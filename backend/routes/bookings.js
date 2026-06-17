import { Router } from 'express';
import Booking from '../models/Booking.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { user_id, limit } = req.query;
    const filter = {};
    if (user_id) filter.user_id = user_id;

    let query = Booking.find(filter)
      .populate('salon_id')
      .populate('service_id')
      .sort({ booking_date: -1, created_at: -1 });

    if (limit) query = query.limit(Number(limit));

    const bookings = await query.lean();

    res.json(
      bookings.map((b) => {
        const salon = b.salon_id;
        const service = b.service_id;
        return {
          ...b,
          id: b._id.toString(),
          user_id: b.user_id?.toString(),
          salon_id: salon?._id?.toString() || b.salon_id?.toString(),
          service_id: service?._id?.toString() || b.service_id?.toString(),
          salons: salon
            ? { ...salon, id: salon._id.toString(), _id: undefined, __v: undefined }
            : undefined,
          services: service
            ? { ...service, id: service._id.toString(), _id: undefined, __v: undefined }
            : undefined,
          _id: undefined,
          __v: undefined,
        };
      })
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking.toJSON());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
