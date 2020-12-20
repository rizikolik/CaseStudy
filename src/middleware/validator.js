//const validate = require('validator');
const {clientError} = require('../utils/responseMessages');
//Date Validator Checks Format firstly then check its a real date or not.
function isValidDate(date) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(regEx)) return false; // Invalid format
  var d = new Date(date);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === date;
}
const validator = (req, res, next) => {
  if (!req.body) {
    return clientError(res, 'body cant be emtpy!');
  }

  const {startDate, endDate, minCount, maxCount} = req.body;

  //Check if any of the required areas is Empty or null

  //Create Custom error messages with the help of precreated error helpers
  if (!startDate || !endDate || !minCount || !maxCount) {
    return clientError(res, 'Please fill all the areas of form');
  } else if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return clientError(res, 'Date Format is wrong.Format is : YYYY-MM-DD');
  } else if (typeof minCount != 'number') {
    return clientError(res, 'minCount must be integer');
    //Another Validator could be implemented here
  } else if (typeof maxCount != 'number') {
    return clientError(res, 'maxCount count must be integer');
  }
  //If validation successfully completed go to the next middleware
  return next(req, res);
};
module.exports = {
  validator,
};
