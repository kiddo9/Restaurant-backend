require('dotenv').config();
//const { development } = require('../config/config.json');
const { Sequelize } = require('sequelize');
const pg = require('pg');

const connection = new Sequelize('postgresql://postgres.irkrmdwtasxwzpfiuxja:2by5_tLay*CDQVd@aws-0-eu-central-1.pooler.supabase.com:6543/postgres', {
    dialectModule: pg
});

(async () => {
    try {
        await connection.authenticate();
        console.log('Db connected successfully');
    } catch (error) {
        console.error('Db connection failed:', error.message);
    }
})();

module.exports = connection;






