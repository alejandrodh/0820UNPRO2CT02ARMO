let express = require('express');
let router = express.Router();
let productsController = require('../controllers/productsController')

router.get('/', productsController.index);
router.get('/detail/:id', productsController.show);



module.exports = router;