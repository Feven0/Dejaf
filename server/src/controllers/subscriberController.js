const Subscriber = require('../models/Subscriber');

async function create(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(200).json({ message: 'You are already subscribed.' });
    }
    await Subscriber.create({ email: email.toLowerCase() });
    res.status(201).json({ message: 'Thanks for subscribing!' });
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const items = await Subscriber.find().sort('-createdAt');
    res.json(items);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const item = await Subscriber.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list, remove };
