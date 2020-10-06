const db = require('../database/models')
const movie = db.Movie; //Debe ser el alias del modelo.

const op = db.Sequelize.Op;

let moviesController = {
    index: function(req, res){
        movie.findAll({
            limit:5,
            offset: 5,
            order:[
                ['title', 'ASC']
            ]
        })
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

        movie.findByPk(primaryKey)
            .then( function (resultados){
                return res.render('movie', { resultados });
            })
            .catch(function (error) {
                console.log(error);
            })
    },
    search: function(req, res){
        let searchData = req.params.searchData;

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
    }

}

module.exports = moviesController;