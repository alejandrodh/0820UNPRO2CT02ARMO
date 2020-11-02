const bcrypt = require('bcryptjs');
const db = require('../database/models');
const users = db.User;

const op = db.Sequelize.Op;

let loginController = {
    index: function(req, res){
        if(req.session.user != undefined ){
            return res.redirect('/')
        } else {
            return res.render('login');
        }        
    },
        
    login: function(req, res){
       //encontrar el email
       //Chequear que la contraseña coincida.
       users.findOne({
           where: [{ email : req.body.email }]
       })
        .then( function(user){
            //El email no está en la base de datos
            if(user == null){
                return res.send("Email incorrecto");
            } else if (bcrypt.compareSync(req.body.password, user.password) == false ){
                //EL email existe pero la contraseña está mal
                return res.send("Contraseña equivocada")
            } else if (bcrypt.compareSync(req.body.password, user.password)){
                //Coinciden las contraseñas
                req.session.user = user;

                if(req.body.rememberme != undefined){
                    res.cookie('userId', user.id, { maxAge: 1000 * 60 * 5 });
                    return res.redirect('/');
                }

                return res.redirect('/');
            }
            
            return res.redirect('/');
            
        })
        .catch( e => console.log(e))

    },
    
}

module.exports = loginController;