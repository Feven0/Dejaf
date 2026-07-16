const express = require('express');
const programController = require('../controllers/programController');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', programController.list);
router.get('/categories', programController.categories);
router.get('/:id', programController.getOne);

router.post('/', verifyToken, requireRole('admin', 'editor'), programController.create);
router.put('/:id', verifyToken, requireRole('admin', 'editor'), programController.update);
router.delete('/:id', verifyToken, requireRole('admin', 'editor'), programController.remove);

module.exports = router;
