import { Router } from 'express';
import Salon from '../models/Salon.js';
import Service from '../models/Service.js';

const router = Router();

function buildSort(sort) {
  switch (sort) {
    case 'trust':
      return { trust_score: -1 };
    case 'popular':
      return { review_count: -1 };
    case 'price_low':
      return { price_range: 1 };
    case 'price_high':
      return { price_range: -1 };
    default:
      return { rating: -1 };
  }
}

router.get('/', async (req, res) => {
  try {
    const {
      search,
      area,
      price_range,
      min_rating,
      is_women_owned,
      is_verified,
      min_review_count,
      sort,
      limit,
    } = req.query;

    const filter = {};

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [{ name: regex }, { description: regex }, { area: regex }];
    }
    if (area) filter.area = area;
    if (price_range) filter.price_range = price_range;
    if (min_rating) filter.rating = { $gte: Number(min_rating) };
    if (is_women_owned === 'true') filter.is_women_owned = true;
    if (is_verified === 'true') filter.is_verified = true;
    if (min_review_count) filter.review_count = { $gte: Number(min_review_count) };

    let query = Salon.find(filter).sort(buildSort(sort));
    if (limit) query = query.limit(Number(limit));

    const salons = await query.lean();
    res.json(
      salons.map((s) => ({
        ...s,
        id: s._id.toString(),
        _id: undefined,
        __v: undefined,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id);
    if (!salon) return res.status(404).json({ error: 'Salon not found' });
    res.json(salon.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const salon = await Salon.create(req.body);
    res.status(201).json(salon.toJSON());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
