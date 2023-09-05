const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Br4pr0',
    database: 'eduwork-cruds'
});

module.exports = connection;
