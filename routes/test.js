var express = require('express');
var router = express.Router();
var url = require('url');

router.get('/', function(req, res, next) {
    // var queryData = url.parse(req.url, true).query;
    var mysql = require('mysql');
    // MySQL 접속 정보 입력
    var config = {
        host     : 'localhost',
        user     : 'root',
        password : 'wlsdnjs123',
        database : 'ex'
    }

    // 입력한 정보에 따라 mysql 연결
    var connection = mysql.createConnection(config);

    connection.connect();

    // 연결한 mysql 서버에 쿼리문 전송
    connection.query("SELECT * FROM `test`",
        function (err, rows, fields) {
            // 에러가 없다면
            if(!err) {
                // 입력한 정보가 있다면
                if (rows.length > 0){
                    var json = JSON.stringify(rows);
                    console.log(json);
                    res.send(json);
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