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
            errors.message = "Email no puede estar vacío.";
            res.locals.errors = errors;
            return res.render('register');

        } else if (req.body.password == ""){
            //2.2 chequeamos que el password no venga vacío:
            errors.message = "Password no puede estar vacío";
            res.locals.errors = errors;
            return res.render('register');

        } else if (req.body.retypePassword == ""){
            //2.3 chequeamos que el retypepassword no venga vacío:
            errors.message = "Retype Password no puede estar vacío";
            res.locals.errors = errors;
            return res.render('register');

        } else if( req.file.mimetype !== 'image/png' || req.file.mimetype !== 'image/jpg'){
            errors.message = "El archov debe ser de tipo jpg o png.";
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
                        errors.message = "Email ya existe elija otro.";
                        res.locals.errors = errors;
                        return res.render('register');

                    } else if (req.body.password != req.body.retypePassword){ 
                        //3.2 Si el find devuelve null podemos chequear so las contraseñas coinciden 
                        errors.message = "Las contreseñas no coinciden";
                        res.locals.errors = errors;
                        return res.render('register');

                    } else { 
                        //Si el email no existe y las contraseñas coinciden, guardamos al user y redireccionamos a login para que se registre.
                        let user = {
                            name : req.body.name,
                            email: req.body.email,
                            password: bcrypt.hashSync(req.body.password, 10),
                            avatar: req.file.filename 
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

    edit: function(req, res){ //Render de form 
        let id = req.params.id;
        
        //Validar que solo lo pueda acceder el usuario dueño de su perfil
        if(id != req.session.user.id){
            //Si cambian el id a mano en la url lo redirigimos a su perfil otra vez.
            return res.redirect(`/register/edit/${req.session.user.id}`);
        } else {
            db.User.findByPk(id)
                .then( function(user){
                    return res.render('userEdit', { userEdit: user })
                })
                .catch(e=>{console.log(e)})
        }
        
    },

    update: function(req, res){
        let user = {
            name: req.body.name,  //Si lo cambia loa actualizamos
            email: req.body.email, //No lo debería cambiar. Si lo hace hay que controlar que no se repita.
            password: '',
            avatar: ''
        }        
        //Tenemos que completar password y avatar dependiendo de lo que venga en el form
        if(req.body.password == ''){
            user.password = req.session.user.password;
        } else {
            user.password = bcrypt.hashSync(req.body.password, 10);
        }
        if (req.file == undefined) {
            user.avatar = req.session.user.avatar
        } else {
            user.avatar = req.file.filename 
        }

        db.User.update(user, {
            where: {
                id: req.session.user.id
            }
        })
            .then( function(id){
                //Si queremos que la info cambie apenas termina de actualizar hay que recargar el user en session. Ojo que hay que completar el objeto user con el id.
                user.id = req.session.user.id
                req.session.user = user;                
                return res.redirect('/')
            })
            .catch( e => { console.log(e);})
    }
    
}

module.exports = registerController;