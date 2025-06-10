const mysql = require('mysql');

const myIrancellDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myIrancell'
});

module.exports = myIrancellDB;