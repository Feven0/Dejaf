const express = require('express');
const subscriberController = require('../controllers/subscriberController');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

router.post('/', subscriberController.create);
router.get('/', verifyToken, requireRole('admin', 'editor'), subscriberController.list);
router.delete('/:id', verifyToken, requireRole('admin', 'editor'), subscriberController.remove);

module.exports = router;
