const db = require('../database/models')
const movie = db.Movie; //Debe ser el alias del modelo.
const genres = db.Genre;

const op = db.Sequelize.Op;

let moviesController = {
    index: function(req, res){
        movie.findAll(/*{
            limit:5,
            offset: 5,
            order:[
                ['title', 'ASC']
            ]
        }*/)
            .then( function(resultados){
                // return res.send(resultados);
                return res.render('movies', { resultados });
            })
            .catch(function(error){
                console.log(error);
            })
    },
    show: function(req, res){
        let primaryKey = req.params.id;

        movie.findByPk(primaryKey, {
            include: [ {association: 'genre'}, {association: 'actors'} ]
        })
            .then( function (resultados){
                //  return res.send(resultados)
                return res.render('movie', { resultados });
            })
            .catch(function (error) {
                console.log(error);
            })
    },
    search: function(req, res){
        let searchData = req.query.search;

        movie.findAll({
            where: [
                { title : { [op.like] : "%" +searchData + "%"}}
            ]
        })
            .then(function (resultados) {
                // return res.send(resultados);
                return res.render('searchResults', { resultados });
            })
            .catch(function (error) {
                console.log(error);
            })
    },
    add: function(req, res){
        genres.findAll()
            .then(function(genres){
                return res.render('movieAdd' ,{ genres })
            })
            .catch(function (error) {
                console.log(error);
            })
        
    },
    store: function(req, res){
        
        let movie = {
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id,
        }

        db.Movie.create(movie);

        return res.redirect('/movies');
    },
    edit: function(req, res){
        let idAeditar = req.params.id;
        movie.findByPk(idAeditar)
            .then(function(movie){
                // return res.send(movie);
                return res.render('movieEdit', { movie });
            })
            .catch(function (error) {
                console.log(error);
            })
        
    },
    update: function(req, res){
        let idAActulizar = req.params.id;

        let pelicualAActualizar = req.body
        // return res.send(pelicualAActualizar);
        db.Movie.update(
            pelicualAActualizar,
        {
            where: {
                id: idAActulizar
            } 
        })

        return res.redirect('/movies');
    },

    destroy: function(req, res){
        let idABorrar = req.params.id;

        db.Movie.destroy({
            where: {
                id: idABorrar
            }
        });

        return res.redirect('/movies');
    }

}

module.exports = moviesController;