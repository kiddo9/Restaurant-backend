const {DataTypes} = require('sequelize')
const MembersTable = require('../config/db_connection')

const Members = MembersTable.define('members',{
    email: {
        type: DataTypes.STRING
    },

    username: {
        type: DataTypes.STRING
    },

    password: {
        type: DataTypes.STRING
    },
    token:{
        type: DataTypes.STRING
    }
}, {
    tableName: 'members'
})

module.exports = Members