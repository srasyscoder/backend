const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Import your database connection logic
const indexRouter = require('./routes/index');
//console.log("indexRouter:", indexRouter);
const usersRouter = require('./routes/usersRoute');
//console.log("usersRouter:", usersRouter);
const enrollmentRouter = require('./routes/enrollmentRoute.js');
//console.log("enrollmentRouter:", enrollmentRouter);
const chooseplanRouter = require('./routes/chooseplanRoute');
//console.log("chooseplanRouter:", chooseplanRouter);
// Add other routes as needed

const app = express();
app.use(cors());
app.use(bodyParser.json());
console.log('mongoURI: ', process.env.MONGO_URI)

// Connect to MongoDB
connectDB();

// View engine setup (You can change this if you're not using Jade)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register routes

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/enrollment', enrollmentRouter);
app.use('/api/chooseplan', chooseplanRouter);

// Add other routes as needed

// Root route to check if the server is running
/*app.get('/', (req, res) => {
  res.send('Backend server is running');
});*/
/*app.get('/api/test', (req, res) => {
  res.send('Test route working');
});*/

app.get('/', (req, res) => {
  res.send('Server is up and running');
});
// Catch 404 errors and forward to error handler
app.use(function (req, res, next) {
  console.log('404 Error: Route not found:', req.originalUrl);
  next(createError(404));
});
app.use('*', (req, res) => {
  res.status(404).send('The page could not be found');
});
/*app.use('/api/enrollment', (req, res, next) => {
  console.log('Request received at /enrollment');
  next();
});*/
// General error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


module.exports = app;
