var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/', loginController.index);
router.post('/', loginController.login);

module.exports = router;