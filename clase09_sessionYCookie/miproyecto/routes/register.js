var express = require('express');
var router = express.Router();
var registerController = require('../controllers/registerController');
let multer = require('multer');
let path = require('path');


//Multer https://www.npmjs.com/package/multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '../../public/images/avatar')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({ storage: storage });


/* GET home page. */
router.get('/', registerController.index);
router.post('/', upload.single('avatar'), registerController.store);
router.get('/edit/:id', registerController.edit);
router.post('/edit', upload.single('avatar'), registerController.update);

module.exports = router;
