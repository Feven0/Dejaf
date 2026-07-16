const slugify = require('slugify');
const Program = require('../models/Program');

async function uniqueSlug(title, excludeId) {
  const base = slugify(title, { lower: true, strict: true });
  let slug = base;
  let i = 1;
  while (await Program.findOne({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) {
    slug = `${base}-${i++}`;
  }
  return slug;
}

async function list(req, res, next) {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.featured) filter.featured = req.query.featured === 'true';
    const items = await Program.find(filter).sort('order title');
    res.json(items);
  } catch (err) {
    next(err);
  }
}

async function categories(req, res) {
  res.json(Program.CATEGORIES);
}

async function getOne(req, res, next) {
  try {
    const item = await Program.findOne({
      $or: [{ _id: req.params.id }, { slug: req.params.id }],
    });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const slug = await uniqueSlug(req.body.title);
    const item = await Program.create({ ...req.body, slug });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const body = { ...req.body };
    if (body.title) {
      body.slug = await uniqueSlug(body.title, req.params.id);
    }
    const item = await Program.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const item = await Program.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, categories, getOne, create, update, remove };
