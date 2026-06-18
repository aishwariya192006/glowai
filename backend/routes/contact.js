import { Router } from 'express';
import ContactMessage from '../models/ContactMessage.js';

const router = Router();

// POST /api/contact — submit a contact message
router.post('/', async (req, res) => {
  try {
    const { full_name, email, subject, message } = req.body;

    // Validate required fields
    const errors = [];
    if (!full_name || !full_name.trim()) errors.push('Full name is required');
    if (!email || !email.trim()) errors.push('Email is required');
    if (!subject || !subject.trim()) errors.push('Subject is required');
    if (!message || !message.trim()) errors.push('Message is required');

    // Validate email format
    if (email && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      errors.push('Please provide a valid email address');
    }

    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(', ') });
    }

    const contactMessage = await ContactMessage.create({
      full_name: full_name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting GlowAI. We will get back to you soon.',
      data: contactMessage.toJSON(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/contact — retrieve all contact messages (for admin)
router.get('/', async (_req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ created_at: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
