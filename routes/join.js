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
    connection.query("INSERT INTO users VALUES" +
        " id='"+queryData.id+"'" +
        " and pwd='"+queryData.pwd+"' " +
        " and name='"+queryData.name+"'" +
        " and number='"+queryData.number+"'" +
        " and con='"+queryData.con+"'" +
        " and date='"+queryData.date+"'",
        function (err, rows, fields) {
            // 에러가 없다면
            if(!err) {
                // 입력한 정보가 있다면
                if (rows.length > 0){
                    console.log("sign up success");
                    var login = {result:'success', msg:'Thanks, login info is correct'}
                    res.send(login);
                    // 입력한 정보가 맞지 않거나 없다면
                } else {
                    console.log("sign up fail");
                    var error = {result:'fail', msg:'user is not valid'}
                    res.send(error);
                }
                // 에러 발생시
            } else {
                console.log("error occurred")
                var error = {msg:'error cannot execute query'}
                res.send(error);
            }
        });
    // 연결 종료
    connection.end();
});

module.exports = router;