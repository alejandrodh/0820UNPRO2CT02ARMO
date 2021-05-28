const bcrypt = require('bcryptjs');
const db = require('../database/models');
const users = db.User;

const op = db.Sequelize.Op;

let loginController = {
    index: function(req, res){
        //Control de acceso a Login
        if(req.session.user != undefined ){
            return res.redirect('/')
        } else {
            return res.render('login');
        }        
    },
    //login con validaciones para la siguiente clase   
    login: function(req, res){
       //1 encontrar el email
       //2 Chequear que la contraseña coincida.
       users.findOne({
           where: [{ email : req.body.email }]
       })
        .then( function(user){
            let errors = {};
            //El email no está en la base de datos
            if(user == null){
                errors.login = "Email incorrecto";
                res.locals.errors = errors;
                
                return res.render('login');
            } else if (bcrypt.compareSync(req.body.password, user.password) == false ){
                //EL email existe pero la contraseña está mal
                errors.login = "Contraseña equivocada";
                res.locals.errors = errors;
                
                return res.render('login');
            } else {
                //El email existe y coinciden las contraseñas
                req.session.user = user;

                if(req.body.rememberme != undefined){
                    res.cookie('userId', user.id, { maxAge: 1000 * 60 * 5 });
                }
            }
            
            return res.redirect('/');
            
        })
        .catch( e => console.log(e))

    },    
    logout: function(req, res){
        req.session.destroy();
        res.clearCookie('userId');

        return res.redirect('/');
    }
    
}

module.exports = loginController;