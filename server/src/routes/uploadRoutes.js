const express = require('express');
const upload = require('../middleware/upload');
const { verifyToken, requireRole } = require('../middleware/auth');
const { handleUpload } = require('../controllers/uploadController');

const router = express.Router();

router.post('/', verifyToken, requireRole('admin', 'editor'), upload.single('file'), handleUpload);

module.exports = router;
