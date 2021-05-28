const bcrypt = require('bcryptjs');
const db = require('../database/models');
const users = db.User;

const op = db.Sequelize.Op;

let registerController = {
    index: function(req, res){
        //Control de acceso a Login
        if (req.session.user != undefined) {
            return res.redirect('/')
        } else {
        return res.render('register');
        }
    },
        
    store: function(req, res){
        //1 Creamos una varable para guardar los errores del form
        let errors = {};

        //2 chequeamos que los campos obligatorios traigan datos
        //2.1 que el email no venga vacío:
        if(req.body.email == ""){
            errors.register = "Email no puede estar vacío.";
            res.locals.errors = errors;

            return res.render('register');

        } else if (req.body.password == ""){
            //2.2 chequeamos que el password no venga vacío:
            errors.register = "Password no puede estar vacío";
            res.locals.errors = errors;

            return res.render('register');
        } else if (req.body.retypePassword == ""){
            //2.3 chequeamos que el retypepassword no venga vacío:
            errors.register = "Retype Password no puede estar vacío";
            res.locals.errors = errors;

            return res.render('register');
            //3 Si los campos obligatorios están todos con datos entonces validamos si el email está libre en la db.
        } else {
            //Descartado que los campos tienen datos ahora debenos chequear que el email no estñe en la db. Para ello consultamos si hay un usuario con ese email.
            users.findOne({
                where: [{ email : req.body.email }]
             })
                .then( function(user){
                    //3.1 Si el find devuelve un usuario es que el email ya existe
                    if(user !== null){ 
                        errors.register = "Email ya existe elija otro.";
                        res.locals.errors = errors;
                        
                        return res.render('register');
                    } else if (req.body.password != req.body.retypePassword){ 
                        //3.2 Si el find devuelve null podemos chequear so las contraseñas coinciden 
                        errors.register = "Las contreseñas no coinciden";
                        res.locals.errors = errors;
                        
                        return res.render('register');
                    } else { 
                        //Si el email no existe y las contraseñas coinciden, guardamos al user y redireccionamos a login para que se registre.
                        let user = {
                            name : req.body.name,
                            email: req.body.email,
                            password: bcrypt.hashSync(req.body.password, 10), 
                        }
                        users.create(user)
                            .then( function(user){
                                return res.redirect('/login')
                            })
                            .catch( e => console.log(e))
                    }
                    
                })
                .catch( e => console.log(e))
            }

    },
    
}

module.exports = registerController;