import { Router } from 'express';
import User from '../models/User.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    let query = User.find().select('-password');
    if (limit) query = query.limit(Number(limit));
    const users = await query;
    res.json(users.map((u) => u.toJSON()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/upsert', async (req, res) => {
  try {
    const { email, ...rest } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { email: email.toLowerCase(), ...rest },
      { upsert: true, new: true, runValidators: true }
    );

    res.json(user.toJSON());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
