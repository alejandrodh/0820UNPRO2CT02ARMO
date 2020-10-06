const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/', moviesController.index);
router.get('/detalle/:id', moviesController.show);
router.get('/search/:searchData', moviesController.search);


module.exports = router;