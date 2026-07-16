const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// User management is admin-only.
router.use(verifyToken, requireRole('admin'));

router.get('/', userController.list);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = router;
