const express = require('express');
const settingsController = require('../controllers/settingsController');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', settingsController.get);
router.put('/', verifyToken, requireRole('admin', 'editor'), settingsController.update);

module.exports = router;
