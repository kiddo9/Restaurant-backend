const Sequelize = require('../config/db_connection')
const {DataTypes} = require('sequelize')

const tables = Sequelize.define('tables', {
    tableName:{
        type: DataTypes.TEXT
    },
    tableLocation:{
        type: DataTypes.TEXT
    },
    tableNumber:{
        type: DataTypes.TEXT
    },
    tableType:{
        type: DataTypes.TEXT
    },
    tableImage:{
        type: DataTypes.TEXT
    },
    createdAt:{
        type: DataTypes.TIME
    },
    updatedAt:{
        type: DataTypes.TIME
    }
}, {
    tableName: 'tables'
})

module.exports = tables