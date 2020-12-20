const {body, validationResult} = require('express-validator');

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
    return false;
  }
  const {startDate, endDate, minCount, maxCount} = req.body;
  if (!startDate || !endDate || !minCount || !maxCount) {
    return false;
  }

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return false;
  }
  if (!check(minCount).isNumeric() || !check(maxCount).isNumeric()) {
    return false;
  }
  return next();
};
module.exports = {
  validator,
};
