const sequelize = require('./../config/db_connection')
const {DataTypes} = require('sequelize')

const staffs = sequelize.define('staffs', {
    name:{
        type: DataTypes.TEXT,
       
      },
      email: {
        type: DataTypes.TEXT,
       
      },
      mobile:{
        type: DataTypes.TEXT,
        
      },
      type:{
        type: DataTypes.TEXT,
       
      },
      password:{
        type: DataTypes.TEXT,
        
      },
      createdAt: {
        type: DataTypes.DATE,
       
      },
      updatedAt: {
        type: DataTypes.DATE,
        
      },
}, {
    tableName: 'staffs'
})

module.exports = staffs