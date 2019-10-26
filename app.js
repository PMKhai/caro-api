var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const usersRouter = require('./routes/user');
const meRouter = require('./routes/me');

require('./middlewares/passport');

var app = express();

app.use(cors());

app.use(function(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    const reqType = req.headers['x-forwarded-proto'];
    // if not https redirect to https unless logging in using OAuth
    if (reqType !== 'https') {
      req.url.indexOf('auth/google') !== -1
        ? next()
        : res.redirect('https://' + req.headers.host + req.url);
    }
  } else {
    next();
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', usersRouter);
app.use('/me', meRouter);

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
