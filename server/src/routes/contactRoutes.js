const express = require('express');
const contactController = require('../controllers/contactController');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

router.post('/', contactController.create);

router.get('/', verifyToken, requireRole('admin', 'editor'), contactController.list);
router.patch('/:id/read', verifyToken, requireRole('admin', 'editor'), contactController.markRead);
router.delete('/:id', verifyToken, requireRole('admin', 'editor'), contactController.remove);

module.exports = router;
