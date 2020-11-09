module.exports = function (sequelize, dataTypes){

    let alias = 'Movie'; //Este alias se busca como nombre en de la tabla en plural dentro de la base de datos.

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        created_at : {
            type: dataTypes.DATE,
            allowNull:true,
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: true,
        },
        title: {
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.DECIMAL
        },
        awards: {
            type: dataTypes.INTEGER
        },
        release_date: {
            type: dataTypes.DATE
        },
        length: {
            type: dataTypes.INTEGER
        },
        genre_id: {
            type: dataTypes.INTEGER
        },

    }

    let config = {
        // tableName : "movies"
        timestamps:false, //Aclareción en caso de no explicitar created_at, deleted_at y updated_at
        // underscored: true, //Aclareción en caso que los timestamps usen guiones bajos en lugar de camelCase.
    };

    const Movie = sequelize.define(alias, cols, config);

    Movie.associate = function(models){
        Movie.belongsTo(models.Genre, {
            as: 'genre',
            foreignKey: 'genre_id', 
        });

        Movie.belongsToMany(models.Actor, {
            as: 'actors',
            through: 'actor_movie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id',
            timestamps: false,
        })

    }


    return Movie;

}