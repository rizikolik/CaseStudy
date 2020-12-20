const mongoose = require('mongoose');

const fetchRecordsWithQueries = request => {
  const {startDate, endDate, minCount, maxCount} = request;
  console.log(startDate);
  const RecordModel = mongoose.model('Record');
  //Use aggregate constructor for filtering and addding new Areas to model
  //Agregate uses an array named Pipeline
  return RecordModel.aggregate([
    {
      $match: {
        $and: [
          {
            createdAt: {
              $gte: new Date(startDate),
            },
          },
          {
            createdAt: {
              $lte: new Date(endDate),
            },
          },
        ],
      },
    },
    {
      $addFields: {
        totalCount: {
          $sum: '$counts',
        },
      },
    },
    {
      $match: {
        $and: [
          {
            totalCount: {
              $gte: minCount,
            },
          },
          {
            totalCount: {
              $lte: maxCount,
            },
          },
        ],
      },
    },
    {
      $project: {
        _id: 0,
        key: 1,
        createdAt: 1,
        totalCount: 1,
      },
    },
  ]);
};
module.exports = {fetchRecordsWithQueries};
