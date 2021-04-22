var mysql = require('mysql');

var connection = function() {
    return mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456789',
        database: 'AttendanceRegister',
    });
}

module.exports = function () {
    return connection;
}