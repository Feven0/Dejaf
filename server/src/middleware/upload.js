const multer = require('multer');

// Files are kept in memory and streamed straight to Cloudinary (see uploadController.js) —
// never written to local disk, since Render's free-tier filesystem is ephemeral and wipes
// on every redeploy.
const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, png, webp, svg) are allowed'));
  }
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = upload;
