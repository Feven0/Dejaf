const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function list(req, res, next) {
  try {
    const users = await User.find().select('-passwordHash').sort('name');
    res.json(users);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'A user with that email already exists' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: role === 'admin' ? 'admin' : 'editor',
    });
    res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { name, email, password, role } = req.body;
    const update = {};
    if (name) update.name = name;
    if (email) update.email = email.toLowerCase();
    if (role) update.role = role === 'admin' ? 'admin' : 'editor';
    if (password) update.passwordHash = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    }).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    if (req.params.id === String(req.user._id)) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, create, update, remove };
