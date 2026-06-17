import { Router } from 'express';
import Service from '../models/Service.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { salon_id, is_student_deal, category, min_price, max_price } = req.query;
    const filter = {};

    if (salon_id) filter.salon_id = salon_id;
    if (is_student_deal === 'true') filter.is_student_deal = true;
    if (category) filter.category = category;
    if (min_price || max_price) {
      filter.price = {};
      if (min_price) filter.price.$gte = Number(min_price);
      if (max_price) filter.price.$lte = Number(max_price);
    }

    const services = await Service.find(filter)
      .populate('salon_id')
      .sort({ price: 1 })
      .lean();

    res.json(
      services.map((s) => {
        const salon = s.salon_id;
        return {
          ...s,
          id: s._id.toString(),
          salon_id: salon?._id?.toString() || s.salon_id?.toString(),
          salons: salon
            ? {
                ...salon,
                id: salon._id.toString(),
                _id: undefined,
                __v: undefined,
              }
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

export default router;
