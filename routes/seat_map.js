var socketio = require('socket.io');
var express = require('express');
var http = require('http');
var fs = require('fs');
var router = express.Router();
var url = require('url');

router.get('/', function (req, res, next) {
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

    connection.query("SELECT * FROM `" + queryData.category + "`",
        function (err, rows, fields) {
            // 에러가 없다면 정보를 가져옴
            if(!err) {
                console.log("Success to get " + queryData.category);
                // Data 가 여러개이기 때문에 JSONArray 형식으로 나타난다.
                // 또한 Android 에서 인식가능한 형태로 바꿔줘야하기 때문에 JSON.stringify(variable) 메소드로
                // String 형식으로 변환해준다.
                var json = JSON.stringify(rows);
                console.log(json); // 정상적인 JSON 형태 출력, JSON 형식 검증 사이트 : jsonlint.com
                res.send(json);
                // 에러 발생시, 정보 가져오기 실패
            } else {
                console.log(err);
                var error = {result:'fail', msg:'Fail to get location data, try again'}
                res.send(error);
            }
        });
    // 연결 종료
    connection.end();
});
module.exports = router;