const Mongoose = require('mongoose');
const dotenv = require('dotenv').config();

//Connect to database
const dbConnect = async url => {
  Mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(url);
  Mongoose.connection.on('error', err => {
    if (err) {
      // Sometimes writing the error line can be helpful
      console.log(
        'CANT CONNECT TO THE DATABASE:Mongoose Connec Error at Database Index file:',
        err
      );
      throw err;
    }
  });
};

module.exports = {
  dbConnect,
};
