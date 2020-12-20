const mongoose = require('mongoose');
const fetchRecordsWithQueries = request => {
  const {startDate, endDate, minValue, maxValue} = request;
  return {message: 'response test'};
};
module.exports = {fetchRecordsWithQueries};
