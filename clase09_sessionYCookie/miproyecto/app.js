var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var db = require('./database/models');

var indexRouter = require('./routes/index');
var moviesRouter = require('./routes/movies');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
const { RSA_NO_PADDING } = require('constants');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(
  { secret:'moviesdb',
    resave: false,
    saveUninitialized: true }
));
app.use(express.static(path.join(__dirname, 'public')));

//Sirve para pasar info en todas las vistas.
app.use(function(req, res, next){
  // console.info("====== si sessión. Primer middleware: ", req.session.user != undefined);
  if(req.session.user != undefined){
    //locals me deja disponible datos en todas las vistas.
    res.locals.user = req.session.user
    console.log(res.locals);
    return next();//Chequear
  }
    return next();
});

//Revisar cookie recordame
app.use(function(req, res, next){
  // return res.send(req.cookies);
  if(req.cookies.userId != undefined && req.session.user == undefined){
    //Buscar al usuario en la db
    db.User.findByPk(req.cookies.userId)
      .then(function(user){
        //Lo cargamos en la session
        req.session.user = user;
        res.locals.user = user;
        // res.redirect(req.originalUrl)
        return next();//Permite continuar el flujo cuando se resuelve la promesa
      })
      .catch(e => console.log(e))
  } else {
    return next(); //Encapsularlo acá hace que solo se ejecute si falla el if.
  }

});


app.use('/', indexRouter);
app.use('/movies', moviesRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
