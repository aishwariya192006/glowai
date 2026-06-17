import { Router } from 'express';
import Review from '../models/Review.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { salon_id, limit } = req.query;
    const filter = {};
    if (salon_id) filter.salon_id = salon_id;

    let query = Review.find(filter).sort({ created_at: -1 });
    if (limit) query = query.limit(Number(limit));

    const reviews = await query;
    res.json(reviews.map((r) => r.toJSON()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
