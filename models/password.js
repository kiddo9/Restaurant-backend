const Sequelize = require('./../config/db_connection')
const {DataTypes} = require('sequelize')

const Password = Sequelize.define('passwordRest', {
    restId: {
        type: DataTypes.TEXT,
      },

      otp:{
        type: DataTypes.TEXT,
      },
      userId:{
        type: DataTypes.TEXT,
      },
      otpExpiredTime:{
        type: DataTypes.TIME,
      },
      createdAt: {
        type: DataTypes.TIME,
        
      },
      updatedAt: {
        type: DataTypes.TIME
      },
}, {
    tableName: 'passwordRest'
})

module.exports = Password