const logger = require('./logger');
const ERROR_TYPES = {
  SERVER_ERROR: 'INTERNAL SERVER ERROR',
  VALIDATION_ERROR: 'VALIDATION FAILED',
  NOT_FOUND: 'NOT FOUND',
};
const RESPONSE = {
  success: {
    code: 0,
    msg: 'Success',
  },
  error: {
    code: 1,
    message: 'Error',
  },
};
const emptyResponse = (res, message) => {
  res.status(404).json({
    ...RESPONSE.error,
    error: ERROR_TYPES.NOT_FOUND,
    detail: message,
  });
};
const clientError = (res, message) => {
  res.status(400).json({
    ...RESPONSE.error,
    error: ERROR_TYPES.VALIDATION_ERROR,
    detail: message,
  });
};
const okayMessage = (req, res, values) => {
  res.status(200).json({
    ...RESPONSE.success,
    records: values,
  });
};
const notFound = (res, message) =>
  res.status(404).json({
    ...failure,
    error: ERROR.NOT_FOUND,
    detail: message,
  });
const serverError = (req, res, err) => {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );
  res.status(500).json({
    error: ERROR_TYPES.SERVER_ERROR,
    detail: err,
  });
};

module.exports = {
  serverError,
  notFound,
  clientError,
  okayMessage,
};
