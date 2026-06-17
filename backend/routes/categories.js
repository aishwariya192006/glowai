import { Router } from 'express';
import Category from '../models/Category.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const categories = await Category.find().sort({ sort_order: 1 });
    res.json(categories.map((c) => c.toJSON()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
