let express = require('express');
let router = express.Router();
let productsController = require('../controllers/productsController')

router.get('/', productsController.index);
router.get('/marca/:marca', productsController.porMarca)
router.get('/color/:color',productsController.porColor)



module.exports = router;