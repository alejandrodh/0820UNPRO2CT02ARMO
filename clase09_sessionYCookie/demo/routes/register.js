var express = require('express');
var router = express.Router();

/* GET register listing. */
router.get('/', registerController.index);
router.post('/', registerController.register);

module.exports = router;
