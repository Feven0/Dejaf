const ContactMessage = require('../models/ContactMessage');

async function create(req, res, next) {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }
    const doc = await ContactMessage.create({ name, email, phone, message });
    res.status(201).json({ message: 'Thank you, we will get back to you soon.', id: doc._id });
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const items = await ContactMessage.find().sort('-createdAt');
    res.json(items);
  } catch (err) {
    next(err);
  }
}

async function markRead(req, res, next) {
  try {
    const item = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isRead: req.body.isRead !== undefined ? req.body.isRead : true },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const item = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list, markRead, remove };
