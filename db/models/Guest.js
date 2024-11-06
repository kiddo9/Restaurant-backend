const Sequelize = require('../config/db_connection')
const {DataTypes} = require('sequelize')

const GuestRegisration = Sequelize.define('guest', {
    guestemail: {
        type: DataTypes.STRING
    },

    guestid: {
        type: DataTypes.NUMBER
    },
    createdAt:{
        type: DataTypes.TIME
    },
    updatedAt:{
        type: DataTypes.TIME
    }
}, {
    tableName: 'guest'
})

module.exports = GuestRegisration