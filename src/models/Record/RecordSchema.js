const mongoose = require('mongoose');
const {Schema} = mongoose;

const recordSchema = new Schema(
  {
    key: String,
    createdAt: Date,
    counts: [Number],
  },
  {timestamps: true}
);

mongoose.model('Record', recordSchema);
