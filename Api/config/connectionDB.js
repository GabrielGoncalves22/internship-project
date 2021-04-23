const mysql = require('mysql');

const connection = mysql.createPool({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456789',
        database: 'AttendanceRegister',
});

const execute = (query, params = []) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, result, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    })
}

module.exports = function () {
    return execute;
}