const express = require('express');
const { summary } = require('../controllers/dashboardController');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

router.get('/summary', verifyToken, requireRole('admin', 'editor'), summary);

module.exports = router;
