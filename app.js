var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// routes 를 새로 생성하고나면 무조건 추가해야 찾는다
var index = require('./routes/index');
var users = require('./routes/users');
var idcheck = require('./routes/idcheck');
var join = require('./routes/join');
var get_marker = require('./routes/get_marker');
var seat_map = require('./routes/seat_map');
var test = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes 추가하고나면 잊지말고 추가해주자
app.use('/', index);
app.use('/users', users);
app.use('/idcheck', idcheck);
app.use('/join', join);
app.use('/get_marker', get_marker);
app.use('/seat_map', seat_map);
app.use('/test', test);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
