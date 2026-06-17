import { Router } from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import User from '../models/User.js';

const router = Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, phone, is_student } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashed,
      name,
      phone,
      is_student: Boolean(is_student),
      glow_score: Math.floor(Math.random() * 30) + 60,
      hair_score: Math.floor(Math.random() * 30) + 60,
      skin_score: Math.floor(Math.random() * 30) + 60,
      confidence_score: Math.floor(Math.random() * 30) + 60,
    });

    res.status(201).json(user.toJSON());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json(user.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- OAuth Routes ---

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login?error=oauth_failed' }),
  (req, res) => {
    const FRONTEND_URL = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${FRONTEND_URL}/oauth-callback?user_id=${req.user._id}`);
  }
);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: 'http://localhost:5173/login?error=oauth_failed' }),
  (req, res) => {
    const FRONTEND_URL = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${FRONTEND_URL}/oauth-callback?user_id=${req.user._id}`);
  }
);

export default router;
