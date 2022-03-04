const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const hbs = require('hbs');
const { addToLocals } = require('./middlewares/allMiddleWares');
// const favicon = require('serve-favicon');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(session({
  secret: 'topsecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // не HTTPS
  name: 'userCookie',
  store: new FileStore(),
}));

app.use(addToLocals);

app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Everything is ok on port ${PORT}`));
