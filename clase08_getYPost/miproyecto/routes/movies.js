const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/', moviesController.index);
router.get('/detalle/:id', moviesController.show);
router.post('/detalle/:id', moviesController.destroy);
router.get('/search', moviesController.search);
router.get('/create', moviesController.add);
router.post('/create', moviesController.store);

router.get('/edit/:id', moviesController.edit);
router.post('/edit/:id', moviesController.update);


module.exports = router;