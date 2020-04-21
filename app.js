var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
var AuthService = require('./libs/authService');
var UserService = require('./libs/UserService');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/articles');

var app = express();
var authService = new AuthService();
var userService = new UserService();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(logger('dev'));
app.use(session(AuthService.sessInitData));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('auth',authService);
app.set('user',userService);

app.use(authService.getUserRoute);

app.use('/',indexRouter);

app.use('/admin',adminRouter);

app.use('/users',usersRouter);

app.use('/articles',articleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
