const {DataTypes} = require('sequelize')
const MembersTable = require('../config/db_connection')

const Members = MembersTable.define('Members',{
    email: {
        type: DataTypes.STRING
    },

    username: {
        type: DataTypes.STRING
    },

    password: {
        type: DataTypes.STRING
    }
})

module.exports = Members