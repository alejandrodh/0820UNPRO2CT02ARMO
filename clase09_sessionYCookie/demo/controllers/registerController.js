const db = require('../database/models')
const users = db.User; //Debe ser el alias del modelo.

const op = db.Sequelize.Op;

let registerController = {
    index: function(req, res){
        return res.send('register')
    },
    register: function(req,res){
        //your code here
    }

}


module.exports = registerController;