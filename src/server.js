const express = require('express');
const cors = require('cors');
const {dbConnect} = require('./database');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//Modules that will be used by App //

const RecordModule = require('./modules/Record');
//startup

const app = express();

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(cors());

//app.use('/api', RecordModule.router);
dbConnect()
  .then(
    app.listen(process.env.PORT || 8000, process.env.IP, function () {
      //console.log(process.env.PORT);
      console.log(`SERVER IS RUNNİNG AT ${process.env.PORT || 3000}`);
    })
  )
  .catch(err => {
    console.log(err, 'connection error of mongo');
  });
