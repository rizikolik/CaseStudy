const express = require('express');
const cors = require('cors');
const {dbConnect} = require('./database');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const morgan = require('morgan');

//Modules that will be used by App //

const RecordModule = require('./models/Record');
//startup

const app = express();
const dbURI = process.env.DB_URI;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(cors());
app.use(morgan('combined', {stream: logger.stream})); //Combine morgan's console logs with winston logs

app.use('/api', RecordModule.router);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );

  // render the error page
  res.status(err.status || 500).json({error: res.locals.message});
});

dbConnect(`${dbURI}`)
  .then(
    app.listen(process.env.PORT || 8000, process.env.IP, function () {
      //console.log(process.env.PORT);
      console.log(`SERVER IS RUNNİNG AT ${process.env.PORT || 8000}`);
    })
  )
  .catch(err => {
    console.log(err, 'connection error of mongo');
  });
