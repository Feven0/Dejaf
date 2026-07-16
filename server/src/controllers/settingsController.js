const SiteSettings = require('../models/SiteSettings');

async function get(req, res, next) {
  try {
    const settings = await SiteSettings.getSingleton();
    res.json(settings);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const settings = await SiteSettings.getSingleton();
    Object.assign(settings, req.body);
    await settings.save();
    res.json(settings);
  } catch (err) {
    next(err);
  }
}

module.exports = { get, update };
