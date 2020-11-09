module.exports = function (sequelize, dataTypes){

    let alias = 'Genre'; //Este alias se busca como nombre en de la tabla en plural dentro de la base de datos.

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
        name: {
            type: dataTypes.STRING
        },
        ranking: {
            type: dataTypes.INTEGER
        },
        active: {
            type: dataTypes.INTEGER
        }

    }

    let config = {
        // tableName : "movies"
         timestamps:false, //Aclareción en caso de no explicitar created_at, deleted_at y updated_at
        // underscored: true, //Aclareción en caso que los timestamps usen guiones bajos en lugar de camelCase.
    };

    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = function (models) {
        Genre.hasMany(models.Movie, {
            as: 'movies',
            foreignKey: 'genre_id',
        })
    }

    return Genre;

}