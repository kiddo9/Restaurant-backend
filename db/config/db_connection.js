const db_config = require('./config.json')
const {Sequelize} = require('sequelize')

const connection = new Sequelize('postgresql://postgres.irkrmdwtasxwzpfiuxja:2by5_tLay*CDQVd@aws-0-eu-central-1.pooler.supabase.com:6543/postgres');

const SYNC = connection.authenticate();

if (SYNC) {
    console.log('Db connected successfully');
}else {
    console.log('Db connection failed');
}

module.exports = connection;