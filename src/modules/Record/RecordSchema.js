const mongoose = require('mongoose');
const {Schema} = mongoose;

const recordSchema = new Schema({
  key: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  totalCount: {
    type: Number,
  },
});

mongoose.model('Record', recordSchema);
