const bcrypt = require('bcryptjs');
const db = require('../database/models');
const users = db.User;

const op = db.Sequelize.Op;

let registerController = {
    index: function(req, res){
         //Sacamos control de acceso. Lo vemos en la próxima clase.
        // if (req.session.user != undefined) {
        //     return res.redirect('/')
        // } else {
        // return res.render('register');
        // }
        return res.render('register');
    },
        
    store: function(req, res){
       let user = {
           name : req.body.name,
           email: req.body.email,
           password: bcrypt.hashSync(req.body.password, 10), 
       }
       users.create(user);

       return res.redirect('/login')

    },
    
}

module.exports = registerController;