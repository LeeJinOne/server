var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var queryData = url.parse(req.query, true).query;
  var mysql = require('mysql');
  var config = {
    host     : 'localhost',
    user     : 'root',
    password : 'wlsdnjs123',
    database : 'finddb'
  }

  var connection = mysql.createConnection(config);

  connection.connect();

  connection.query("SELECT * FROM users WHERE id='"+queryData.id+"' and pwd='"+queryData.pwd+"' ",
      function (err, rows, fields) {
      if(!err) {
          if (rows.length > 0){
              var error = {msg:'Thanks, login info is correct'}
              res.send(error);
          } else {
              var error = {msg:'user is not valid'}
              res.send(error);
          }
      } else {
          var error = {msg:'error cannot execute query'}
          res.send(error);
      }
      res.send('respond with a resource');
  });
});

module.exports = router;
