const express = require('express');
const { verifyToken, requireRole } = require('../middleware/auth');
const makeCrudController = require('../controllers/crudFactory');

// Builds a public-read / admin+editor-write router for a simple flat Model.
function makeCrudRouter(Model, opts) {
  const router = express.Router();
  const controller = makeCrudController(Model, opts);

  router.get('/', controller.list);
  router.get('/:id', controller.getOne);

  router.post('/', verifyToken, requireRole('admin', 'editor'), controller.create);
  router.put('/:id', verifyToken, requireRole('admin', 'editor'), controller.update);
  router.delete('/:id', verifyToken, requireRole('admin', 'editor'), controller.remove);

  return router;
}

module.exports = makeCrudRouter;
