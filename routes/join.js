/**
 * Android 에서 보낸 값을 받아서 Server 에 INSERT
 * */

var express = require('express');
var router = express.Router();
var url = require('url');

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

    // 연결한 mysql 서버에 쿼리문(INSERT) 전송
    connection.query("INSERT INTO users VALUES(" +
        " '"+queryData.id+"'" + // id
        " ,'"+queryData.pwd+"' " + // pwd
        " ,'"+queryData.name+"'" + // name
        " ,'"+queryData.number+"'" + // number
        " ,"+queryData.con+"" + // con
        " ,"+queryData.date+")", // date
        function (err, rows, fields) {
            // 에러가 없다면 가입 성공
            if(!err) {
                console.log(queryData.id + "sign up success");
                var join = {result:'success', msg:'Welcome to being our family!!'}
                res.send(join);
            // 에러 발생시, 가입 실패
            } else {
                console.log(err);
                var error = {result:'fail', msg:'sign up failed'}
                res.send(error);
            }
        });
    // 연결 종료
    connection.end();
});

module.exports = router;