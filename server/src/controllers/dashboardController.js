const Program = require('../models/Program');
const Vacancy = require('../models/Vacancy');
const ContactMessage = require('../models/ContactMessage');
const User = require('../models/User');

async function summary(req, res, next) {
  try {
    const [programCount, openVacancyCount, unreadMessageCount, userCount] = await Promise.all([
      Program.countDocuments(),
      Vacancy.countDocuments({ isOpen: true }),
      ContactMessage.countDocuments({ isRead: false }),
      User.countDocuments(),
    ]);
    res.json({ programCount, openVacancyCount, unreadMessageCount, userCount });
  } catch (err) {
    next(err);
  }
}

module.exports = { summary };
