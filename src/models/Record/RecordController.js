const {fetchRecordsWithQueries} = require('./RecordServices');
const {serverError, okayMessage} = require('../../utils/responseMessages');
const getRecords = async (req, res) => {
  try {
    const records = await fetchRecordsWithQueries(req.body);

    return okayMessage(req, res, records);
  } catch (err) {
    console.log(err);
    return serverError(req, res, err);
  }
};

module.exports = {
  getRecords,
};
