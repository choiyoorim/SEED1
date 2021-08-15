var mysql = require('mysql');
const db = mysql.createPool({
    host:'3.35.55.124',
    user:'seeduser2',
    password: 'sungshin21seed',
    database: 'seed_db',
});

module.exports = db;