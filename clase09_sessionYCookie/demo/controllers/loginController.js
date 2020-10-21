const db = require('../database/models')
const users = db.User; //Debe ser el alias del modelo.

const op = db.Sequelize.Op;

let loginController = {
    index: function (req, res) {
        return res.send('register')
    },
    login: function (req, res) {
        //your code here
    }

}


module.exports = loginController;