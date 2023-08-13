var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var SignupRouter = require('./routes/Signup');
var loginRouter=require('./routes/login');
var addroomsRouter=require('./routes/addrooms');
var addempRouter=require('./routes/addemployee');
var getempRouter=require('./routes/getemployee');
var getroomRouter=require('./routes/getrooms');
var getroomdetRouter=require('./routes/getroomdet');
var delempRouter=require('./routes/deleteemployee');
var delroomRouter=require('./routes/deleterooms');
var getroominguestRouter=require('./routes/getroomsinguest');
var updateroomRouter=require('./routes/updateroom');
var updateempRouter=require('./routes/updateemployee');
var bookaroomRouter=require('./routes/bookaroom');
var getbookingsRouter=require('./routes/getbookings');
var deletebookingRouter=require('./routes/deletebooking');
var approvebookingRouter=require('./routes/approvebooking');
var paymentRouter=require('./routes/payment');
var getapprovedroomsforpaymentRouter=require('./routes/getapprovedroomsforpayment');

var database = require("./database/sql"); // added by me
const { request } = require('http');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors()); // added by me
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Method", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup',SignupRouter);
app.use('/addrooms',addroomsRouter);
app.use('/addemployee',addempRouter);
app.use('/getemployee',getempRouter);
app.use('/getrooms',getroomRouter);
app.use('/getroomdet',getroomdetRouter);
app.use('/deleteemployee',delempRouter);
app.use('/deleterooms',delroomRouter);
app.use( '/login',loginRouter);
app.use('/getroomsinguest',getroominguestRouter);
app.use('/updateroom',updateroomRouter);
app.use('/updateemployee',updateempRouter);
app.use('/bookaroom',bookaroomRouter);
app.use('/getbookings',getbookingsRouter);
app.use('/deletebooking',deletebookingRouter);
app.use('/approvebooking',approvebookingRouter);
app.use('/payment',paymentRouter);
app.use('/getapprovedroomsforpayment',getapprovedroomsforpaymentRouter);


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
