var mysql      = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost', 
  port: '3306', 
  user: 'usuariotest', 
  password: "test", 
  database: 'queveohoy' 
});

module.exports = connection;

