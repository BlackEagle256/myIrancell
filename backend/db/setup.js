const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  multipleStatements: true
};

const connection = mysql.createConnection(dbConfig);

const sql = fs.readFileSync(path.join(__dirname, 'database.sql'), 'utf8');

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL server...');
  
  connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log('Database and tables created successfully!');
    connection.end();
  });
});