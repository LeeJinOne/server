var express = require('express');
var router = express.Router();
var url = require('url');

/* 접속 시에 ID와 PWD를 서버로 부터 불러와서 DB 내의 정보와 맞는지 확인한 */
router.get('/', function(req, res, next) {
  var queryData = url.parse(req.url, true).query;
  var mysql = require('mysql');
  // MySQL 접속 정보 입력
  var config = {
    host     : 'localhost',
    user     : 'root',
    password : 'wlsdnjs123',
    database : 'finddb'
  }

  // 입력한 정보에 따라 mysql 연결
  var connection = mysql.createConnection(config);

  connection.connect();

  // 연결한 mysql 서버에 쿼리문 전송
  connection.query("SELECT * FROM users WHERE id='"+queryData.id+"' and pwd='"+queryData.pwd+"' ",
      function (err, rows, fields) {
      // 에러가 없다면
      if(!err) {
          // 입력한 정보가 있다면
          if (rows.length > 0){
              var login = {result:'success', msg:'Thanks, login info is correct'}
              res.send(login);
          // 입력한 정보가 맞지 않거나 없다면
          } else {
              var error = {result:'fail', msg:'user is not valid'}
              res.send(error);
          }
      // 에러 발생시
      } else {
          var error = {msg:'error cannot execute query'}
          res.send(error);
      }
  });
  // 연결 종료
  connection.end();
});

module.exports = router;
