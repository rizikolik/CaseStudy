const Mongoose = require('mongoose');
const dotenv = require('dotenv').config();

//Connect to database
const dbConnect = async () => {
  const dbURI =
    process.env.NODE_ENV === 'development'
      ? process.env.DEVELOPMENT_DB_URI
      : process.env.PRODUCTION_URI;
  Mongoose.connect(`${dbURI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(`${dbURI}`);

  Mongoose.connection.on('error', err => {
    if (err) {
      // Sometimes writing the error line can be helpful
      console.log('CANT CONNECT TO THE DATABASE ', err);
      throw err;
    }
  });
};

module.exports = {
  dbConnect,
};
