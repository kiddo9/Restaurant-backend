const Sequelize = require('./../config/db_connection')
const {DataTypes} = require('sequelize')

const dish = Sequelize.define('dishes', {
    dishName: {
        type: DataTypes.STRING
    },

    dishPrice: {
        type: DataTypes.STRING
    },

    dishImage: {
        type: DataTypes.STRING
    },

    Dishdescription: {
        type: DataTypes.STRING
    },
    createdAt:{
        type: DataTypes.TIME
    },
    updatedAt:{
        type: DataTypes.TIME
    }
}, {
    tableName: 'dishes'
})

module.exports = dish