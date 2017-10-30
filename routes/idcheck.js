/**
 * Android 에서 보낸 ID 값과 DB 내의 ID 값을 비교해서 중복되지 않는지 확인
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

    // 연결한 mysql 서버에 쿼리문 전송
    connection.query("SELECT * FROM users WHERE id='"+queryData.id+"' ",
        function (err, rows, fields) {
            // 에러가 없다면
            if(!err) {
                // 입력한 정보가 있다면
                if (rows.length > 0){
                    var login = {result:'fail', msg:'Sorry, This ID is already used'}
                    res.send(login);
                    // 입력한 정보가 맞지 않거나 없다면
                } else {
                    var error = {result:'success', msg:'Good, You can use this ID'}
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